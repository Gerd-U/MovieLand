export function Header(){
   return (
  <header className="bg-black p-4">
  <nav className="flex space-x-4">
    <a href="/" className="text-white hover:text-blue-400 px-3 py-2">Home</a>
    <a href="/movies" className="text-white hover:text-blue-400 px-3 py-2">Movies</a>
    <a href="../Profile" className="text-white hover:text-blue-400 px-3 py-2">Profile</a>
  </nav>
  </header>

  )
}