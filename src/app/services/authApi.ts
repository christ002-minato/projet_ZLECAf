export type ProfileType = "individual" | "representative" | "company";

export interface RegisterPayload {
  profileType: ProfileType;
  fullName: string;
  contact: string;
  password: string;
  country: string;
  city: string;
  companyName?: string;
  sector?: string;
  regNumber?: string;
}

export interface LoginPayload {
  contact: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    contact: string;
    profileType: ProfileType;
  };
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  await wait(450);

  return {
    token: `mock-register-${Date.now()}`,
    user: {
      id: `user-${Date.now()}`,
      fullName: payload.fullName,
      contact: payload.contact,
      profileType: payload.profileType,
    },
  };
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  await wait(350);

  return {
    token: `mock-login-${Date.now()}`,
    user: {
      id: "user-demo",
      fullName: "Votre compte",
      contact: payload.contact,
      profileType: "individual",
    },
  };
}
