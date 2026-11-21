'use server';

import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { z } from 'zod';
import {
  addMeeting,
  deleteMeeting as deleteMeetingFromDb,
  updateMeeting as updateMeetingInDb,
  type MeetingFormData,
} from './meetings-db';

const requiredText = z.string().trim().min(1, 'This field is required.');

const hymnNumber = z.string()
  .trim()
  .regex(/^[1-9]\d*$/, 'Enter a positive whole number.')
  .transform(Number)
  .refine(Number.isSafeInteger, 'Enter a smaller hymn number.');

const MeetingFormSchema = z.object({
  date: z.iso.date({ error: 'Enter a valid meeting date.' }),
  meetingType: z.enum(
    ['testimony', 'regular', 'stake', 'general', 'special'],
    { error: 'Choose a meeting type.' },
  ),
  presiding: requiredText,
  conducting: requiredText,
  openingHymnNumber: hymnNumber,
  openingHymnTitle: requiredText,
  openingPrayer: requiredText,
  sacramentHymnNumber: hymnNumber,
  sacramentHymnTitle: requiredText,
  closingHymnNumber: hymnNumber,
  closingHymnTitle: requiredText,
  closingPrayer: requiredText,
});

type MeetingFields = z.output<typeof MeetingFormSchema>;

export type MeetingFormState = {
  message?: string;
  errors?: Partial<Record<keyof MeetingFields, string[]>>;
};

function toMeetingData(fields: MeetingFields): MeetingFormData {
  return {
    date: fields.date,
    meetingType: fields.meetingType,
    presiding: fields.presiding,
    conducting: fields.conducting,
    openingHymn: {
      number: fields.openingHymnNumber,
      title: fields.openingHymnTitle,
    },
    openingPrayer: fields.openingPrayer,
    sacramentHymn: {
      number: fields.sacramentHymnNumber,
      title: fields.sacramentHymnTitle,
    },
    closingHymn: {
      number: fields.closingHymnNumber,
      title: fields.closingHymnTitle,
    },
    closingPrayer: fields.closingPrayer,
  };
}

export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const parsed = MeetingFormSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      message: 'Please correct the highlighted fields.',
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    await addMeeting(toMeetingData(parsed.data));
  } catch (error) {
    console.error('Failed to create meeting:', error);
    throw new Error('Unable to create the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  if (!Number.isSafeInteger(id) || id < 1) notFound();

  const parsed = MeetingFormSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      message: 'Please correct the highlighted fields.',
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  let updated: boolean;

  try {
    updated = await updateMeetingInDb(id, toMeetingData(parsed.data));
  } catch (error) {
    console.error('Failed to update meeting:', error);
    throw new Error('Unable to update the meeting. Please try again.');
  }

  if (!updated) notFound();

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}


export async function deleteMeeting(id: number) {
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error('Invalid meeting ID.');
  }

  try {
    await deleteMeetingFromDb(id);
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error('Unable to delete the meeting. Please try again.');
  }

  revalidatePath('/meetings');
}