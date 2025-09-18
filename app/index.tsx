import { useAuth } from "@/context/supabase-provider";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import ToastManager from "toastify-react-native";

export default function Index() {
  const { session, initialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;
    if (session) {
      router.replace("/(home)/tabs");
    } else {
      router.replace("/(auth)/login");
    }
  }, [initialized, session, router]);

  return <ToastManager />
}