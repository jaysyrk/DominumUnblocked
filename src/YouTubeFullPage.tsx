import { Youtube } from 'lucide-react';

export default function YouTubeFullPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="flex items-center gap-3 px-6 py-4 bg-red-600 shadow-lg">
        <Youtube size={32} className="text-white" />
        <h1 className="text-2xl font-black text-white tracking-tight">YouTube (Embedded)</h1>
      </header>
      <div className="flex-1">
        <iframe
          src="https://www.youtube.com/"
          title="YouTube Embedded"
          className="w-full h-[calc(100vh-64px)] border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        />
      </div>
    </div>
  );
}
