export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[9999] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-primary/10 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary animate-pulse">LMAI Console</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
