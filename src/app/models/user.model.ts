export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  city: string | null;
  bio: string | null;
  avatar_path: string;
  role: 'admin' | 'user';
  is_Banned: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  city?: string;
  role?: string;
}


export interface AuthResponse {
  status: 'ok' | 'error';
  message: string;
  result?: {
    token: string;
    user: User;
  };
}
