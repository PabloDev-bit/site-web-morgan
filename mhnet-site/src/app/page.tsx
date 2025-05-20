"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// Galaxy Background with Twinkling Stars (Blue Theme)
type Star = { x: number; y: number; size: number; twinkle: number; };
function GalaxyBackground() {
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 150 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      twinkle: Math.random() * 2 + 1,
    }))
  );
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#001f3f] via-[#001229] to-[#000814]"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{ width: s.size, height: s.size, top: `${s.y}%`, left: `${s.x}%` }}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{ duration: s.twinkle, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// Before/After Slider Component
function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const startDrag = () => setDragging(true);
  const stopDrag = () => setDragging(false);
  const onDrag = (e: MouseEvent) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let pos = ((e.clientX - rect.left) / rect.width) * 100;
    pos = Math.max(0, Math.min(100, pos));
    setSliderPos(pos);
  };

  useEffect(() => {
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);
    };
  }, [dragging]);

  return (
    <div
      ref={containerRef}
      onMouseDown={startDrag}
      className="relative w-full max-w-4xl mx-auto cursor-ew-resize"
      style={{ userSelect: 'none' }}
    >
      <img src={before} alt="Avant" className="block w-full rounded-lg shadow-lg" />
      <div
        className="absolute top-0 left-0 h-full overflow-hidden rounded-lg"
        style={{ width: `${sliderPos}%` }}
      >
        <img src={after} alt="Après" className="block w-full" />
      </div>
      <div
        className="absolute top-0 h-full w-0.5 bg-white"
        style={{ left: `${sliderPos}%` }}
      />
      <div
        className="absolute top-2 text-white font-semibold"
        style={{ left: '8px' }}
      >Avant</div>
      <div
        className="absolute top-2 text-white font-semibold"
        style={{ left: `calc(${sliderPos}% + 8px)` }}
      >Après</div>
    </div>
  );
}

// Service Sections
const servicesSections = [
  { id: 'services', icon: '🧽', title: 'Nos Services', content: `Nettoyage textile premium avec technologie galactique, pour un résultat éclatant.` },
  { id: 'about', icon: '🎯', title: 'À Propos', content: `Fort d'une expérience stellaire, MHNET redéfinit le nettoyage professionnel.` },
  { id: 'advantages', icon: '⚡️', title: 'Avantages', list: [
      'Injection cosmique pour un nettoyage ultra-profond',
      'Déstabilisation des taches les plus tenaces',
      'Séchage rapide grâce à aspiration gravitationnelle',
      'Produits respectueux et éco-compatibles',
      'Textiles rénovés avec éclat immédiat',
    ]
  },
  { id: 'engagement', icon: '🤝', title: 'Notre Engagement', content: `Ponctualité sidérale et professionnalisme garantis. Votre satisfaction est notre ultime mission.` },
];

