'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import type { MeetingFormState } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

type FieldName = keyof NonNullable<MeetingFormState['errors']>;

const fields = [
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'meetingType', label: 'Meeting type', type: 'select' },
  { name: 'presiding', label: 'Presiding', type: 'text' },
  { name: 'conducting', label: 'Conducting', type: 'text' },
  { name: 'openingHymnNumber', label: 'Opening hymn number', type: 'number' },
  { name: 'openingHymnTitle', label: 'Opening hymn title', type: 'text' },
  { name: 'openingPrayer', label: 'Opening prayer', type: 'text' },
  { name: 'sacramentHymnNumber', label: 'Sacrament hymn number', type: 'number' },
  { name: 'sacramentHymnTitle', label: 'Sacrament hymn title', type: 'text' },
  { name: 'closingHymnNumber', label: 'Closing hymn number', type: 'number' },
  { name: 'closingHymnTitle', label: 'Closing hymn title', type: 'text' },
  { name: 'closingPrayer', label: 'Closing prayer', type: 'text' },
] as const satisfies readonly {
  name: FieldName;
  label: string;
  type: string;
}[];

type Props = {
  action: (state: MeetingFormState, data: FormData) => Promise<MeetingFormState>;
  meeting?: SacramentMeeting;
};

export default function MeetingForm({ action, meeting }: Props) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [values, setValues] = useState<Record<FieldName, string>>({
    date: meeting?.date ?? '',
    meetingType: meeting?.meetingType ?? 'regular',
    presiding: meeting?.presiding ?? '',
    conducting: meeting?.conducting ?? '',
    openingHymnNumber: meeting?.openingHymn.number.toString() ?? '',
    openingHymnTitle: meeting?.openingHymn.title ?? '',
    openingPrayer: meeting?.openingPrayer ?? '',
    sacramentHymnNumber: meeting?.sacramentHymn.number.toString() ?? '',
    sacramentHymnTitle: meeting?.sacramentHymn.title ?? '',
    closingHymnNumber: meeting?.closingHymn.number.toString() ?? '',
    closingHymnTitle: meeting?.closingHymn.title ?? '',
    closingPrayer: meeting?.closingPrayer ?? '',
  });

  return (
    <form action={formAction} noValidate className="max-w-xl space-y-4">
      <p role="status" className="text-red-800">{state.message}</p>

      {fields.map(({ name, label, type }) => {
        const id = `meeting-${name}`;
        const errors = state.errors?.[name];
        const controlProps = {
          id,
          name,
          required: true,
          value: values[name],
          'aria-describedby': `${id}-error`,
          'aria-invalid': Boolean(errors?.length),
          className: 'block w-full rounded-md border border-slate-500 p-2',
          onChange: (
            event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
          ) => {
            const value = event.currentTarget.value;
            setValues((previous) => ({ ...previous, [name]: value }));
          },
        };

        return (
          <div key={name}>
            <label htmlFor={id} className="mb-1 block font-medium">
              {label}
            </label>
            {type === 'select' ? (
              <select {...controlProps}>
                <option value="regular">Regular</option>
                <option value="testimony">Testimony</option>
                <option value="stake">Stake</option>
                <option value="general">General</option>
                <option value="special">Special</option>
              </select>
            ) : (
              <input {...controlProps} type={type} />
            )}
            <div id={`${id}-error`} aria-live="polite" className="text-red-800">
              {errors?.map((error) => <p key={error}>{error}</p>)}
            </div>
          </div>
        );
      })}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-900 px-4 py-2 text-white disabled:opacity-60"
        >
          {isPending ? 'Saving…' : meeting ? 'Save changes' : 'Create meeting'}
        </button>
        <Link href="/meetings" className="text-blue-900 underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}