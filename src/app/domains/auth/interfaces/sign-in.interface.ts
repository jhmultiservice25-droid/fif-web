export interface ISignInPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ISignInResponse {
  redirect: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    role: string;
  };
}
