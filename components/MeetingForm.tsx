'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { createMeeting, updateMeetingAction, State } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingFormProps {
  meeting?: SacramentMeeting; // Present when editing; undefined when creating
}

export default function MeetingForm({ meeting }: MeetingFormProps) {
  const isEditing = Boolean(meeting);

  // If editing, bind the meeting id as the first argument
  const boundAction = isEditing && meeting
    ? updateMeetingAction.bind(null, meeting.id)
    : createMeeting;

  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(boundAction, initialState);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow-sm border" noValidate>
      {/* Top-level general error message */}
      {state.message && (
        <div
          role="alert"
          aria-live="polite"
          className="p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded"
        >
          {state.message}
        </div>
      )}

      {/* Date & Meeting Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-semibold text-gray-700">
            Meeting Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={meeting?.date ?? ''}
            aria-describedby="date-error"
            className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <div id="date-error" aria-live="polite" aria-atomic="true">
            {state.errors?.date?.map((err: string) => (
              <p key={err} className="text-xs text-red-600 mt-1">{err}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="meetingType" className="block text-sm font-semibold text-gray-700">
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting?.meetingType ?? 'regular'}
            aria-describedby="meetingType-error"
            className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none bg-white"
          >
            <option value="regular">Regular</option>
            <option value="testimony">Fast & Testimony</option>
            <option value="stake">Stake Conference</option>
            <option value="general">General Conference</option>
          </select>
          <div id="meetingType-error" aria-live="polite" aria-atomic="true">
            {state.errors?.meetingType?.map((err: string) => (
              <p key={err} className="text-xs text-red-600 mt-1">{err}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Presiding & Conducting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="presiding" className="block text-sm font-semibold text-gray-700">
            Presiding
          </label>
          <input
            type="text"
            id="presiding"
            name="presiding"
            placeholder="e.g. Bishop Smith"
            defaultValue={meeting?.presiding ?? ''}
            aria-describedby="presiding-error"
            className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <div id="presiding-error" aria-live="polite" aria-atomic="true">
            {state.errors?.presiding?.map((err: string) => (
              <p key={err} className="text-xs text-red-600 mt-1">{err}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="conducting" className="block text-sm font-semibold text-gray-700">
            Conducting
          </label>
          <input
            type="text"
            id="conducting"
            name="conducting"
            placeholder="e.g. Brother Jones"
            defaultValue={meeting?.conducting ?? ''}
            aria-describedby="conducting-error"
            className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <div id="conducting-error" aria-live="polite" aria-atomic="true">
            {state.errors?.conducting?.map((err: string) => (
              <p key={err} className="text-xs text-red-600 mt-1">{err}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Opening Hymn & Prayer */}
      <fieldset className="border p-4 rounded border-gray-200">
        <legend className="text-sm font-semibold text-gray-800 px-1">Opening</legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label htmlFor="openingHymnNumber" className="block text-xs font-medium text-gray-700">
              Hymn #
            </label>
            <input
              type="number"
              id="openingHymnNumber"
              name="openingHymnNumber"
              defaultValue={meeting?.openingHymn?.number ?? ''}
              aria-describedby="openingHymnNumber-error"
              className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm"
            />
            <div id="openingHymnNumber-error" aria-live="polite" aria-atomic="true">
              {state.errors?.openingHymnNumber?.map((err: string) => (
                <p key={err} className="text-xs text-red-600 mt-1">{err}</p>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="openingHymnTitle" className="block text-xs font-medium text-gray-700">
              Hymn Title
            </label>
            <input
              type="text"
              id="openingHymnTitle"
              name="openingHymnTitle"
              defaultValue={meeting?.openingHymn?.title ?? ''}
              aria-describedby="openingHymnTitle-error"
              className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm"
            />
            <div id="openingHymnTitle-error" aria-live="polite" aria-atomic="true">
              {state.errors?.openingHymnTitle?.map((err: string) => (
                <p key={err} className="text-xs text-red-600 mt-1">{err}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="openingPrayer" className="block text-xs font-medium text-gray-700">
            Opening Prayer
          </label>
          <input
            type="text"
            id="openingPrayer"
            name="openingPrayer"
            defaultValue={meeting?.openingPrayer ?? ''}
            aria-describedby="openingPrayer-error"
            className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm"
          />
          <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.openingPrayer?.map((err: string) => (
              <p key={err} className="text-xs text-red-600 mt-1">{err}</p>
            ))}
          </div>
        </div>
      </fieldset>

      {/* Sacrament Hymn */}
      <fieldset className="border p-4 rounded border-gray-200">
        <legend className="text-sm font-semibold text-gray-800 px-1">Sacrament</legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label htmlFor="sacramentHymnNumber" className="block text-xs font-medium text-gray-700">
              Hymn #
            </label>
            <input
              type="number"
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              defaultValue={meeting?.sacramentHymn?.number ?? ''}
              aria-describedby="sacramentHymnNumber-error"
              className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm"
            />
            <div id="sacramentHymnNumber-error" aria-live="polite" aria-atomic="true">
              {state.errors?.sacramentHymnNumber?.map((err: string) => (
                <p key={err} className="text-xs text-red-600 mt-1">{err}</p>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="sacramentHymnTitle" className="block text-xs font-medium text-gray-700">
              Hymn Title
            </label>
            <input
              type="text"
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              defaultValue={meeting?.sacramentHymn?.title ?? ''}
              aria-describedby="sacramentHymnTitle-error"
              className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm"
            />
            <div id="sacramentHymnTitle-error" aria-live="polite" aria-atomic="true">
              {state.errors?.sacramentHymnTitle?.map((err: string) => (
                <p key={err} className="text-xs text-red-600 mt-1">{err}</p>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      {/* Closing Hymn & Prayer */}
      <fieldset className="border p-4 rounded border-gray-200">
        <legend className="text-sm font-semibold text-gray-800 px-1">Closing</legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label htmlFor="closingHymnNumber" className="block text-xs font-medium text-gray-700">
              Hymn #
            </label>
            <input
              type="number"
              id="closingHymnNumber"
              name="closingHymnNumber"
              defaultValue={meeting?.closingHymn?.number ?? ''}
              aria-describedby="closingHymnNumber-error"
              className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm"
            />
            <div id="closingHymnNumber-error" aria-live="polite" aria-atomic="true">
              {state.errors?.closingHymnNumber?.map((err: string) => (
                <p key={err} className="text-xs text-red-600 mt-1">{err}</p>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="closingHymnTitle" className="block text-xs font-medium text-gray-700">
              Hymn Title
            </label>
            <input
              type="text"
              id="closingHymnTitle"
              name="closingHymnTitle"
              defaultValue={meeting?.closingHymn?.title ?? ''}
              aria-describedby="closingHymnTitle-error"
              className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm"
            />
            <div id="closingHymnTitle-error" aria-live="polite" aria-atomic="true">
              {state.errors?.closingHymnTitle?.map((err: string) => (
                <p key={err} className="text-xs text-red-600 mt-1">{err}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="closingPrayer" className="block text-xs font-medium text-gray-700">
            Closing Prayer
          </label>
          <input
            type="text"
            id="closingPrayer"
            name="closingPrayer"
            defaultValue={meeting?.closingPrayer ?? ''}
            aria-describedby="closingPrayer-error"
            className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm"
          />
          <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.closingPrayer?.map((err: string) => (
              <p key={err} className="text-xs text-red-600 mt-1">{err}</p>
            ))}
          </div>
        </div>
      </fieldset>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        <Link
          href="/"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {isPending ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Meeting' : 'Create Meeting')}
        </button>
      </div>
    </form>
  );
}