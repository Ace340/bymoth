"use client";

import Head from 'next/head';
import Header from '../components/Header';
// import Hero from '../components/Hero';
import About from '../components/About';
import Events from '../components/Events';
// import SpotifyPlaylist from '../components/SpotifyPlaylist';
// import InstagramFeed from '../components/InstagramFeed';
import HeroFramer from '@/components/HeroFramer';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white w-full overflow-x-hidden">
      <Head>
        <title>Musical Events | Epic Sound Productions</title>
        <meta name="description" content="Epic Sound Productions - Your premier music event producer" />
      </Head>
      <Header />
      <HeroFramer />
      {/* <Hero /> */}
      <About />
      <Events />
      {/*<SpotifyPlaylist />
      <InstagramFeed />*/}
      <Footer />
    </main>
  );
}