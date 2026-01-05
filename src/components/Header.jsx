import { header } from '../../textContent'

export default function Header() {
  return (
    <header className="py-12 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        {header.title}
      </h1>
    </header>
  )
}
