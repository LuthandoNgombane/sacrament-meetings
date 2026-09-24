import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <nav className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 print:hidden dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ward Meetings</h2>
          <p className="text-xs text-slate-500">Agendas and Sunday service records</p>
        </div>
        <div className="flex gap-3 text-sm">
          <Link
            href="/meetings"
            className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            All Meetings
          </Link>
          <Link
            href="/meetings/current"
            className="rounded-md bg-blue-600 px-3 py-1.5 font-medium text-white hover:bg-blue-700"
          >
            This Sunday
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}