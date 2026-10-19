// Bayraklar SVG olarak çizilir: emoji bayraklar Windows'ta harf olarak görünüyor.

export function FlagGB() {
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <clipPath id="flag-gb-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#flag-gb-t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

export function FlagRU() {
  return (
    <svg viewBox="0 0 9 6" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <rect width="9" height="2" fill="#fff" />
      <rect y="2" width="9" height="2" fill="#0039A6" />
      <rect y="4" width="9" height="2" fill="#D52B1E" />
    </svg>
  );
}

export function FlagJP() {
  return (
    <svg viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <rect width="900" height="600" fill="#fff" />
      <circle cx="450" cy="300" r="180" fill="#BC002D" />
    </svg>
  );
}

export const FLAGS = { GB: FlagGB, RU: FlagRU, JP: FlagJP } as const;
