# Bilingual Language Toggle System for TailAdmin

A comprehensive bilingual (English/Arabic) language toggle system for authentication pages with RTL/LTR layout switching, built for the TailAdmin React dashboard template.

## Features

### 🌍 Language Toggle Component
- **Toggle Button**: Smooth animated switch between English (EN) and Arabic (AR)
- **Visual Indicators**: Flag icons and language codes
- **Positioning**: Top-right corner on all auth pages
- **Accessibility**: ARIA labels and screen reader support
- **Animations**: Smooth transitions and hover effects

### 🔄 RTL/LTR Layout Switching
- **Automatic Direction**: RTL for Arabic, LTR for English
- **Dynamic Layout**: Form fields, buttons, and text alignment flip automatically
- **Tailwind Integration**: CSS classes update dynamically
- **Font Support**: Arabic font (Noto Sans Arabic) for proper text rendering

### 📝 Translation Integration
- **i18next Configuration**: Complete setup with language persistence
- **Comprehensive Translations**: All auth-related text in both languages
- **Dynamic Content**: Page titles, descriptions, form labels, buttons, and messages
- **Validation Messages**: Error and success messages in both languages

### 🔐 Auth Pages Integration
- **Complete Coverage**: Login, Register, Forgot Password, Reset Password, Email Verification
- **Consistent Positioning**: Language toggle appears on all auth pages
- **State Persistence**: Language choice saved in localStorage
- **SEO Optimization**: Dynamic page titles and meta descriptions

### 🎨 Form Elements Adaptation
- **Dynamic Labels**: Form field labels update with language
- **Placeholder Text**: Input placeholders change dynamically
- **Text Direction**: Input fields adapt to RTL/LTR
- **Button Positioning**: Icons and text align properly for each direction

## Technical Implementation

### Core Components

#### 1. Language Context (`src/context/LanguageContext.tsx`)
```typescript
interface LanguageContextType {
  language: string;
  direction: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  setLanguage: (lang: string) => void;
}
```

**Features:**
- Global language state management
- localStorage persistence
- Document direction updates
- Tailwind CSS class management

#### 2. Language Toggle Component (`src/components/common/LanguageToggle.tsx`)
```typescript
const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { language, toggleLanguage, direction } = useLanguage();
  // ... implementation
}
```

**Features:**
- Animated flag icons
- Smooth transitions
- Tooltip support
- Accessibility features

#### 3. RTL Utility Hook (`src/hooks/useRTL.ts`)
```typescript
export const useRTL = () => {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';
  // ... utility functions
}
```

**Features:**
- RTL-aware class helpers
- Style utilities
- Direction-aware positioning

### Translation Structure

#### English Translations (`src/i18n.ts`)
```typescript
en: {
  translation: {
    // Language Toggle
    toggleLanguage: 'Toggle Language',
    switchToArabic: 'Switch to Arabic',
    switchToEnglish: 'Switch to English',
    
    // Auth Pages
    signIn: 'Sign In',
    signUp: 'Sign Up',
    forgotPassword: 'Forgot Password',
    // ... more translations
  }
}
```

#### Arabic Translations
```typescript
ar: {
  translation: {
    // Language Toggle
    toggleLanguage: 'تبديل اللغة',
    switchToArabic: 'التبديل إلى العربية',
    switchToEnglish: 'التبديل إلى الإنجليزية',
    
    // Auth Pages
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    forgotPassword: 'نسيت كلمة المرور',
    // ... more translations
  }
}
```

### CSS RTL Support

#### Font Integration
```css
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&display=swap")
layer(base);

@theme {
  --font-arabic: "Noto Sans Arabic", sans-serif;
}
```

#### RTL Classes
```css
.rtl {
  direction: rtl;
  text-align: right;
}

.rtl * {
  font-family: var(--font-arabic), var(--font-outfit), sans-serif;
}

/* RTL-specific spacing and positioning adjustments */
.rtl .space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}
```

## Usage Examples

### Basic Language Toggle Usage
```tsx
import LanguageToggle from '../components/common/LanguageToggle';

function AuthPage() {
  return (
    <div className="relative">
      <div className="absolute top-6 right-6 z-50">
        <LanguageToggle />
      </div>
      {/* Your auth form */}
    </div>
  );
}
```

