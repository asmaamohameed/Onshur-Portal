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
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
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

const socialErrorMessages: Record<string, { en: string; ar: string }> = {
  'auth/popup-closed-by-user': {
    en: 'Authentication popup was closed before completing sign in.',
    ar: 'تم إغلاق نافذة تسجيل الدخول قبل إكمال العملية.'
  },
  'auth/popup-blocked': {
    en: 'Popup was blocked by the browser.',
    ar: 'تم حظر النافذة المنبثقة بواسطة المتصفح.'
  },
  'auth/account-exists-with-different-credential': {
    en: 'An account already exists with the same email but different sign-in credentials.',
    ar: 'يوجد حساب بنفس البريد الإلكتروني ولكن بمزود تسجيل دخول مختلف.'
  },
  // Add more as needed
};

function getSocialErrorMessage(error: AuthError): string {
  const lang = i18n.language || 'en';
  const code = error.code;
  const messages = socialErrorMessages[code];
  if (messages) {
    return (messages as { [key: string]: string })[lang] || messages.en;
  }
  return getErrorMessage(error);
}

async function createUserProfile(user: User, provider: string) {
  if (!user.email) return;
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      name: user.displayName || '',
      photoURL: user.photoURL || '',
      provider,
      role: 'user',
      preferences: {},
      createdAt: new Date().toISOString(),
    });
  }
}

export async function signInWithGoogle(): Promise<AuthResponse> {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await createUserProfile(result.user, 'google');
    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: getSocialErrorMessage(error) };
  }
}

export async function signInWithX(): Promise<AuthResponse> {
  const provider = new TwitterAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await createUserProfile(result.user, 'x');
    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: getSocialErrorMessage(error) };
  }
}

export async function signInWithMicrosoft(): Promise<AuthResponse> {
  const provider = new OAuthProvider('microsoft.com');
  try {
    const result = await signInWithPopup(auth, provider);
    await createUserProfile(result.user, 'microsoft');
    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: getSocialErrorMessage(error) };
  }
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