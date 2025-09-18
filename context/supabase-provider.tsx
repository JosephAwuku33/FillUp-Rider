import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/config/supabase";
import logger from "@/utils/logger/custom-logger";
import { Session, User } from "@supabase/supabase-js";

type SignUpPayload = {
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  role: "REQUESTER" | "RIDER";
  profileData?: Record<string, any>;
};

type SignUpResponse = {
  success: boolean;
  user_id: string;
  auth_user?: any; // refine later with Supabase Auth types
  user_row?: any; // the row from your "users" table
};

type AuthState = {
  initialized: boolean;
  session: Session | null;
  signUp: (values: SignUpPayload) => Promise<SignUpResponse | null>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
  initialized: false,
  session: null,
  signUp: async () => null,
  signIn: async () => null,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const [initialized, setInitialized] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const signUp = async (payload: SignUpPayload) => {
    try {
      const response = await fetch(
        process.env.EXPO_PUBLIC_SIGNUP_URL as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || "Signup failed");
      }

      const data: SignUpResponse = await response.json();
      logger.info("APP", `${JSON.stringify(`${data}`)}`);
      return data;
    } catch (err) {
      console.error("Signup error:", err);
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error);
      throw error;
    }

    if (!data.user) {
      console.warn("No user returned from sign in");
      return null;
    }

    if (data.session) {
      setSession(data.session);
    }

    return data.user;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      console.log("User signed out");
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    setInitialized(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        initialized,
        session,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
