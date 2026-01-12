import Header from "../components/Header";
import LoginForm from "../(features)/Authentification/components/LoginForm";
import GoogleSignInButton from "../(features)/Authentification/components/GoogleSignInButton";

export default function LoginPage() {
  return (
    <div>
      <Header />
      <main className="py-8">
        <div className="max-w-md mx-auto">
          <LoginForm />
          <div className="mt-4">
            <GoogleSignInButton />
          </div>
        </div>
      </main>
    </div>
  );
}