// Pricing Cards
const pricing = [
  { prestation: 'Fauteuil', prix: '70 CHF' },
  { prestation: 'Canapé 2 places', prix: '120 CHF' },
  { prestation: 'Canapé 3 places', prix: '150 CHF' },
  { prestation: 'Tapis (standard)', prix: 'dès 90 CHF' },
  { prestation: 'Matelas 1 place', prix: '90 CHF' },
  { prestation: 'Matelas 2 places', prix: '120 CHF' },
  { prestation: 'Matelas King Size', prix: '150 CHF' },
  { prestation: 'Intérieur voiture complet', prix: '140 CHF' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="relative bg-transparent text-white min-h-screen overflow-x-hidden font-sans">
      {/* Galaxy Background */}
      <GalaxyBackground />

      {/* Loading Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-blue-400 origin-left z-50" />

      {/* Side Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-y-0 left-0 w-64 bg-[#001229]/90 shadow-lg z-40 p-6"
            aria-label="Menu mobile"
          >
            <button onClick={() => setMenuOpen(false)} className="text-xl mb-6 focus:outline-none">✕ Fermer</button>
            <nav className="flex flex-col space-y-4 text-lg">
              {servicesSections.map(s => (
                <Link key={s.id} href={`#${s.id}`} onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition">
                  {s.icon} {s.title}
                </Link>
              ))}
              <Link href="#tarifs" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition">
                Voir les tarifs
              </Link>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-[#001229]/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-6">
          <h1 className="text-2xl font-extrabold"><Link href="/">MH<span className="text-blue-400">NET</span></Link></h1>
          <nav className="hidden md:flex space-x-8 text-base">
            {servicesSections.map(s => (
              <Link key={s.id} href={`#${s.id}`} className="hover:text-blue-400 transition font-medium">{s.title}</Link>
            ))}
            <Link href="#tarifs" className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">TARIFS</Link>
            <Link href="#contact" className="px-4 py-2 border-2 border-blue-400 text-blue-400 rounded-full hover:bg-[#001229]/20 transition">DEVIS</Link>
          </nav>
          <button onClick={() => setMenuOpen(true)} className="md:hidden text-2xl focus:outline-none">☰</button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-32 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-extrabold leading-tight">Réinvention du Textile</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-lg text-gray-300">Services de nettoyage professionnel ultra-performants,<br />respectueux de vos textiles et de l’environnement.</motion.p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="#services" passHref><motion.a whileHover={{ scale: 1.05 }} className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition">En savoir plus</motion.a></Link>
            <Link href="#tarifs" passHref><motion.a whileHover={{ scale: 1.05 }} className="px-6 py-3 border-2 border-blue-400 text-blue-400 rounded-full font-semibold hover:bg-[#001229]/20 transition">Nos tarifs</motion.a></Link>
          </div>
        </div>
      </section>

      {/* Avant / Après Slider */}
      <section className="py-20 bg-transparent">
        <h2 className="text-3xl font-extrabold text-center mb-8">Comparaison Avant / Après</h2>
        <BeforeAfterSlider before="photo(1).jpeg" after="photo(3).jpeg" />
      </section>

      {/* Main Sections */}
      <main className="py-20 space-y-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {servicesSections.map(s => (
            <motion.section key={s.id} id={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-[#001229]/60 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition backdrop-blur-sm">
              <div className="flex items-center mb-4"><span className="text-4xl mr-3">{s.icon}</span><h3 className="text-2xl font-bold">{s.title}</h3></div>
              {s.list ? <ul className="list-disc list-inside space-y-2 text-gray-300">{s.list.map((item, i) => <li key={i}>{item}</li>)}</ul> : <p className="text-gray-300 leading-relaxed whitespace-pre-line">{s.content}</p>}
            </motion.section>
          ))}
        </div>

        {/* Pricing Cards */}
        <section id="tarifs" className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-white">Tarifs MH Net</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricing.map((p, i) => (
                <motion.div key={i} whileHover={{ scale: 1.03 }} className="bg-[#001229]/70 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition backdrop-blur-sm flex flex-col justify-between">
                  <h3 className="text-2xl font-bold mb-4 text-white">{p.prestation}</h3>
                  <p className="text-blue-400 text-xl font-semibold mb-6">{p.prix}</p>
                  <Link href="#contact" passHref><motion.a whileHover={{ scale: 1.05 }} className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-full text-center font-medium hover:bg-blue-700 transition">Réserver</motion.a></Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer / Contact */}
      <footer className="bg-[#001229] text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold">Besoin d’un devis ?</h2>
          <p className="text-lg text-gray-300">Contactez-nous dès maintenant pour une estimation gratuite et sans engagement.</p>
          <Link href="mailto:contact@mhnet.com" passHref><motion.a whileHover={{ scale: 1.05 }} className="inline-block px-8 py-4 border-2 border-blue-400 rounded-full font-semibold hover:bg-[#001229]/20 transition">Demander un devis</motion.a></Link>
        </div>
      </footer>
    </div>
  );
}