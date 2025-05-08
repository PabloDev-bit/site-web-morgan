'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [started, setStarted] = useState(false);

  // Variants for hyperspace transition
  const hyperspaceVariants = {
    initial: { opacity: 0, scale: 1 },
    animate: {
      opacity: 1,
      scale: 10,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
    },
    exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#00051a] text-white font-sans">
      {/* 💫 Cosmic Background Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Glowing Particles (Reduced for Performance) */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_6px_rgba(0,255,255,0.4)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.4,
            }}
            animate={{
              opacity: started ? [0.4, 0.8, 0] : [0.4, Math.random() * 0.6 + 0.4, 0.4],
              scale: started ? [0.8, 2, 0.8] : [0.8, 1.2 + Math.random() * 0.5, 0.8],
            }}
            transition={{
              duration: started ? 0.5 : 2.5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 1.5,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Nebula Layer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-purple-950/40 to-cyan-950/50"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Vortex */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-radial-gradient(from_50%_50%,rgba(0,255,255,0.1)_0%,transparent_70%)"
          animate={{
            rotate: 360,
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {/* 🏠 HERO + CTA */}
        {!started && (
          <motion.div
            key="hero"
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            role="main"
            aria-label="Hero section"
          >
            {/* Navigation */}
            <nav className="flex justify-between items-center px-10 py-6 z-10">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                MHNET
              </h1>
              <div className="flex gap-8 text-base font-medium">
                <Link
                  href="#services"
                  className="relative text-cyan-200 hover:text-cyan-400 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-200 hover:after:w-full"
                  aria-label="Services"
                >
                  Services
                </Link>
                <Link
                  href="#contact"
                  className="relative text-cyan-200 hover:text-cyan-400 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-200 hover:after:w-full"
                  aria-label="Contact"
                >
                  Contact
                </Link>
              </div>
            </nav>

            {/* Hero Section */}
            <section className="m-auto text-center px-10 z-10 flex flex-col items-center justify-center h-[calc | (100vh-80px)]">
              <motion.h1
                className="text-6xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4 tracking-tight drop-shadow-[0_2px_8px_rgba(0,255,255,0.2)]"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                aria-label="MHNET Title"
              >
                MHNET
              </motion.h1>
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl font-light text-cyan-100 max-w-2xl mx-auto mb-10 leading-relaxed tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              >
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-medium">
                  Réinvention technologique
                </span>{' '}
                du nettoyage professionnel
              </motion.p>

              {/* Hyperspace Button */}
              <motion.div
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-block relative"
              >
                <button
                  onClick={() => setStarted(true)}
                  className="px-20 py-5 bg-gradient-to-r from-blue-700 to-cyan-600 rounded-2xl text-xl font-semibold shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] transition-all duration-200 relative overflow-hidden group"
                  aria-label="Commencez maintenant"
                >
                  <span className="relative z-10">Commencez maintenant</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                </button>
              </motion.div>
            </section>
          </motion.div>
        )}

        {/* 🚀 HYPERSPACE TRANSITION */}
        {started && (
          <>
            {/* Hyperspace Effect Overlay */}
            <motion.div
              key="hyperspace"
              className="absolute inset-0 bg-[#00051a] z-50"
              variants={hyperspaceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              aria-hidden="true"
            >
              {/* Streaking Stars (Optimized) */}
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={`streak-${i}`}
                  className="absolute w-0.5 h-16 bg-gradient-to-b from-cyan-400 to-transparent rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    rotate: Math.random() * 360,
                  }}
                  animate={{
                    scaleY: [1, 30, 1],
                    opacity: [0, 1, 0],
                    x: (Math.random() - 0.5) * 800,
                    y: (Math.random() - 0.5) * 800,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: Math.random() * 0.2,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                />
              ))}
              {/* Subtle Lens Flare */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-300/30 to-blue-300/30 rounded-full blur-2xl"
                animate={{ scale: [1, 3, 1], opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Profession Section */}
            <motion.section
              key="metier"
              className="absolute inset-0 z-40 flex items-center justify-center p-6 sm:p-10 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              role="region"
              aria-label="Profession section"
            >
              <motion.div
                className="max-w-3xl bg-black/20 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-[0_0_40px_rgba(0,255,255,0.15)] border border-cyan-500/10"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 tracking-tight">
                  Le métier de mon frère
                </h2>
                <p className="text-base sm:text-lg text-cyan-100 leading-relaxed max-w-2xl mx-auto mb-6">
                  Mon frère excelle dans le nettoyage professionnel textile. Avec des techniques comme l’injection-extraction, il redonne vie à vos canapés, tapis, sièges de véhicule et matelas, offrant des résultats impeccables, rapides et écoresponsables.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    href="#services"
                    className="px-12 py-3 bg-gradient-to denti-r from-blue-600 to-cyan-600 rounded-xl text-base font-semibold shadow-lg hover:shadow-cyan-600/30 transition-all duration-200"
                    aria-label="Découvrez nos services"
                  >
                    Découvrez nos services
                  </Link>
                </motion.div>
              </motion.div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}