import Link from 'next/link'

function ButtonLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="font-mono text-xl relative uppercase bg-red-600 text-white hover:bg-red-500 px-8 py-2 rounded-full shadow-[0_4px_0_#800] active:shadow-[0_2px_0_#800] active:top-[2px]"
    >
      {children}
    </Link>
  )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        <li>
          <ButtonLink href="/boggle">Boggle</ButtonLink>
        </li>
      </ul>
    </main>
  )
}
