import { useTranslation } from "react-i18next";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ResetPassForm from "../../components/auth/ResetPassForm";

export default function ResetPassword() {
  const { t } = useTranslation();
  
  return (
    <>
      <PageMeta
        title={t('resetPasswordTitle')}
        description={t('resetPasswordDescription')}
      />
      <AuthLayout>
        <ResetPassForm />
      </AuthLayout>
    </>
  );
}
