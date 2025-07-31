import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Language Toggle
      toggleLanguage: 'Toggle Language',
      switchToArabic: 'Switch to Arabic',
      switchToEnglish: 'Switch to English',
      
      // Auth Pages
      signUp: 'Sign Up',
      signIn: 'Sign In',
      login: 'Login',
      register: 'Register',
      forgotPassword: 'Forgot Password',
      resetPassword: 'Reset Password',
      emailVerification: 'Email Verification',
      
      // Form Labels
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      newPassword: 'New Password',
      currentPassword: 'Current Password',
      
      // Placeholders
      enterFirstName: 'Enter your first name',
      enterLastName: 'Enter your last name',
      enterEmail: 'Enter your email',
      enterPassword: 'Enter your password',
      enterConfirmPassword: 'Confirm your password',
      enterNewPassword: 'Enter new password',
      enterCurrentPassword: 'Enter current password',
      
      // Buttons
      submit: 'Sign Up',
      loginButton: 'Login',
      registerButton: 'Register',
      resetButton: 'Reset Password',
      verifyButton: 'Verify Email',
      sendResetLink: 'Send Reset Link',
      resendCode: 'Resend Code',
      
      // Messages
      welcomeBack: 'Welcome back!',
      loginToAccount: 'Login to your account!',
      createAccount: 'Create your account!',
      forgotPasswordMessage: 'Enter your email to reset your password',
      resetPasswordMessage: 'Enter your new password',
      emailVerificationMessage: 'Enter the verification code sent to your email',
      
      // Links
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      forgotPasswordLink: 'Forgot password?',
      backToLogin: 'Back to Login',
      
      // Social Login
      orLoginWith: 'Or Login with',
      orSignUpWith: 'Or Sign Up with',
      
      // Terms and Privacy
      agree: 'By creating an account you agree to the',
      terms: 'Terms and Conditions',
      and: 'and our',
      privacy: 'Privacy Policy',
      
      // Validation Messages
      required: 'This field is required',
      invalidEmail: 'Invalid email address',
      minPassword: 'Password must be at least 6 characters',
      passwordMismatch: 'Passwords do not match',
      invalidCode: 'Invalid verification code',
      passwordInfo: 'Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters.',
      passwordRequirements: 'Password must include: 8+ characters, uppercase, lowercase, number, special character',
      passwordLength: 'At least 8 characters',
      passwordUppercase: 'uppercase letter',
      passwordLowercase: 'lowercase letter',
      passwordNumber: 'number',
      passwordSpecial: 'special character',
      passwordsMatch: 'Passwords match',
      passwordsDoNotMatch: 'Passwords do not match',
      
      // Status Messages
      error: 'Error',
      loading: 'Loading...',
      success: 'Success',
      verificationCodeSent: 'Verification code sent successfully',
      passwordResetSent: 'Password reset link sent successfully',
      passwordResetSuccess: 'Password reset successfully',
      emailVerified: 'Email verified successfully',
      retryAfter: 'Retry After',
      
      // Page Titles
      signInTitle: 'Sign In ',
      signUpTitle: 'Sign Up ',
      forgotPasswordTitle: 'Forgot Password ',
      resetPasswordTitle: 'Reset Password ',
      emailVerificationTitle: 'Email Verification ',
      
      // Page Descriptions
      signInDescription: 'Sign in to your dashboard account',
      signUpDescription: 'Create a new dashboard account',
      forgotPasswordDescription: 'Reset your dashboard password',
      resetPasswordDescription: 'Set a new password for your dashboard account',
      emailVerificationDescription: 'Verify your email address for dashboard'
    }
  },
  ar: {
    translation: {
      // Language Toggle
      toggleLanguage: 'تبديل اللغة',
      switchToArabic: 'التبديل إلى العربية',
      switchToEnglish: 'التبديل إلى الإنجليزية',
      
      // Auth Pages
      signUp: 'إنشاء حساب',
      signIn: 'تسجيل الدخول',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      forgotPassword: 'نسيت كلمة المرور',
      resetPassword: 'إعادة تعيين كلمة المرور',
      emailVerification: 'التحقق من البريد الإلكتروني',
      
      // Form Labels
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      newPassword: 'كلمة المرور الجديدة',
      currentPassword: 'كلمة المرور الحالية',
      
      // Placeholders
      enterFirstName: 'أدخل اسمك الأول',
      enterLastName: 'أدخل اسم العائلة',
      enterEmail: 'أدخل بريدك الإلكتروني',
      enterPassword: 'أدخل كلمة المرور',
      enterConfirmPassword: 'أكد كلمة المرور',
      enterNewPassword: 'أدخل كلمة المرور الجديدة',
      enterCurrentPassword: 'أدخل كلمة المرور الحالية',
      
      // Buttons
      submit: 'إنشاء حساب',
      loginButton: 'تسجيل الدخول',
      registerButton: 'إنشاء حساب',
      resetButton: 'إعادة تعيين كلمة المرور',
      verifyButton: 'التحقق من البريد الإلكتروني',
      sendResetLink: 'إرسال رابط إعادة التعيين',
      resendCode: 'إعادة إرسال الرمز',
      
      // Messages
      welcomeBack: 'مرحباً بعودتك!',
      loginToAccount: 'سجل دخولك إلى حسابك!',
      createAccount: 'أنشئ حسابك!',
      forgotPasswordMessage: 'أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور',
      resetPasswordMessage: 'أدخل كلمة المرور الجديدة',
      emailVerificationMessage: 'أدخل رمز التحقق المرسل إلى بريدك الإلكتروني',
      
      // Links
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      dontHaveAccount: 'ليس لديك حساب؟',
      forgotPasswordLink: 'نسيت كلمة المرور؟',
      backToLogin: 'العودة إلى تسجيل الدخول',
      
      // Social Login
      orLoginWith: 'أو سجل الدخول باستخدام',
      orSignUpWith: 'أو أنشئ حساب باستخدام',
      
      // Terms and Privacy
      agree: 'بإنشائك حساب فإنك توافق على',
      terms: 'الشروط والأحكام',
      and: 'و',
      privacy: 'سياسة الخصوصية',
      
      // Validation Messages
      required: 'هذا الحقل مطلوب',
      invalidEmail: 'البريد الإلكتروني غير صالح',
      minPassword: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      invalidCode: 'رمز التحقق غير صالح',
      passwordInfo: 'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل مع أحرف كبيرة وصغيرة وأرقام ورموز خاصة.',
      passwordRequirements: 'يجب أن تتضمن كلمة المرور: 8+ أحرف، حرف كبير، حرف صغير، رقم، حرف خاص.',
      passwordLength: 'أقل من 8 أحرف',
      passwordUppercase: 'حرف كبير',
      passwordLowercase: 'حرف صغير',
      passwordNumber: 'رقم',
      passwordSpecial: 'رمز خاص',
      passwordsMatch: 'كلمات المرور متطابقة',
      passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
      
      // Status Messages
      error: 'خطأ',
      loading: 'جار التحميل...',
      success: 'نجح',
      verificationCodeSent: 'تم إرسال رمز التحقق بنجاح',
      passwordResetSent: 'تم إرسال رابط إعادة تعيين كلمة المرور بنجاح',
      passwordResetSuccess: 'تم إعادة تعيين كلمة المرور بنجاح',
      emailVerified: 'تم التحقق من البريد الإلكتروني بنجاح',
      retryAfter: 'إعادة المحاولة بعد',
      
      // Page Titles
      signInTitle: 'تسجيل الدخول ',
      signUpTitle: 'إنشاء حساب ',
      forgotPasswordTitle: 'نسيت كلمة المرور ',
      resetPasswordTitle: 'إعادة تعيين كلمة المرور ',
      emailVerificationTitle: 'التحقق من البريد الإلكتروني ',
      
      // Page Descriptions
      signInDescription: 'سجل دخولك إلى حساب لوحة تحكم',
      signUpDescription: 'أنشئ حساب لوحة تحكم جديد',
      forgotPasswordDescription: 'أعد تعيين كلمة مرور لوحة تحكم',
      resetPasswordDescription: 'حدد كلمة مرور جديدة لحساب لوحة تحكم',
      emailVerificationDescription: 'تحقق من عنوان بريدك الإلكتروني لحساب لوحة تحكم'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
  }
});

export default i18n; 