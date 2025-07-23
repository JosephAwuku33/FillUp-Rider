import { supabase } from "@/utils/supabase/supabase";
import { Session } from "@supabase/supabase-js";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import ToastManager from "toastify-react-native";

export default function Index() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    init();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!loading) {
      if (!session && !inAuthGroup) {
        router.replace("/(auth)/login");
      } else if (session && inAuthGroup) {
        router.replace("/(home)/tabs");
      }
    }
  }, [segments, session, loading, router]);

  return <ToastManager />;
}
