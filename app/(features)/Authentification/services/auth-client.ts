import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

export async function signInWithGooglePopup() {
  // Tries to open the social sign-in flow (implementation depends on better-auth client)
  return authClient.signIn.social({ provider: "google" });
}

export async function signInWithIdToken(token: { token: string; accessToken?: string }) {
  return authClient.signIn.social({ provider: "google", idToken: token });
}

export async function signOut() {
  return authClient.signOut();
}

export default authClient;