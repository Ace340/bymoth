import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-black/80 z-50">
      <nav className="container mx-auto py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mints On The House</h1>
        <ul className="flex space-x-6">
          <li><Link href="#home" className="hover:text-purple-400">Home</Link></li>
          <li><Link href="#about" className="hover:text-purple-400">About</Link></li>
          <li><Link href="#events" className="hover:text-purple-400">Events</Link></li>
          <li><Link href="#playlists" className="hover:text-purple-400">Playlists</Link></li>
          <li><Link href="#instagram" className="hover:text-purple-400">Instagram</Link></li>
        </ul>
      </nav>
    </header>
  );
}