"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

// Lista de imágenes para el carrusel
const images = [
  { src: '/foto1.jpg', alt: 'Event 1' },
  { src: '/foto2.jpg', alt: 'Event 2' },
  { src: '/foto3.jpg', alt: 'Event 3' },
  { src: '/foto4.jpg', alt: 'Event 4' },
  { src: '/foto5.jpg', alt: 'Event 5' },
];

// Interfaz para la configuración de horizontalLoop
interface LoopConfig {
  speed?: number;
  paddingRight?: number;
  paused?: boolean;
}

// Función auxiliar horizontalLoop con tipos
function horizontalLoop(items: HTMLElement[], config: LoopConfig = {}) {
  const elements = gsap.utils.toArray<HTMLElement>(items);
  config = { speed: 0.2, paddingRight: 8, paused: false, ...config };

  console.log('Iniciando horizontalLoop con', elements.length, 'elementos');

  // Clonar elementos para transición suave
  const clonedElements = elements.map((el) => {
    const clone = el.cloneNode(true) as HTMLElement;
    el.parentNode?.appendChild(clone);
    return clone;
  });
  const allElements = [...elements, ...clonedElements];

  // Calcular anchos y totalWidth
  const widths: number[] = [];
  let totalWidth = 0;

  allElements.forEach((el, i) => {
    const w = el.offsetWidth;
    widths[i] = w;
    totalWidth += w + (i < allElements.length - 1 ? config.paddingRight || 0 : 0);
    console.log(`Imagen ${i + 1}: width=${w}`);
  });

  console.log('Total width:', totalWidth);

  // Configurar posiciones iniciales
  gsap.set(allElements, {
    x: (i) => {
      let x = 0;
      for (let j = 0; j < i; j++) {
        x += widths[j] + (config.paddingRight || 0);
      }
      return x;
    },
  });

  // Crear animación
  const tl = gsap.to(allElements, {
    x: `-=${totalWidth / 2}`,
    duration: (totalWidth / 2) / ((config.speed || 1) * 100),
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: (x) => `${parseFloat(x) % (totalWidth / 2)}px`,
    },
  });

  // Depuración: Verificar movimiento
  tl.eventCallback('onUpdate', () => {
    console.log('Carrusel en movimiento:', tl.time());
  });

  if (config.paused) {
    tl.pause();
  }

  return tl;
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !carouselRef.current) {
      console.error('heroRef o carouselRef no están definidos');
      return;
    }

    console.log('Iniciando useEffect');

    // Animación inicial de la sección
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }
    );

    // Configurar el carrusel continuo
    const imageElements = gsap.utils.toArray<HTMLElement>('.carousel-image', carouselRef.current);
    console.log('Número de imágenes encontradas:', imageElements.length);

    if (imageElements.length === 0) {
      console.error('No se encontraron elementos de imagen');
      return;
    }

    // Crear el loop infinito con horizontalLoop
    let loop: gsap.core.Tween | gsap.core.Timeline | null = null;
    const initializeCarousel = () => {
      if (loop) {
        loop.kill();
      }
      loop = horizontalLoop(imageElements, {
        speed: 0.2, // Velocidad suave
        paddingRight: 8, // Coincide con space-x-2
        paused: false, // Autoplay
      });
    };

    initializeCarousel();

    // Manejar redimensionamiento
    const handleResize = () => {
      console.log('Redimensionando, reiniciando carrusel');
      initializeCarousel();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      console.log('Limpiando useEffect');
      window.removeEventListener('resize', handleResize);
      if (loop) {
        loop.kill();
      }
      gsap.killTweensOf(carouselRef.current);
    };
  }, []);

  return (
    <section id="home" className="h-screen flex items-center justify-center" ref={heroRef}>
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Experience the Sound</h2>
        <p className="text-base sm:text-lg mb-6">Join us for unforgettable music events!</p>
        <div className="overflow-hidden">
          <div className="flex space-x-2" ref={carouselRef}>
            {images.map((image, index) => (
              <div
                key={index}
                className="carousel-image flex-shrink-0 w-full max-w-[400px] h-[300px] sm:w-[400px] sm:h-[300px] relative bg-white p-2 rounded-lg shadow-lg border-4 border-[#eddab8]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-md"
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, 400px"
                  quality={85}
                  onLoad={() => console.log(`Imagen ${image.src} cargada`)}
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