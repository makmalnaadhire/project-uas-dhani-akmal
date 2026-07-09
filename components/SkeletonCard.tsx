export default function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-zinc-900 animate-pulse border border-slate-800/40 p-5 w-full h-[400px] flex flex-col">
      {/* Top accent bar placeholder */}
      <div className="h-1 rounded-full bg-slate-800 mb-4" />

      {/* Brand & Series + Status badge row */}
      <div className="flex items-center justify-between mb-3">
        <div className="h-3 w-28 rounded-md bg-slate-800" />
        <div className="h-4 w-14 rounded-full bg-slate-800" />
      </div>

      {/* Laptop Name */}
      <div className="space-y-1.5 mb-4">
        <div className="h-4 w-full rounded-md bg-slate-800" />
        <div className="h-4 w-3/4 rounded-md bg-slate-800" />
      </div>

      {/* Spec Grid (2x2) */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="h-2 w-12 rounded bg-slate-800 mb-1.5" />
            <div className="h-3 w-full rounded bg-slate-800" />
          </div>
        ))}
      </div>

      {/* Category Tags */}
      <div className="flex gap-1 mb-4">
        <div className="h-4 w-14 rounded-md bg-slate-800" />
        <div className="h-4 w-16 rounded-md bg-slate-800" />
        <div className="h-4 w-12 rounded-md bg-slate-800" />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Price Range */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
        <div className="h-2 w-20 rounded bg-slate-800 mb-2" />
        <div className="h-4 w-40 rounded bg-slate-800 mb-2" />
        <div className="h-2 w-full rounded bg-slate-800/60 mt-2 pt-2" />
      </div>

      {/* Action Row */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-10 rounded-xl bg-slate-800" />
        <div className="h-10 w-10 rounded-xl bg-slate-800" />
        <div className="h-10 w-10 rounded-xl bg-slate-800" />
      </div>
    </div>
  );
}
