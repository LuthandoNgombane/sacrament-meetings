// components/DeleteMeetingButton.tsx
'use client';

import { deleteMeetingAction } from '@/lib/actions';

interface DeleteMeetingButtonProps {
  id: number;
}

export default function DeleteMeetingButton({ id }: DeleteMeetingButtonProps) {
  const deleteWithId = deleteMeetingAction.bind(null, id);

  return (
    <form
      action={deleteWithId}
      onSubmit={(e) => {
        if (!confirm('Are you sure you want to delete this sacrament meeting?')) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        aria-label="Delete sacrament meeting"
        className="rounded border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950"
      >
        Delete
      </button>
    </form>
  );
}