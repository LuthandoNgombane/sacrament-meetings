import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 4;

export async function getMeetings(
  query: string = '',
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}


export async function getMeetingsByDate(
  date: string
): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT id
    FROM meetings
    WHERE date = ${date}::date
  `;

  if (rows.length === 0) return [];

  const meeting = await getMeetingById(Number(rows[0].id));
  return meeting ? [meeting] : [];
}

export type MeetingFormData = Pick<
  SacramentMeeting,
  | 'date'
  | 'meetingType'
  | 'presiding'
  | 'conducting'
  | 'openingHymn'
  | 'openingPrayer'
  | 'sacramentHymn'
  | 'closingHymn'
  | 'closingPrayer'
>;

export async function addMeeting(data: MeetingFormData): Promise<void> {
  await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting,
      opening_hymn, opening_prayer, sacrament_hymn,
      closing_hymn, closing_prayer,
      announcements, ward_business, stake_business, speakers
    )
    VALUES (
      ${data.date}::date, ${data.meetingType},
      ${data.presiding}, ${data.conducting},
      ${JSON.stringify(data.openingHymn)}::jsonb, ${data.openingPrayer},
      ${JSON.stringify(data.sacramentHymn)}::jsonb,
      ${JSON.stringify(data.closingHymn)}::jsonb, ${data.closingPrayer},
        ARRAY[]::text[], '[]'::jsonb, false, '[]'::jsonb
    )
  `;
}

export async function updateMeeting(
  id: number,
  data: MeetingFormData,
): Promise<boolean> {
  const rows = await sql`
    UPDATE meetings
    SET date = ${data.date}::date,
        meeting_type = ${data.meetingType},
        presiding = ${data.presiding},
        conducting = ${data.conducting},
        opening_hymn = ${JSON.stringify(data.openingHymn)}::jsonb,
        opening_prayer = ${data.openingPrayer},
        sacrament_hymn = ${JSON.stringify(data.sacramentHymn)}::jsonb,
        closing_hymn = ${JSON.stringify(data.closingHymn)}::jsonb,
        closing_prayer = ${data.closingPrayer}
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}


