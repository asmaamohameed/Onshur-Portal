import { useTranslation } from "react-i18next";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  const { t } = useTranslation();
  
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
