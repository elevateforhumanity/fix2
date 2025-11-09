import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Elevate for Humanity</h1>
        <p className="text-gray-600 mb-6">Test the 404 page</p>
        <Link href="/nonexistent-page" className="inline-block px-5 py-3 rounded-lg bg-black text-white hover:bg-gray-800">
          Go to 404 page
        </Link>
      </div>
    </div>
  )
}
