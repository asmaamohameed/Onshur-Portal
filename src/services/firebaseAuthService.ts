import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  AuthError,
} from 'firebase/auth';
import i18n from '../i18n';

export interface AuthResponse {
  user: User | null;
  error: string | null;
}

export interface AuthService {
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string, remember: boolean) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResponse>;
  onAuthStateChanged: (callback: (user: User | null) => void) => () => void;
}

const errorMessages: Record<string, { en: string; ar: string }> = {
  'auth/email-already-in-use': {
    en: 'Email is already in use.',
    ar: 'البريد الإلكتروني مستخدم بالفعل.',
  },
  'auth/invalid-email': {
    en: 'Invalid email address.',
    ar: 'البريد الإلكتروني غير صالح.',
  },
  'auth/user-disabled': {
    en: 'User account is disabled.',
    ar: 'تم تعطيل حساب المستخدم.',
  },
  'auth/user-not-found': {
    en: 'User not found.',
    ar: 'المستخدم غير موجود.',
  },
  'auth/wrong-password': {
    en: 'Incorrect password.',
    ar: 'كلمة المرور غير صحيحة.',
  },
  'auth/weak-password': {
    en: 'Password is too weak.',
    ar: 'كلمة المرور ضعيفة جداً.',
  },
  'auth/too-many-requests': {
    en: 'Too many requests. Try again later.',
    ar: 'عدد كبير جداً من المحاولات. حاول مرة أخرى لاحقاً.',
  },
  'auth/network-request-failed': {
    en: 'Network error. Please try again.',
    ar: 'خطأ في الشبكة. يرجى المحاولة مرة أخرى.',
  },
};

function getErrorMessage(error: AuthError): string {
  const lang = i18n.language || 'en';
  const code = error.code;
  const messages = errorMessages[code];
  if (messages) {
    return (messages as { [key: string]: string })[lang] || messages.en;
  }
  return lang === 'ar' ? 'حدث خطأ غير متوقع.' : 'An unexpected error occurred.';
}

export const firebaseAuthService: AuthService = {
  async signUp(email, password) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return { user: result.user, error: null };
    } catch (error: any) {
      return { user: null, error: getErrorMessage(error) };
    }
  },
  async signIn(email, password, remember) {
    try {
      await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { user: result.user, error: null };
    } catch (error: any) {
      return { user: null, error: getErrorMessage(error) };
    }
  },
  async signOut() {
    await firebaseSignOut(auth);
  },
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { user: null, error: null };
    } catch (error: any) {
      return { user: null, error: getErrorMessage(error) };
    }
  },
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  },
}; 