"use client";

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Lista de imágenes (duplicada para simular bucle)
const images: { src: string; alt: string }[] = [
  { src: '/foto1.jpg', alt: 'Event 1' },
  { src: '/foto2.jpg', alt: 'Event 2' },
  { src: '/foto3.jpg', alt: 'Event 3' },
  { src: '/foto4.jpg', alt: 'Event 4' },
  { src: '/foto5.jpg', alt: 'Event 5' },
  { src: '/foto1.jpg', alt: 'Event 1' },
  { src: '/foto2.jpg', alt: 'Event 2' },
  { src: '/foto3.jpg', alt: 'Event 3' },
  { src: '/foto4.jpg', alt: 'Event 4' },
  { src: '/foto5.jpg', alt: 'Event 5' },
];

export default function HeroFramer() {
  const heroRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => {
      const newCount = prev + 1;
      console.log(`Imagen cargada, total: ${newCount}/${images.length}`);
      return newCount;
    });
  };

  useEffect(() => {
    if (imagesLoaded !== images.length || !carouselRef.current) {
      console.log('Esperando carga de imágenes o carouselRef');
      return;
    }

    console.log('Iniciando animación del carrusel');

    const totalWidth = carouselRef.current.scrollWidth / 2;
    let x = 0;

    const animate = () => {
      x -= 1; // Velocidad aumentada
      if (Math.abs(x) > totalWidth) {
        x += totalWidth; // Reiniciar al llegar a la mitad
        console.log('Reiniciando carrusel, x:', x);
      }
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(${x}px)`;
        console.log('Moviendo carrusel, x:', x);
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      x = 0; // Reiniciar posición al redimensionar
      console.log('Redimensionando, reiniciando x');
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(0px)`;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      console.log('Limpiando animación');
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded]);

  return (
    <section id="home" className="h-screen flex items-center justify-center" ref={heroRef}>
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Who the F*ck Eat Mints?</h2>
        <p className="text-base sm:text-lg mb-6">By Moth</p>
        <div className="overflow-hidden">
          <div className="flex space-x-2" ref={carouselRef}>
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full max-w-[500px] h-[375px] sm:w-[500px] sm:h-[375px] relative bg-white p-2 rounded-lg shadow-lg border-4 border-[#eddab8]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-md"
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, 500px"
                  quality={85}
                  onLoad={handleImageLoad}
                  onError={() => console.error(`Error cargando imagen ${image.src}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}