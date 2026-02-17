export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black p-4 border-b border-red-600 shadow-lg shadow-red-600/20">
      <nav className="flex space-x-4">
        <a
          href="/"
          className="text-white hover:text-red-400 px-3 py-2 transition-colors"
        >
          Home
        </a>
        <a
          href="/movies"
          className="text-white hover:text-red-400 px-3 py-2 transition-colors"
        >
          Movies
        </a>
        <a
          href="/profile"
          className="text-white hover:text-red-400 px-3 py-2 transition-colors"
        >
          Profile
        </a>
      </nav>
    </header>
  );
}
