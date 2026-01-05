import { Link } from 'react-router-dom'

/**
 * Renders text with basic markdown formatting:
 * - **bold** -> <strong>bold</strong>
 * - *italic* -> <em>italic</em>
 * - [link text](/path) -> clickable link
 * - Line breaks are preserved (use with whitespace-pre-line)
 */
export default function FormattedText({ children }) {
  if (!children) return null

  // First split by links [text](url)
  const linkPattern = /(\[[^\]]+\]\([^)]+\))/g
  const parts = children.split(linkPattern)

  return (
    <>
      {parts.map((part, i) => {
        // Check if it's a link
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (linkMatch) {
          const [, text, url] = linkMatch
          if (url.startsWith('/')) {
            return <Link key={i} to={url} className="text-blue-600 hover:underline">{text}</Link>
          }
          return <a key={i} href={url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{text}</a>
        }

        // Otherwise, process for bold/italic
        const formattedParts = part.split(/(\*\*.*?\*\*|\*(?!\*).*?(?<!\*)\*)/g)
        return formattedParts.map((fpart, j) => {
          if (fpart.startsWith('**') && fpart.endsWith('**')) {
            return <strong key={`${i}-${j}`}>{fpart.slice(2, -2)}</strong>
          }
          if (fpart.startsWith('*') && fpart.endsWith('*') && fpart.length > 2) {
            return <em key={`${i}-${j}`}>{fpart.slice(1, -1)}</em>
          }
          return fpart
        })
      })}
    </>
  )
}
