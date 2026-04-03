import { Categorie } from './categorie.model';
import { User } from './user.model';

export type PriceUnit = 'heure' | 'service' | 'jour';
export type Status = 'pending' | 'in_progress' | 'terminated';

export interface Annonce {
  id: number;
  id_user: User;
  id_category: Categorie;
  title: string;
  description: string;
  is_paid: boolean | false;
  price: number | null;
  price_unit: PriceUnit | null;
  status: Status | "pending";
  is_active: boolean | true;
  created_at: Date;
  updated_at: Date | null;
}

export type AnnonceCreate = Omit<Annonce,'id' | 'id_user' | 'status' | 'is_active' | 'created_at' | 'updated_at'> & {
  id_category: number;
};
