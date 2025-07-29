import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router';
import { firebaseAuthService, signInWithGoogle, signInWithX, signInWithMicrosoft } from '../services/firebaseAuthService';
import { getUserProfile, updateUserProfile } from '../services/userService';

// 1. Define AppUser interface for your app's user profile
export interface AppUser {
  uid: string;
  email: string;
  photoURL?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  company?: string;
  nationality?: string;
  numberOfPublications?: string;
  vatNumber?: string;
  trnNumber?: string;
}

// 2. Update AuthContextType
interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string, remember: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithX: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  updateProfile: (data: Partial<AppUser>) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
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
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 3. On auth state change, fetch profile data from Firestore and merge with auth user
  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const profileData = await getUserProfile(firebaseUser.uid);
        
        // Extract first and last name from displayName for social logins
        let firstName = profileData?.firstName || '';
        let lastName = profileData?.lastName || '';
        
        if (firebaseUser.displayName && !profileData?.firstName && !profileData?.lastName) {
          const nameParts = firebaseUser.displayName.trim().split(' ');
          firstName = nameParts[0] || '';
          lastName = nameParts.slice(1).join(' ') || '';
          
          // Save the extracted names to Firestore if they don't exist yet
          if (firstName || lastName) {
            await updateUserProfile(firebaseUser.uid, { firstName, lastName });
          }
        }
        
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          photoURL: profileData?.photoURL || firebaseUser.photoURL || '',
          firstName: firstName,
          lastName: lastName,
          jobTitle: profileData?.jobTitle || '',
          company: profileData?.company || '',
          nationality: profileData?.nationality || '',
          numberOfPublications: profileData?.numberOfPublications || '',
          vatNumber: profileData?.vatNumber || '',
          trnNumber: profileData?.trnNumber || '',
        });
      } else {
        setUser(null);
      }
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
      // After sign up, user will be set by onAuthStateChanged
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
      // After sign in, user will be set by onAuthStateChanged
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
      // After sign in, user will be set by onAuthStateChanged
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
      // After sign in, user will be set by onAuthStateChanged
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
      // After sign in, user will be set by onAuthStateChanged
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };

  // 4. Add updateProfile and refreshUserProfile
  const refreshUserProfile = async () => {
    if (user) {
      const profileData = await getUserProfile(user.uid);
      setUser({
        ...user,
        ...profileData,
      });
    }
  };

  const updateProfile = async (data: Partial<AppUser>) => {
    if (user) {
      await updateUserProfile(user.uid, data);
      await refreshUserProfile();
    }
  };

  // 5. Provide everything in the context
  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      signUp,
      signIn,
      signOut,
      resetPassword,
      signInWithGoogle: signInWithGoogleHandler,
      signInWithX: signInWithXHandler,
      signInWithMicrosoft: signInWithMicrosoftHandler,
      updateProfile,
      refreshUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 