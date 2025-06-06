// src/components/ContactForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

const PRICING_DATA = [
  { prestation: "Fauteuil Individuel", prix: "dès 70 CHF" },
  { prestation: "Canapé Confort (2p)", prix: "dès 120 CHF" },
  { prestation: "Canapé Prestige (3p)", prix: "dès 150 CHF" },
  { prestation: "Tapis Standard", prix: "dès 90 CHF" },
  { prestation: "Matelas Simple (1p)", prix: "dès 90 CHF" },
  { prestation: "Matelas Double (2p)", prix: "dès 120 CHF" },
  { prestation: "Matelas King Size", prix: "dès 150 CHF" },
  { prestation: "Intérieur de Véhicule Complet", prix: "dès 140 CHF" },
] as const;

// AJOUT : Créer un type qui représente toutes les prestations possibles
type PrestationType = typeof PRICING_DATA[number]['prestation'];

const THEME_COLORS = {
  primary: "text-blue-400",
  primaryBg: "bg-blue-600",
  primaryHoverBg: "hover:bg-blue-500",
  accentRing: "ring-blue-500/50",
};

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // MODIFICATION : Spécifier le type de l'état
  const [prestation, setPrestation] = useState<PrestationType>(PRICING_DATA[0].prestation);
  
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, prestation, message }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Une erreur est survenue.');
      }

      setFormStatus("success");
      setTimeout(() => {
        setName('');
        setEmail('');
        setPhone('');
        setPrestation(PRICING_DATA[0].prestation); // Réinitialiser au premier
        setMessage('');
        setFormStatus('idle');
      }, 3000);

    } catch (error) {
      setFormStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue est survenue.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-6">
      {/* ... autres champs de formulaire ... */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nom complet</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-[#11224e]/80 border-white/20 rounded-md p-3 focus:ring-2 focus:ring-blue-500 transition"/>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-[#11224e]/80 border-white/20 rounded-md p-3 focus:ring-2 focus:ring-blue-500 transition"/>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Téléphone (Optionnel)</label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#11224e]/80 border-white/20 rounded-md p-3 focus:ring-2 focus:ring-blue-500 transition"/>
      </div>
      <div>
        <label htmlFor="prestation" className="block text-sm font-medium text-gray-300 mb-2">Prestation souhaitée</label>
        {/* MODIFICATION : Ajouter 'as PrestationType' pour aider TypeScript */}
        <select id="prestation" value={prestation} onChange={(e) => setPrestation(e.target.value as PrestationType)} className="w-full bg-[#11224e]/80 border-white/20 rounded-md p-3 focus:ring-2 focus:ring-blue-500 transition">
          {PRICING_DATA.map(p => <option key={p.prestation} value={p.prestation}>{p.prestation}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Votre message</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} className="w-full bg-[#11224e]/80 border-white/20 rounded-md p-3 focus:ring-2 focus:ring-blue-500 transition"></textarea>
      </div>
      <div className="text-center">
        <button type="submit" disabled={formStatus === 'loading'} className={`w-full rounded-lg px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${THEME_COLORS.primaryBg} ${THEME_COLORS.primaryHoverBg}`}>
          {formStatus === 'loading' ? 'Envoi en cours...' : 'Demander un devis détaillé'}
        </button>
        {formStatus === 'success' && <p className="mt-4 text-green-400">Merci ! Votre message a bien été envoyé. Nous vous répondrons bientôt.</p>}
        {formStatus === 'error' && <p className="mt-4 text-red-400">Erreur : {errorMessage}</p>}
      </div>
    </form>
  );
}