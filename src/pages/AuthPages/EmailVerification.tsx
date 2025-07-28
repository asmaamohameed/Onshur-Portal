import { useTranslation } from "react-i18next";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import EmailVerificationForm from "../../components/auth/EmailVerificationForm";

export default function EmailVerification() {
  const { t } = useTranslation();
  
  return (
    <>
      <PageMeta
        title={t('emailVerificationTitle')}
        description={t('emailVerificationDescription')}
      />
      <AuthLayout>
        <EmailVerificationForm />
      </AuthLayout>
    </>
  );
}
