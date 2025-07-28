import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  
  return (
    <>
      <PageMeta
        title="Sign Up | Onshur Portal"
        description="Create your Onshur Portal account to apply for support programs and access publishing resources"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
