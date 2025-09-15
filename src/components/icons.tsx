import { cn } from "@/lib/utils";

export const SpirulinaTankIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("spirulina-tank", className)}
  >
    <style>{`
      @keyframes bubble {
        0% { transform: translateY(0px) scale(0.8); opacity: 0; }
        20% { opacity: 1; }
        80% { opacity: 1; }
        100% { transform: translateY(-20px) scale(1.2); opacity: 0; }
      }
      .bubble { animation: bubble 3s ease-in-out infinite; fill: currentColor; }
      .bubble-1 { animation-delay: 0s; }
      .bubble-2 { animation-delay: 0.8s; }
      .bubble-3 { animation-delay: 1.5s; }
    `}</style>
    <path d="M8 3h8" />
    <path d="M7 3v11a5 5 0 0 0 10 0V3" />
    <path d="M6 21h12" />
    <path d="M12 14a3 3 0 0 0-3 3v4h6v-4a3 3 0 0 0-3-3z" fill="currentColor" opacity="0.3" />
    <circle cx="11" cy="16" r="0.5" className="bubble bubble-1" />
    <circle cx="13.5" cy="15" r="0.7" className="bubble bubble-2" />
    <circle cx="12" cy="17" r="0.4" className="bubble bubble-3" />
  </svg>
);
