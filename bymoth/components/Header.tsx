"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(true);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set up ScrollTrigger for nav highlighting
    const sections = ['home', 'about', 'events', 'ids-on-the-house'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        console.log(`Setting up ScrollTrigger for section: ${section}`); // Debug
        ScrollTrigger.create({
          trigger: element,
          start: 'top 60%',
          end: 'bottom 60%',
          onEnter: () => {
            setActiveSection(section);
            console.log(`Entered section: ${section}`);
          },
          onEnterBack: () => {
            setActiveSection(section);
            console.log(`Re-entered section: ${section}`);
          },
        });
      }
    });

    // Animate header on load
    gsap.fromTo(
      '.header',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    // Handle logo hide/reappear on mobile scroll
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setIsScrolling(true);
        if (logoRef.current) {
          gsap.to(logoRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
        console.log('Scrolling detected, logo visible'); // Debug

        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = setTimeout(() => {
          setIsScrolling(false);
          if (logoRef.current) {
            gsap.to(logoRef.current, {
              opacity: 0,
              y: -10,
              duration: 0.3,
              ease: 'power2.in',
            });
          }
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'events', label: 'Events', href: '#events' },
    { id: 'ids-on-the-house', label: 'Ids on the House', href: '#ids-on-the-house' },
  ];

  return (
    <header className="header md:fixed top-0 w-full bg-[#ead8b5] z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center md:justify-between">
        {/* Logo and H1 */}
        <div className="flex items-center space-x-4 mx-auto md:mx-0">
          <Link href="#home" ref={logoRef}>
            <Image
              src="/logomints.png"
              alt="MOTH Logo"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
          </Link>
          <h1 className="text-3xl font-myfont font-bold text-[#1e1e1a] hidden md:block">
            MOTH
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`text-lg font-myfont text-[#1e1e1a] hover:text-[#4a3728] transition-colors duration-300 ${
                activeSection === link.id ? 'border-b-2 border-[#1e1e1a]' : ''
              }`}
              onClick={() => setActiveSection(link.id)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}