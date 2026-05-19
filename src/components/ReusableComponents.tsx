interface CardData {
  title: string
  content: React.ReactNode
  accent?: 'cyan' | 'gold' | 'green' | 'red' | 'purple'
}

const ACCENT_MAP = {
  cyan: '#00d4ff',
  gold: '#ffd700',
  green: '#00ff88',
  red: '#ff4444',
  purple: '#ff00ff',
}

export function CardGrid({ cards, className = '' }: { cards: CardData[]; className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5 my-8 ${className}`}>
      {cards.map((card, i) => (
        <div key={i} className="arch-card animate-in">
          <h4
            className="text-base font-semibold mb-2"
            style={{ color: ACCENT_MAP[card.accent || 'cyan'], fontFamily: 'Space Grotesk' }}
          >
            {card.title}
          </h4>
          <div className="text-[#aaa] text-sm leading-relaxed">{card.content}</div>
        </div>
      ))}
    </div>
  )
}

interface TableData {
  headers: string[]
  rows: (string | React.ReactNode)[][]
}

export function DataTable({ data, className = '' }: { data: TableData; className?: string }) {
  return (
    <div className={`overflow-x-auto my-6 animate-in ${className}`}>
      <table className="w-full border-collapse rounded-xl overflow-hidden" style={{ background: '#1a1a2e' }}>
        <thead>
          <tr style={{ background: '#16213e' }}>
            {data.headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-4 py-3 text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap"
                style={{ color: '#00d4ff' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr
              key={ri}
              className="transition-colors hover:bg-[rgba(0,212,255,0.03)]"
              style={{ borderBottom: ri < data.rows.length - 1 ? '1px solid #2a2a3e' : 'none' }}
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-sm text-[#aaa] align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function HighlightBox({
  title,
  children,
  variant = 'cyan',
}: {
  title: string
  children: React.ReactNode
  variant?: 'cyan' | 'gold' | 'red' | 'green' | 'purple'
}) {
  const classMap = {
    cyan: '',
    gold: 'gold',
    red: 'red',
    green: 'green',
    purple: 'purple',
  }
  return (
    <div className={`highlight-box ${classMap[variant]} animate-in`}>
      <h4 className="text-base font-semibold mb-2 text-white" style={{ fontFamily: 'Space Grotesk' }}>
        {title}
      </h4>
      <div className="text-[#aaa] text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export function FormulaDisplay({ formula }: { formula: string }) {
  return (
    <div className="formula animate-in">
      <code>{formula}</code>
    </div>
  )
}

export function DiagramPlaceholder({ caption }: { caption: string }) {
  return (
    <div className="diagram-placeholder animate-in">
      <p className="text-[#888] text-sm italic mb-2">{caption}</p>
    </div>
  )
}

export function SectionIntro({ children }: { children: React.ReactNode }) {
  return <p className="section-intro animate-in">{children}</p>
}

export function Tag({ children, variant = 'low' }: { children: React.ReactNode; variant?: 'low' | 'med' | 'high' }) {
  const classMap = {
    low: 'tag-low',
    med: 'tag-med',
    high: 'tag-high',
  }
  return <span className={`tag ${classMap[variant]}`}>{children}</span>
}
