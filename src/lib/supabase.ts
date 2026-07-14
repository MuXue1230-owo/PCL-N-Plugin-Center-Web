import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Supabase public configuration is missing.");
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    flowType: "pkce"
  }
});

let oauthCallbackPromise: Promise<void> | undefined;

export const completeOAuthCallback = () => {
  if (oauthCallbackPromise) return oauthCallbackPromise;

  oauthCallbackPromise = (async () => {
    const callbackUrl = new URL(window.location.href);
    const code = callbackUrl.searchParams.get("code");
    if (!code) return;

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;

    callbackUrl.searchParams.delete("code");
    window.history.replaceState(
      window.history.state,
      document.title,
      `${callbackUrl.pathname}${callbackUrl.search}${callbackUrl.hash}`
    );
  })();

  return oauthCallbackPromise;
};
