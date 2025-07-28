import { useTranslation } from "react-i18next";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ForgetPassForm from "../../components/auth/ForgetPassForm";

export default function ForgetPassword() {
  const { t } = useTranslation();
  
  return (
    <>
      <PageMeta
        title={t('forgotPasswordTitle')}
        description={t('forgotPasswordDescription')}
      />
      <AuthLayout>
        <ForgetPassForm />
      </AuthLayout>
    </>
  );
}
