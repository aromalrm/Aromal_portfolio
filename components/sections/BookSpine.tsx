import type { Book } from "@/lib/books";

const H = 340;
const SANS = "var(--font-inter), Inter, system-ui, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

function VText({
  x,
  y,
  size,
  fill,
  weight = 700,
  family = SANS,
  spacing = 0,
  italic = false,
  children,
}: {
  x: number;
  y: number;
  size: number;
  fill: string;
  weight?: number;
  family?: string;
  spacing?: number;
  italic?: boolean;
  children: string;
}) {
  return (
    <text
      transform={`translate(${x} ${y}) rotate(90)`}
      fill={fill}
      fontSize={size}
      fontWeight={weight}
      letterSpacing={spacing}
      fontStyle={italic ? "italic" : "normal"}
      style={{ fontFamily: family }}
    >
      {children}
    </text>
  );
}

function Edge({ id, width }: { id: string; width: number }) {
  const grad = `${id}-edge`;
  return (
    <>
      <defs>
        <linearGradient id={grad} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.38" />
          <stop offset="0.08" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="0.18" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.82" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.42" />
        </linearGradient>
      </defs>
      <rect width={width} height={H} fill={`url(#${grad})`} />
    </>
  );
}

function Frame({
  book,
  width,
  fill,
  children,
}: {
  book: Book;
  width: number;
  fill: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${H}`}
      width={width}
      height={H}
      aria-hidden="true"
      className="block h-[clamp(172px,40vw,312px)] w-auto select-none"
    >
      <title>{book.alt}</title>
      <rect width={width} height={H} fill={fill} />
      {children}
      <Edge id={book.id} width={width} />
    </svg>
  );
}

function PsychoCybernetics({ book }: { book: Book }) {
  const w = 52;
  return (
    <Frame book={book} width={w} fill="#f3ead7">
      <rect width={w} height="8" fill="#1a1a1a" />
      <rect y={H - 8} width={w} height="8" fill="#1a1a1a" />
      <VText x={16} y={28} size={9} fill="#5c5346" weight={600} spacing={0.6}>
        MAXWELL MALTZ
      </VText>
      <VText x={34} y={26} size={15} fill="#1a1a1a" family={SERIF} spacing={0.4}>
        PSYCHO-CYBERNETICS
      </VText>
      <g transform="translate(26 292)" stroke="#b42318" fill="none" strokeWidth="1.4">
        <circle r="14" />
        <circle r="8" />
        <circle r="2.4" fill="#b42318" stroke="none" />
      </g>
    </Frame>
  );
}

function Meditations({ book }: { book: Book }) {
  const w = 46;
  return (
    <Frame book={book} width={w} fill="#141414">
      <rect width={w} height="16" fill="#e25b1a" />
      <rect y="16" width={w} height="2" fill="#f0d7a2" />
      <VText x={14} y={36} size={8.5} fill="#d9c7a1" weight={500} spacing={0.4}>
        MARCUS AURELIUS
      </VText>
      <VText
        x={31}
        y={48}
        size={18}
        fill="#f4e7c8"
        family={SERIF}
        weight={600}
        italic
      >
        Meditations
      </VText>
      <g transform="translate(23 300)" fill="#e25b1a">
        <rect x="-7" y="-10" width="14" height="3" />
        <rect x="-2.2" y="-8" width="4.4" height="16" />
        <rect x="-8" y="8" width="16" height="3" />
      </g>
    </Frame>
  );
}

function NeverSplit({ book }: { book: Book }) {
  const w = 58;
  return (
    <Frame book={book} width={w} fill="#101010">
      <rect width={w} height="10" fill="#f5c518" />
      <rect y={H - 10} width={w} height="10" fill="#f5c518" />
      <VText x={16} y={28} size={9} fill="#f5c518" weight={700} spacing={0.8}>
        CHRIS VOSS
      </VText>
      <VText x={37} y={24} size={13.5} fill="#f7f7f5" spacing={0.2}>
        NEVER SPLIT THE DIFFERENCE
      </VText>
    </Frame>
  );
}

function Sapiens({ book }: { book: Book }) {
  const w = 54;
  return (
    <Frame book={book} width={w} fill="#fbfbf8">
      <VText x={15} y={28} size={8.5} fill="#6d6256" weight={600} spacing={0.3}>
        YUVAL NOAH HARARI
      </VText>
      <VText x={36} y={36} size={22} fill="#1c1c1c" spacing={1.2}>
        SAPIENS
      </VText>
      <g transform="translate(27 268)" fill="#c4552a" stroke="#c4552a" strokeLinecap="round">
        <circle cx="0" cy="-16" r="4.2" stroke="none" />
        <path d="M0 -12 V2 M0 -6 L-7 0 M0 -6 L7 0 M0 2 L-6 14 M0 2 L6 14" fill="none" strokeWidth="1.7" />
      </g>
    </Frame>
  );
}

function MansSearch({ book }: { book: Book }) {
  const w = 56;
  return (
    <Frame book={book} width={w} fill="#e7c56a">
      <rect width="7" height={H} fill="#6e3418" />
      <VText x={20} y={30} size={8.5} fill="#3d2912" weight={600} spacing={0.35}>
        VIKTOR E. FRANKL
      </VText>
      <VText x={38} y={28} size={14} fill="#1d140c" family={SERIF} weight={700}>
        Man&apos;s Search for Meaning
      </VText>
    </Frame>
  );
}

function SubtleArt({ book }: { book: Book }) {
  const w = 64;
  return (
    <Frame book={book} width={w} fill="#ff4e1a">
      <VText x={18} y={26} size={9} fill="#1a1a1a" weight={700} spacing={0.4}>
        MARK MANSON
      </VText>
      <VText x={40} y={18} size={12.5} fill="#141414" spacing={-0.15}>
        The Subtle Art of Not Giving a Fuck
      </VText>
    </Frame>
  );
}

function DeepWork({ book }: { book: Book }) {
  const w = 50;
  return (
    <Frame book={book} width={w} fill="#0e2244">
      <g stroke="#9fd0ea" strokeWidth="1.15" fill="none" opacity="0.9">
        <path d="M8 28 H42 M8 40 H42 M25 18 V52" />
        <rect x="16" y="292" width="18" height="18" transform="rotate(45 25 301)" />
      </g>
      <VText x={15} y={64} size={8.5} fill="#9fd0ea" weight={600} spacing={0.7}>
        CAL NEWPORT
      </VText>
      <VText x={33} y={58} size={18} fill="#f4f7fb" spacing={1.4}>
        DEEP WORK
      </VText>
    </Frame>
  );
}

function AtomicHabits({ book }: { book: Book }) {
  const w = 54;
  return (
    <Frame book={book} width={w} fill="#ffffff">
      <rect y={H - 9} width={w} height="9" fill="#ff5a1f" />
      <VText x={15} y={30} size={8.5} fill="#5c5348" weight={650} spacing={0.55}>
        JAMES CLEAR
      </VText>
      <VText x={35} y={34} size={15.5} fill="#161616" spacing={0.45}>
        ATOMIC HABITS
      </VText>
      <g transform="translate(27 286)">
        <circle r="13" fill="none" stroke="#ff5a1f" strokeWidth="3.2" />
        <circle r="3.1" fill="#ff5a1f" />
      </g>
    </Frame>
  );
}

const SPINES: Record<string, (props: { book: Book }) => React.ReactElement> = {
  "psycho-cybernetics": PsychoCybernetics,
  meditations: Meditations,
  "never-split-the-difference": NeverSplit,
  sapiens: Sapiens,
  "mans-search-for-meaning": MansSearch,
  "subtle-art": SubtleArt,
  "deep-work": DeepWork,
  "atomic-habits": AtomicHabits,
};

export function BookSpine({ book }: { book: Book }) {
  const Spine = SPINES[book.id] ?? PsychoCybernetics;
  return <Spine book={book} />;
}
