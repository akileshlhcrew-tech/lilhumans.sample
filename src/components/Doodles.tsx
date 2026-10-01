import React from 'react';

export const SmilingSun: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Sun rays */}
    <g stroke="#F59E0B" strokeWidth="3" strokeLinecap="round">
      <path d="M50 12V2" />
      <path d="M50 98V88" />
      <path d="M12 50H2" />
      <path d="M98 50H88" />
      <path d="M23 23L16 16" />
      <path d="M84 84L77 77" />
      <path d="M23 77L16 84" />
      <path d="M84 16L77 23" />
      {/* Little accent dots */}
      <circle cx="30" cy="18" r="2.5" fill="#FBBF24" stroke="none" />
      <circle cx="70" cy="18" r="2.5" fill="#FBBF24" stroke="none" />
      <circle cx="82" cy="30" r="2.5" fill="#FBBF24" stroke="none" />
      <circle cx="82" cy="70" r="2.5" fill="#FBBF24" stroke="none" />
      <circle cx="70" cy="82" r="2.5" fill="#FBBF24" stroke="none" />
      <circle cx="30" cy="82" r="2.5" fill="#FBBF24" stroke="none" />
      <circle cx="18" cy="70" r="2.5" fill="#FBBF24" stroke="none" />
      <circle cx="18" cy="30" r="2.5" fill="#FBBF24" stroke="none" />
    </g>
    {/* Sun body */}
    <circle cx="50" cy="50" r="26" fill="#FDE68A" stroke="#F59E0B" strokeWidth="3" />
    {/* Cute eyes */}
    <circle cx="41" cy="47" r="3" fill="#374151" />
    <circle cx="59" cy="47" r="3" fill="#374151" />
    {/* Smile */}
    <path d="M43 54C46 58 54 58 57 54" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
    {/* Blush */}
    <ellipse cx="37" cy="52" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.8" />
    <ellipse cx="63" cy="52" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.8" />
  </svg>
);

export const DoodleCloud: React.FC<{ className?: string; stroke?: string }> = ({
  className = 'w-16 h-10',
  stroke = '#38BDF8'
}) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M25 50H78C87 50 94 43 94 34C94 26 88 19 80 18C78 9 70 3 60 3C53 3 46 7 42 13C39 10 34 8 29 8C17 8 8 18 8 30C8 41 16 50 25 50Z"
      fill="white"
      fillOpacity="0.85"
      stroke={stroke}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleRainbow: React.FC<{ className?: string }> = ({ className = 'w-20 h-14' }) => (
  <svg viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer band: pink/coral */}
    <path d="M10 60 A40 40 0 0 1 90 60" stroke="#FB7185" strokeWidth="5" strokeLinecap="round" />
    {/* Second band: warm yellow */}
    <path d="M20 60 A30 30 0 0 1 80 60" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
    {/* Third band: pastel mint */}
    <path d="M30 60 A20 20 0 0 1 70 60" stroke="#34D399" strokeWidth="5" strokeLinecap="round" />
    {/* Inner band: soft sky blue */}
    <path d="M40 60 A10 10 0 0 1 60 60" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const DoodleHeart: React.FC<{ className?: string; color?: string; fill?: string }> = ({
  className = 'w-6 h-6',
  color = '#F43F5E',
  fill = 'none'
}) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const DoodlePaperPlane: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = '#60A5FA'
}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
  </svg>
);

export const DoodleStar: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#F59E0B'
}) => (
  <svg viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 2L14.7 8.5L21.7 9.1L16.4 13.8L18 20.7L12 17.1L6 20.7L7.6 13.8L2.3 9.1L9.3 8.5L12 2Z" />
  </svg>
);
