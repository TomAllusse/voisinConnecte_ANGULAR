export interface Annonce {
  id: number;
  titre: string;
  description: string;
  auteur: string;
  tarif?: number;
  statut: 'en_attente' | 'en_cours' | 'termine';
  categorie: string;
}
