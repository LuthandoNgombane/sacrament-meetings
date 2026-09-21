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
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: 'Nearer, My God, to Thee', type: 'musical-number' },
      { name: 'Brother Taylor', topic: 'Covenants and Ordinances', type: 'speaker' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10', 'Youth activity Wednesday at 7:00 PM']
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Bishop Smith',
    openingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
    openingPrayer: 'Brother Adams',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'Congregation', topic: 'Bearing of Testimonies', type: 'speaker' }
    ],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Sister Clark',
    announcements: ['Fast Sunday offerings collection', 'Tithing settlement appointments open']
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'President Miller (Stake Presidency)',
    conducting: 'Brother Evans',
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Sister Harris',
    wardBusiness: [{ description: 'Release of Sunday School teacher' }],
    stakeBusiness: true,
    sacramentHymn: { number: 184, title: 'Upon the Cross of Calvary' },
    speakers: [
      { name: 'Sister Evans', topic: 'Building Stronger Families', type: 'speaker' },
      { name: 'President Miller', topic: 'Follow the Living Prophet', type: 'speaker' }
    ],
    closingHymn: { number: 243, title: 'Let Us All Press On' },
    closingPrayer: 'Brother Nelson',
    announcements: ['Stake blood drive this Saturday at the Stake Center']
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'stake',
    presiding: 'President Miller',
    conducting: 'President Miller',
    openingHymn: { number: 6, title: 'Redeemer of Israel' },
    openingPrayer: 'Stake Representative',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 0, title: 'N/A - Non-sacrament meeting' },
    speakers: [
      { name: 'High Council Speaker', topic: 'Ministering with Love', type: 'speaker' },
      { name: 'Stake Relief Society President', topic: 'Charity Never Faileth', type: 'speaker' }
    ],
    closingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    closingPrayer: 'Stake Representative',
    announcements: ['Stake Conference held at the Stake Center. No ward sacrament service.']
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'general',
    presiding: 'First Presidency',
    conducting: 'The Twelve Apostles',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'General Authority',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 0, title: 'N/A - Non-sacrament meeting' },
    speakers: [
      { name: 'General Authorities & Officers', topic: 'General Conference Addresses', type: 'speaker' }
    ],
    closingHymn: { number: 144, title: 'Secret Prayer' },
    closingPrayer: 'General Authority',
    announcements: ['General Conference weekend. Rebroadcasts available on ChurchofJesusChrist.org.']
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}