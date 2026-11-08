import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-900">
          Sacrament Meeting Planner
        </h1>

        <p className="mt-3 text-slate-700">
          View meeting agendas, find this Sunday’s program, and print
          programs for current and past meetings.
        </p>
      </div>

      <Image
        src="/meeting-hero.jpg"
        alt="Rows of seating facing the pulpit in a chapel"
        width={1200}
        height={800}
        sizes="(max-width: 1024px) 100vw, 992px"
        className="h-auto w-full rounded-lg"
      />

      <Link
        href="/meetings"
        className="inline-block rounded bg-blue-800 px-5 py-3 font-medium text-white hover:bg-blue-900"
      >
        View meetings
      </Link>
    </section>
  );
}