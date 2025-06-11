"use client";

import Head from 'next/head';
import Header from '../components/Header';
import About from '../components/About';
import Events from '../components/Events';
import HeroFramer from '@/components/HeroFramer';
import Footer from '../components/Footer';
import IdsOnTheHouse from '@/components/IdsOnTheHouse';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white w-full overflow-x-hidden">
      <Head>
        <title>MINTS On The House</title>
        <meta name="description" content="MINTS On The House - Music never been this good" />
      </Head>
      <Header />
      <HeroFramer />
      <About />
      <Events />
      <IdsOnTheHouse />
      <Footer />
    </main>
  );
}