### Using Translations in Components
```tsx
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

function SignInForm() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  return (
    <form>
      <h1 className={`${isRTL ? 'text-right' : 'text-left'}`}>
        {t('welcomeBack')}
      </h1>
      <input 
        placeholder={t('enterEmail')}
        dir={isRTL ? 'rtl' : 'ltr'}
        className={isRTL ? 'text-right' : 'text-left'}
      />
    </form>
  );
}
```

### Using RTL Utility Hook
```tsx
import { useRTL } from '../hooks/useRTL';

function MyComponent() {
  const { isRTL, rtlClass, textAlign } = useRTL();

  return (
    <div className={`${textAlign} ${rtlClass('ml-4', 'mr-4')}`}>
      {isRTL ? 'مرحبا' : 'Hello'}
    </div>
  );
}
```

## File Structure

```
src/
├── context/
│   └── LanguageContext.tsx          # Global language state
├── components/
│   ├── common/
│   │   └── LanguageToggle.tsx       # Language toggle component
│   └── auth/
│       ├── SignInForm.tsx           # Updated with translations
│       ├── SignUpForm.tsx           # Updated with translations
│       ├── ForgetPassForm.tsx       # Updated with translations
│       ├── ResetPassForm.tsx        # Updated with translations
│       └── EmailVerificationForm.tsx # Updated with translations
├── hooks/
│   └── useRTL.ts                    # RTL utility hook
├── pages/AuthPages/
│   ├── AuthPageLayout.tsx           # Updated with language toggle
│   ├── SignIn.tsx                   # Updated with dynamic titles
│   ├── SignUp.tsx                   # Updated with dynamic titles
│   ├── ForgetPassword.tsx           # Updated with dynamic titles
│   ├── ResetPassword.tsx            # Updated with dynamic titles
│   └── EmailVerification.tsx        # Updated with dynamic titles
├── i18n.ts                          # Translation configuration
├── index.css                        # RTL CSS support
└── App.tsx                          # LanguageProvider wrapper
```

## Configuration

### 1. Language Persistence
The system automatically saves the user's language preference in localStorage:
```typescript
localStorage.setItem('language', 'ar'); // or 'en'
```

### 2. Document Updates
When language changes, the system updates:
- `document.documentElement.dir` (rtl/ltr)
- `document.documentElement.lang` (ar/en)
- `document.documentElement.classList` (adds/removes 'rtl')

### 3. i18next Setup
```typescript
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
```

## Accessibility Features

- **ARIA Labels**: Proper accessibility labels for screen readers
- **Keyboard Navigation**: Full keyboard support for language toggle
- **Focus Management**: Proper focus handling during language switches
- **Screen Reader Support**: Descriptive text for language changes

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **RTL Support**: Full RTL layout support
- **Font Loading**: Graceful fallback for Arabic fonts
- **Local Storage**: Persistent language preferences

## Performance Considerations

- **Lazy Loading**: Translations loaded on demand
- **Font Optimization**: Arabic font loaded only when needed
- **CSS Optimization**: RTL styles applied efficiently
- **State Management**: Minimal re-renders during language switches

## Future Enhancements

1. **Additional Languages**: Easy to extend for more languages
2. **Theme Integration**: Language-specific themes
3. **Advanced RTL**: More sophisticated RTL layout handling
4. **Animation Customization**: Configurable transition effects
5. **Server-Side Rendering**: SSR support for language detection

## Troubleshooting

### Common Issues

1. **Font Not Loading**: Check internet connection for Google Fonts
2. **RTL Not Working**: Ensure 'rtl' class is applied to document
3. **Translations Missing**: Verify translation keys in i18n.ts
4. **State Not Persisting**: Check localStorage permissions

### Debug Mode
Enable debug logging in i18next:
```typescript
i18n.init({
  debug: true,
  // ... other options
});
```

## Contributing

When adding new translations:
1. Add keys to both `en` and `ar` objects in `src/i18n.ts`
2. Use the `useTranslation` hook in components
3. Test both RTL and LTR layouts
4. Ensure accessibility compliance

## License

This bilingual system is part of the TailAdmin React template and follows the same licensing terms. 