import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  // ... add remaining records
{
  id: 2,
  date: '2026-11-08',
  meetingType: 'regular',
  presiding: 'Bishop Smith',
  conducting: 'Brother Jones',
  announcements: [
    'Youth activity: May 13',
    'Relief Society service project: May 16'
  ],
  openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
  openingPrayer: 'Brother Nelson',
  wardBusiness: [],
  stakeBusiness: false,
  sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
  speakers: [
    {
      name: 'Sister Dlamini',
      topic: 'Serving others with love',
      type: 'speaker'
    },
    {
      name: 'Brother Mokoena',
      topic: 'Following the example of Jesus Christ',
      type: 'speaker'
    }
  ],
  closingHymn: { number: 308, title: 'Love One Another' },
  closingPrayer: 'Sister Naidoo'
},
{
  id: 3,
  date: '2026-05-17',
  meetingType: 'regular',
  presiding: 'Bishop Smith',
  conducting: 'Brother Adams',
  announcements: ['Ward family history workshop: May 23'],
  openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
  openingPrayer: 'Sister Khumalo',
  wardBusiness: [
    { description: 'Sustaining of new Sunday School teachers' },
    { description: 'Release of outgoing ward music leader with thanks' }
  ],
  stakeBusiness: true,
  sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
  speakers: [
    {
      name: 'Brother Ngombane',
      topic: 'Learning through scripture study',
      type: 'speaker'
    },
    {
      name: 'Ward Choir',
      topic: 'Be Still, My Soul',
      type: 'musical-number'
    },
    {
      name: 'Sister Petersen',
      topic: 'Recognizing personal revelation',
      type: 'speaker'
    }
  ],
  closingHymn: { number: 6, title: 'Redeemer of Israel' },
  closingPrayer: 'Brother Botha'
},
{
  id: 4,
  date: '2026-05-24',
  meetingType: 'regular',
  presiding: 'Bishop Smith',
  conducting: 'Brother Adams',
  announcements: [],
  openingHymn: { number: 21, title: 'Come, Listen to a Prophet’s Voice' },
  openingPrayer: 'Brother Molefe',
  wardBusiness: [],
  stakeBusiness: false,
  sacramentHymn: { number: 194, title: 'There Is a Green Hill Far Away' },
  speakers: [
    {
      name: 'Sister Jacobs',
      topic: 'The blessings of prayer',
      type: 'speaker'
    },
    {
      name: 'Brother Williams',
      topic: 'Strengthening faith during difficult times',
      type: 'speaker'
    }
  ],
  closingHymn: { number: 301, title: 'I Am a Child of God' },
  closingPrayer: 'Sister Maseko'
},
{
  id: 5,
  date: '2026-06-07',
  meetingType: 'testimony',
  presiding: 'Bishop Smith',
  conducting: 'Brother Jones',
  announcements: [
    'Youth scripture study: June 10',
    'Ward service activity: June 13'
  ],
  openingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
  openingPrayer: 'Sister Brown',
  wardBusiness: [],
  stakeBusiness: false,
  sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
  speakers: [],
  closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
  closingPrayer: 'Brother Dube'
}











];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}
