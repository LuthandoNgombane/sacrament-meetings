export default function MeetingsLoading() {
  return (
    <div className="space-y-4 max-w-4xl mx-auto p-4 animate-pulse">
      <div className="h-10 w-48 bg-slate-200 rounded" />
      <div className="h-10 w-full bg-slate-200 rounded" />
      <div className="space-y-3 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-slate-100 rounded-lg border border-slate-200" />
        ))}
      </div>
    </div>
  );
}