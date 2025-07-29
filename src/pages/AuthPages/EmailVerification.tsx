import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import EmailVerificationForm from "../../components/auth/EmailVerificationForm";

export default function EmailVerification() {
  return (
    <>
      <PageMeta
        title="Email Verification | Onshur Portal"
        description="Verify your email address for Onshur Portal account activation and security"
      />
      <AuthLayout>
        <EmailVerificationForm />
      </AuthLayout>
    </>
  );
}
