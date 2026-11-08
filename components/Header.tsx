import NavLinks from './NavLinks';
import { connection } from "next/server";

export default async function Header() {
  await connection();

  const currentDate = new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "full",
    timeZone: "Africa/Johannesburg",
  }).format(new Date());

  return (
    <header className="border-b border-slate-200 bg-white print:hidden">
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-6">
        <div>
          <p className="text-2xl font-bold text-blue-900">
            Luthando Ngombane
          </p>
          <p className="text-sm text-slate-600">{currentDate}</p>
        </div>

        <NavLinks />
      </div>
    </header>
  );
}