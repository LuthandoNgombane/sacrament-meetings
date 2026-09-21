import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <section className="flex flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
        <div className="max-w-xl space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Sacrament Meeting Planner
          </h1>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
            A unified application for bishoprics, leaders, and ward members. Plan future
            programs, manage announcements and music, and view or print Sunday agendas.
          </p>
          <div className="flex gap-4 pt-2">
            <Link
              href="/meetings/current"
              className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Current Program
            </Link>
            <Link
              href="/meetings"
              className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Browse All Meetings
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-lg dark:border-slate-800">
          <Image
            src="https://images.unsplash.com/photo-1543165796-5426273eaab3?auto=format&fit=crop&w=800&q=80"
            alt="Chapel pulpit and sacrament meeting hall"
            width={480}
            height={320}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}