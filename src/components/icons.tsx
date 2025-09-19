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


export const SystemDiagramIcon = ({ className, waterLevel = 80, cultureColor = 'hsl(150, 54%, 48%)', mixerOn = false, lightOn = true }: {
    className?: string;
    waterLevel?: number;
    cultureColor?: string;
    mixerOn?: boolean;
    lightOn?: boolean;
}) => {
    const waterHeight = 155 * (waterLevel / 100);
    const waterY = 210 - waterHeight;
    
    return (
        <svg viewBox="0 0 400 300" className={cn(className)}>
            <style>
                {`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .mixer-blade {
                    transform-origin: center;
                    animation: spin 3s linear infinite;
                }
                .light-glow {
                   filter: drop-shadow(0 0 8px hsl(var(--primary)));
                }
                `}
            </style>
            
            {/* Main Tank Structure */}
            <rect x="100" y="50" width="200" height="200" rx="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2"/>
            <rect x="90" y="40" width="220" height="20" rx="5" fill="#CBD5E1" />
            <rect x="90" y="250" width="220" height="10" rx="5" fill="#CBD5E1" />

            {/* Water/Culture */}
            <g clipPath="url(#tankClip)">
                <rect x="100" y={waterY} width="200" height={waterHeight} style={{ fill: cultureColor, transition: 'y 0.5s ease, height 0.5s ease, fill 0.5s ease' }} />
            </g>
            <clipPath id="tankClip">
                <rect x="100" y="50" width="200" height="200" rx="10"/>
            </clipPath>

            {/* Pipes */}
            <rect x="300" y="100" width="50" height="15" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
            <path d="M350 107.5 H 370 V 220 H 300" stroke="#CBD5E1" strokeWidth="15" fill="none" />
             <path d="M350 107.5 H 370 V 220 H 300" stroke="#94A3B8" strokeWidth="1.5" fill="none" />

            <rect x="50" y="100" width="50" height="15" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
            <path d="M50 107.5 H 30 V 150 H 100" stroke="#CBD5E1" strokeWidth="15" fill="none" />
             <path dM="50 107.5 H 30 V 150 H 100" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
            
            {/* Mixer */}
            <line x1="200" y1="50" x2="200" y2="180" stroke="#94A3B8" strokeWidth="3" />
            <g className={cn(mixerOn ? "mixer-blade": "")}>
                <rect x="185" y="180" width="30" height="4" rx="2" fill="#94A3B8" />
                <rect x="198" y="175" width="4" height="30" rx="2" fill="#94A3B8" />
            </g>
            
            {/* Light */}
            <g className={cn(lightOn ? 'light-glow' : '')} style={{transition: 'filter 0.3s ease'}}>
               <rect x="140" y="25" width="120" height="10" rx="5" fill={lightOn ? 'hsl(var(--primary))' : '#94A3B8'}  style={{ transition: 'fill 0.3s ease' }} />
            </g>

        </svg>
    )
};
