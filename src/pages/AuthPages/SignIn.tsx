import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  
  return (
    <>
      <PageMeta
        title="Sign In | Onshur Portal"
        description="Sign in to your Onshur Portal account to access support programs and manage applications"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
