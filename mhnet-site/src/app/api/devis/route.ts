import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialise Resend avec la clé API depuis les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);
const emailTo = process.env.EMAIL_TO;

export async function POST(request: NextRequest) {
  // Vérifie que les variables d'environnement sont bien définies
  if (!emailTo) {
    return NextResponse.json({ error: 'La variable EMAIL_TO n\'est pas configurée sur le serveur.' }, { status: 500 });
  }

  try {
    // 1. Récupérer les données du formulaire depuis la requête
    const body = await request.json();
    const { name, email, phone, prestation, message } = body;

    // 2. Valider les données (étape simple, peut être améliorée avec Zod)
    if (!name || !email || !message || !prestation) {
      return NextResponse.json({ error: 'Champs manquants.' }, { status: 400 });
    }

    // 3. Envoyer l'email avec Resend
    const { data, error } = await resend.emails.send({
      from: 'MHNET Devis <onboarding@resend.dev>', // Doit être un domaine vérifié sur Resend
      to: [emailTo],
      subject: `Nouvelle demande de devis de ${name} pour : ${prestation}`,
      replyTo: email, // <--- LIGNE CORRIGÉE
      html: `
        <h1>Nouvelle demande de devis</h1>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone || 'Non fourni'}</p>
        <p><strong>Prestation souhaitée :</strong> ${prestation}</p>
        <hr>
        <h2>Message :</h2>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 4. Renvoyer une réponse de succès
    return NextResponse.json({ message: 'Email envoyé avec succès !' }, { status: 200 });

  } catch (err) {
    console.error("Erreur dans l'API:", err);
    const errorMessage = err instanceof Error ? err.message : 'Une erreur interne est survenue.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}