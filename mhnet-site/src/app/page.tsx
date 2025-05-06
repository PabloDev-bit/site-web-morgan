'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#00081d] text-white">
      {/* Fond stellaire animé */}
      <div className="absolute inset-0 bg-[url('/galaxy-pattern.png')] opacity-20 mix-blend-soft-light" />
      
      {/* Étoiles animées */}
      <motion.div 
        className="absolute inset-0 bg-[url('/star-pattern.svg')] opacity-40"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Nébuleuse centrale */}
      <motion.div
        className="absolute -top-1/2 -left-1/3 w-[150%] h-[150%] bg-radial-gradient(from_60%_50%,rgba(16,82,255,0.3)_0%,transparent_60%)"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Astéroïdes flottants */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-transparent border-2 border-blue-400/30 rounded-full"
        animate={{
          x: [-20, 100, -20],
          y: [0, 80, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 16, repeat: Infinity }}
      />
      
      {/* Navigation futuriste */}
      <nav className="absolute top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 backdrop-blur-md border-b border-blue-900/30">
        <motion.h1 
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          MHNET
        </motion.h1>
        <div className="space-x-8">
          <Link href="#services" className="group relative text-blue-100 hover:text-white transition-all duration-300">
            <span className="z-10 relative">Services</span>
            <div className="absolute bottom-0 h-[1px] bg-blue-400 w-0 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="#contact" className="group relative text-blue-100 hover:text-white transition-all duration-300">
            <span className="z-10 relative">Contact</span>
            <div className="absolute bottom-0 h-[1px] bg-cyan-400 w-0 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent mb-6">
            MHNET
          </h1>
          <div className="absolute inset-0 bg-[url('/sparkles.png')] opacity-30 mix-blend-screen animate-pulse" />
        </motion.div>

        <motion.p
          className="text-2xl md:text-3xl font-light text-blue-100 mb-12 max-w-2xl leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-medium">Réinvention textile</span> à travers une technologie spatiale innovante
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link
            href="#services"
            className="group relative inline-block bg-gradient-to-br from-blue-600 to-cyan-700 px-12 py-5 rounded-[2rem] font-medium shadow-2xl hover:shadow-blue-900/40 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span className="group-hover:translate-x-1 transition-transform">Explorer l'innovation</span>
              <span className="text-cyan-200">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Effets de particules */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100],
              opacity: [0.8, 0],
              scale: [1, 0.2]
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </div>
  );
}