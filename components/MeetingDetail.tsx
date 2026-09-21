'use client';

import type { SacramentMeeting } from '@/lib/types';

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <article className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm print:border-none print:shadow-none dark:border-slate-800 dark:bg-slate-900">
      <div className="flex justify-between items-start border-b border-slate-200 pb-4 dark:border-slate-750">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sacrament Meeting Agenda
          </h2>
          <p className="text-sm text-slate-500">
            {new Date(meeting.date + 'T00:00:00').toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="print:hidden rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
        >
          Print Agenda
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg dark:bg-slate-800/50">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Presiding</span>
          <p className="font-medium text-slate-800 dark:text-slate-200">{meeting.presiding}</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Conducting</span>
          <p className="font-medium text-slate-800 dark:text-slate-200">{meeting.conducting}</p>
        </div>
      </div>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Announcements</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-slate-300">
            {meeting.announcements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-6 divide-y divide-slate-100 border-y border-slate-100 text-sm dark:divide-slate-800 dark:border-slate-800">
        <div className="flex justify-between py-2.5">
          <span className="text-slate-500">Opening Hymn</span>
          <span className="font-medium text-slate-900 dark:text-white">#{meeting.openingHymn.number} - {meeting.openingHymn.title}</span>
        </div>
        <div className="flex justify-between py-2.5">
          <span className="text-slate-500">Invocation</span>
          <span className="font-medium text-slate-900 dark:text-white">{meeting.openingPrayer}</span>
        </div>

        {meeting.wardBusiness.length > 0 && (
          <div className="py-2.5">
            <span className="text-slate-500">Ward Business</span>
            <ul className="mt-1 list-inside list-disc pl-2 text-slate-800 dark:text-slate-200">
              {meeting.wardBusiness.map((b, i) => (
                <li key={i}>{b.description}</li>
              ))}
            </ul>
          </div>
        )}

        {meeting.stakeBusiness && (
          <div className="flex justify-between py-2.5 text-amber-700 dark:text-amber-400">
            <span>Stake Business</span>
            <span className="font-medium">Conducted by Stake Presidency</span>
          </div>
        )}

        {meeting.sacramentHymn.number > 0 && (
          <div className="flex justify-between py-2.5">
            <span className="text-slate-500">Sacrament Hymn</span>
            <span className="font-medium text-slate-900 dark:text-white">#{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</span>
          </div>
        )}

        {meeting.speakers.length > 0 && (
          <div className="py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Speakers & Musical Numbers</span>
            <div className="mt-2 space-y-2">
              {meeting.speakers.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {item.name} {item.type === 'musical-number' ? '(Special Musical Number)' : ''}
                  </span>
                  {item.topic && <span className="text-slate-500 italic">{item.topic}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between py-2.5">
          <span className="text-slate-500">Closing Hymn</span>
          <span className="font-medium text-slate-900 dark:text-white">#{meeting.closingHymn.number} - {meeting.closingHymn.title}</span>
        </div>
        <div className="flex justify-between py-2.5">
          <span className="text-slate-500">Benediction</span>
          <span className="font-medium text-slate-900 dark:text-white">{meeting.closingPrayer}</span>
        </div>
      </div>
    </article>
  );
}