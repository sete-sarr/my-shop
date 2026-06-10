import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ProductSecs', async: false })
export class ProductSecs implements ValidatorConstraintInterface {

  acceptedSpecs = [
    'ram', 'processor', 'ssd', 'hdd', 'brand', 'model',
    'color', 'weight', 'dimensions', 'material',
    'capacity', 'power', 'voltage', 'warranty',
    'condition', 'chip', 'year', 'other_features',
  ];

  validate(specs: Record<string, string> | undefined | null): boolean {

    // ✅ sécurité anti crash
    if (specs === undefined || specs === null) {
      return false; // ou true si tu veux rendre optionnel
    }

    // ✅ doit être un objet
    if (typeof specs !== 'object' || Array.isArray(specs)) {
      return false;
    }

    const keys = Object.keys(specs);

    // autoriser objet vide
    if (keys.length === 0) {
      return true;
    }

    // vérifier chaque spec
    return keys.every((key) => {

      const value = specs[key];

      return (
        this.acceptedSpecs.includes(key) &&
        typeof value === 'string' &&
        value.trim() !== ''
      );
    });
  }

  defaultMessage(): string {
    return 'Les spécifications produit doivent contenir des clés valides avec des valeurs non vides.';
  }
}