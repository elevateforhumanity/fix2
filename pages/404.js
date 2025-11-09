export default function Custom404() {
  return (
    <div className="min-h-screen grid place-items-center p-8 text-center">
      <div>
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-2 opacity-80">Let's get you back to the good stuff.</p>
        <a 
          href="/"
          className="inline-block mt-6 px-5 py-3 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Go home
        </a>
      </div>
    </div>
  )
}
