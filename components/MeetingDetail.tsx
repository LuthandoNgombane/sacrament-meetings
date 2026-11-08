import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="space-y-6 rounded-lg bg-white p-6 shadow-sm print:p-0 print:shadow-none">
      <header>
        <h1 className="text-3xl font-bold">Meeting Program</h1>

        <p className="mt-2">
          <time dateTime={meeting.date}>{meeting.date}</time>
        </p>

        <p className="capitalize">Meeting type: {meeting.meetingType}</p>
        <p>Presiding: {meeting.presiding}</p>
        <p>Conducting: {meeting.conducting}</p>
      </header>

      <section>
        <h2 className="text-xl font-semibold">Opening</h2>
        <p>
          Hymn #{meeting.openingHymn.number}: {meeting.openingHymn.title}
        </p>
        <p>Prayer: {meeting.openingPrayer}</p>
      </section>

      <section>
            <h2 className="text-xl font-semibold">Announcements</h2>

            {meeting.announcements?.length ? (
                <ul className="list-disc space-y-1 pl-5">
                {meeting.announcements.map((announcement, index) => (
                    <li key={index}>{announcement}</li>
                ))}
                </ul>
            ) : (
                <p>No announcements.</p>
            )}
        </section>

        <section>
        <h2 className="text-xl font-semibold">Ward Business</h2>

        {meeting.wardBusiness.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5">
            {meeting.wardBusiness.map((item, index) => (
                <li key={index}>{item.description}</li>
            ))}
            </ul>
        ) : (
            <p>No ward business.</p>
        )}
        </section>

        <section>
        <h2 className="text-xl font-semibold">Stake Business</h2>
        <p>{meeting.stakeBusiness ? 'Yes' : 'No'}</p>
        </section>

        {(meeting.meetingType === 'regular' ||
        meeting.meetingType === 'testimony') && (
        <section>
            <h2 className="text-xl font-semibold">Sacrament</h2>
            <p>
            Hymn #{meeting.sacramentHymn.number}:{' '}
            {meeting.sacramentHymn.title}
            </p>
            <p className="mt-2">Administration of the sacrament</p>
        </section>
        )}

        <section>
        <h2 className="text-xl font-semibold">
            {meeting.meetingType === 'testimony'
            ? 'Testimonies'
            : 'Speakers and Musical Numbers'}
        </h2>

        {meeting.meetingType === 'testimony' && (
            <p className="mt-2">Bearing of testimonies</p>
        )}

        {meeting.speakers.length > 0 ? (
            <ol className="mt-2 list-decimal space-y-4 pl-5">
            {meeting.speakers.map((item, index) => (
                <li key={index}>
                <p className="font-medium">
                    {item.type === 'musical-number'
                    ? 'Musical number'
                    : 'Speaker'}
                    : {item.name}
                </p>

                {item.topic && (
                    <p className="text-slate-600">
                    {item.type === 'musical-number' ? 'Selection' : 'Topic'}
                    : {item.topic}
                    </p>
                )}
                </li>
            ))}
            </ol>
        ) : (
            meeting.meetingType !== 'testimony' && (
            <p className="mt-2">No speakers or musical numbers listed.</p>
            )
        )}
        </section>

        <section>
        <h2 className="text-xl font-semibold">Closing</h2>
        <p>
            Hymn #{meeting.closingHymn.number}: {meeting.closingHymn.title}
        </p>
        <p>Prayer: {meeting.closingPrayer}</p>
        </section>


    </article>
  );
}