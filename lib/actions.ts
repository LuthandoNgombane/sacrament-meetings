'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addMeeting, updateMeeting, deleteMeeting } from './meetings-db';
import type { MeetingType } from './types';

// Zod Schema validating meeting inputs according to types.ts
const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Meeting date is required.'),
  meetingType: z.enum(['regular', 'testimony', 'stake', 'general'] as const, {
    message: 'Please select a valid meeting type.',
  }),
  presiding: z.string().min(2, 'Presiding authority must be at least 2 characters.'),
  conducting: z.string().min(2, 'Conducting leader must be at least 2 characters.'),
  openingHymnNumber: z.coerce.number().min(1, 'Opening hymn number is required.'),
  openingHymnTitle: z.string().min(1, 'Opening hymn title is required.'),
  openingPrayer: z.string().min(2, 'Opening prayer is required.'),
  sacramentHymnNumber: z.coerce.number().min(1, 'Sacrament hymn number is required.'),
  sacramentHymnTitle: z.string().min(1, 'Sacrament hymn title is required.'),
  closingHymnNumber: z.coerce.number().min(1, 'Closing hymn number is required.'),
  closingHymnTitle: z.string().min(1, 'Closing hymn title is required.'),
  closingPrayer: z.string().min(2, 'Closing prayer is required.'),
});

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create meeting.',
    };
  }

  const {
    date,
    meetingType,
    presiding,
    conducting,
    openingHymnNumber,
    openingHymnTitle,
    openingPrayer,
    sacramentHymnNumber,
    sacramentHymnTitle,
    closingHymnNumber,
    closingHymnTitle,
    closingPrayer,
  } = validatedFields.data;

  try {
    await addMeeting({
      date,
      meetingType: meetingType as MeetingType,
      presiding,
      conducting,
      announcements: [],
      openingHymn: { number: openingHymnNumber, title: openingHymnTitle },
      openingPrayer,
      wardBusiness: [],
      stakeBusiness: false,
      sacramentHymn: { number: sacramentHymnNumber, title: sacramentHymnTitle },
      speakers: [],
      closingHymn: { number: closingHymnNumber, title: closingHymnTitle },
      closingPrayer,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to create meeting.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeetingAction(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update meeting.',
    };
  }

  const {
    date,
    meetingType,
    presiding,
    conducting,
    openingHymnNumber,
    openingHymnTitle,
    openingPrayer,
    sacramentHymnNumber,
    sacramentHymnTitle,
    closingHymnNumber,
    closingHymnTitle,
    closingPrayer,
  } = validatedFields.data;

  try {
    await updateMeeting(id, {
      date,
      meetingType: meetingType as MeetingType,
      presiding,
      conducting,
      openingHymn: { number: openingHymnNumber, title: openingHymnTitle },
      openingPrayer,
      sacramentHymn: { number: sacramentHymnNumber, title: sacramentHymnTitle },
      closingHymn: { number: closingHymnNumber, title: closingHymnTitle },
      closingPrayer,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to update meeting.' };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeetingAction(id: number): Promise<void> {
  try {
    await deleteMeeting(id);
    revalidatePath('/meetings');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete meeting.');
  }
}