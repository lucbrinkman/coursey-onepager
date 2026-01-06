import { Link } from 'react-router-dom'

/**
 * Renders text with basic markdown formatting:
 * - **bold** -> <strong>bold</strong>
 * - *italic* -> <em>italic</em>
 * - [link text](/path) -> clickable link
 * - Lines starting with "- " become bullet lists
 * - Empty lines create paragraph breaks
 */
export default function FormattedText({ children }) {
  if (!children) return null

  // Process inline formatting (bold, italic, links)
  function processInline(text) {
    // First split by links [text](url)
    const linkPattern = /(\[[^\]]+\]\([^)]+\))/g
    const parts = text.split(linkPattern)

    return parts.map((part, i) => {
      // Check if it's a link
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        const [, linkText, url] = linkMatch
        if (url.startsWith('/')) {
          return <Link key={i} to={url} className="text-blue-600 hover:underline">{linkText}</Link>
        }
        return <a key={i} href={url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{linkText}</a>
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
    })
  }

  // Split by double newlines (paragraphs) or detect list items
  const lines = children.split('\n')
  const blocks = []
  let currentParagraph = []
  let currentList = []

  lines.forEach((line, idx) => {
    const trimmed = line.trim()
    const isListItem = trimmed.startsWith('- ')

    if (isListItem) {
      // Flush current paragraph first
      if (currentParagraph.length > 0) {
        blocks.push({ type: 'paragraph', content: currentParagraph.join(' ') })
        currentParagraph = []
      }
      currentList.push(trimmed.slice(2))
    } else if (trimmed === '') {
      // Empty line - flush both
      if (currentParagraph.length > 0) {
        blocks.push({ type: 'paragraph', content: currentParagraph.join(' ') })
        currentParagraph = []
      }
      if (currentList.length > 0) {
        blocks.push({ type: 'list', items: currentList })
        currentList = []
      }
    } else {
      // Regular text
      if (currentList.length > 0) {
        blocks.push({ type: 'list', items: currentList })
        currentList = []
      }
      currentParagraph.push(trimmed)
    }
  })

  // Flush remaining
  if (currentParagraph.length > 0) {
    blocks.push({ type: 'paragraph', content: currentParagraph.join(' ') })
  }
  if (currentList.length > 0) {
    blocks.push({ type: 'list', items: currentList })
  }

  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'list') {
          return (
            <ul key={i} className="list-disc pl-5 space-y-2 my-3">
              {block.items.map((item, j) => (
                <li key={j}>{processInline(item)}</li>
              ))}
            </ul>
          )
        }
        return <p key={i} className="mb-3 last:mb-0">{processInline(block.content)}</p>
      })}
    </>
  )
}
