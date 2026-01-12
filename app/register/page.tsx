import Header from "../components/Header";
import RegisterForm from "../(features)/Authentification/components/RegisterForm";

export default function RegisterPage() {
	return (
		<div>
			<Header />
			<main className="py-8">
				<RegisterForm />
			</main>
		</div>
	);
}
