import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ForgetPassForm from "../../components/auth/ForgetPassForm";

export default function ForgetPassword() {
  
  return (
    <>
      <PageMeta
        title="Forgot Password | Onshur Portal"
        description="Reset your Onshur Portal account password - Secure password recovery for your account"
      />
      <AuthLayout>
        <ForgetPassForm />
      </AuthLayout>
    </>
  );
}
