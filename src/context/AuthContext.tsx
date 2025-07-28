import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router';
import { firebaseAuthService, signInWithGoogle, signInWithX, signInWithMicrosoft } from '../services/firebaseAuthService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string, remember: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithX: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const res = await firebaseAuthService.signUp(email, password);
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setUser(res.user);
      // Redirect to home or intended page
      navigate('/');
    }
  };

  const signIn = async (email: string, password: string, remember: boolean) => {
    setLoading(true);
    setError(null);
    const res = await firebaseAuthService.signIn(email, password, remember);
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setUser(res.user);
      // Redirect to intended page or home
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    await firebaseAuthService.signOut();
    setUser(null);
    setLoading(false);
    navigate('/signin');
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    const res = await firebaseAuthService.resetPassword(email);
    setLoading(false);
    if (res.error) {
      setError(res.error);
    }
  };

  const signInWithGoogleHandler = async () => {
    setLoading(true);
    setError(null);
    const res = await signInWithGoogle();
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setUser(res.user);
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };

  const signInWithXHandler = async () => {
    setLoading(true);
    setError(null);
    const res = await signInWithX();
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setUser(res.user);
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };

  const signInWithMicrosoftHandler = async () => {
    setLoading(true);
    setError(null);
    const res = await signInWithMicrosoft();
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setUser(res.user);
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOut, resetPassword, signInWithGoogle: signInWithGoogleHandler, signInWithX: signInWithXHandler, signInWithMicrosoft: signInWithMicrosoftHandler }}>
      {children}
    </AuthContext.Provider>
  );
}; 