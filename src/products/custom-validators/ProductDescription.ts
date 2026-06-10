import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

// On récupère la clé depuis l'environnement
const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;

@ValidatorConstraint({
  name: 'ProductDescription',
  async: true,
})
export class ProductDescription implements ValidatorConstraintInterface {

  private message: string = '';

  async validate(description: string): Promise<boolean> {

    // ✅ Vérification de base
    if (!description || typeof description !== 'string' || description.trim() === '') {
      this.message = 'La description ne peut pas être vide.';
      return false;
    }

    try {
      // Initialisation de l’API Gemini
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash', // plus stable pour la production
      });

      const prompt = `
Analyse la description de produit ci-dessous.

Vérifie :
- qu'elle est compréhensible pour un utilisateur,
- qu'elle ne contient aucun contenu offensant,
- qu'elle n'est pas vague ou inutile.

Description :
"${description}"

Si la description est correcte, réponds uniquement par : "valide".
Sinon réponds : "invalide" suivi de l'explication du problème.
`;

      // Envoi du prompt au modèle IA
      const result = await model.generateContent(prompt);

      const responseText = result.response.text();
      const isValid = !responseText.toLowerCase().includes('invalide');

      if (!isValid) {
        this.message = responseText;
      }

      return isValid;

    } catch (error) {
      // 🔹 Fallback intelligent
      // En cas d'erreur technique (réseau, clé, modèle), on accepte la description
      console.error('Erreur Gemini:', error);

      // On peut garder un message informatif pour le client
      this.message = 'Impossible de valider via l’IA, description acceptée par défaut.';

      return true; // Important : ne bloque plus la création produit
    }
  }

  defaultMessage(): string {
    return this.message;
  }
}