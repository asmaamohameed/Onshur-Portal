import { useTranslation } from "react-i18next";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ResetPassForm from "../../components/auth/ResetPassForm";

export default function ResetPassword() {
  const { t } = useTranslation();
  
  return (
    <>
      <PageMeta
        title="Reset Password | Onshur Portal"
        description="Set a new password for your Onshur Portal account - Secure password reset process"
      />
      <AuthLayout>
        <ResetPassForm />
      </AuthLayout>
    </>
  );
}
