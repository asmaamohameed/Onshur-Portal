import { useTranslation } from "react-i18next";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  const { t } = useTranslation();
  
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
