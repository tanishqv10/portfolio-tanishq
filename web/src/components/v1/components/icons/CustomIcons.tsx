import React from "react";

export const CricketIcon = ({ size = 32, className = "" }: { size?: number; className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Cricket Bat (Vertical) */}
        <path d="M9 4 h6 v14 h-6 z" /> {/* Blade */}
        <path d="M11 0 v4" /> {/* Handle */}
        <path d="M13 0 v4" /> {/* Handle thickness */}

        {/* Cricket Ball */}
        <circle cx="19" cy="20" r="3" />
        <path d="M16 20 h6" /> {/* Seam */}
    </svg>
);

export const BadmintonIcon = ({ size = 32, className = "" }: { size?: number; className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Racquet */}
        <circle cx="10" cy="9" r="6" />
        <line x1="10" y1="15" x2="10" y2="22" />
        <line x1="10" y1="9" x2="10" y2="3" strokeOpacity="0.3" /> {/* String detail */}
        <line x1="7" y1="9" x2="13" y2="9" strokeOpacity="0.3" /> {/* String detail */}

        {/* Shuttlecock */}
        <path d="M19 16 l-3 5 h6 z" fill="currentColor" fillOpacity="0.2" />
        <circle cx="19" cy="21" r="1.5" fill="currentColor" />
    </svg>
);
