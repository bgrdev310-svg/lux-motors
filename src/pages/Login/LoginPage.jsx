import { useState, useEffect } from 'react';
import './LoginPage.css';
import {
  Phone,
  Lock,
  User,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  LogIn,
  UserPlus,
  KeyRound,
  Sparkles,
  CheckCircle2,
  Smartphone
} from 'lucide-react';

export default function LoginPage() {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // Auth Form State
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Field Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Validation Errors
  const [validationError, setValidationError] = useState('');

  // Recovery States
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryPhone, setRecoveryPhone] = useState('');
  const [recoveryStep, setRecoveryStep] = useState(1); // 1 = Phone Input, 2 = SMS OTP Code Input
  const [otpCode, setOtpCode] = useState('');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sessionRef, setSessionRef] = useState('');
  const [welcomeUser, setWelcomeUser] = useState('');

  // Reset errors when mode changes
  useEffect(() => {
    setValidationError('');
    setPhone('');
    setPassword('');
    setUsername('');
    setConfirmPassword('');
  }, [authMode, recoveryMode]);

  // Auth morph toggle
  const toggleAuthMode = (mode) => {
    setAuthMode(mode);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    // Common phone validation (RTA/UAE format mock check)
    if (phone.trim().length < 9) {
      setValidationError('Please enter a valid UAE phone number.');
      return;
    }

    if (authMode === 'register') {
      if (!username || username.trim().length < 3) {
        setValidationError('Username must be at least 3 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setValidationError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setValidationError('Password must be at least 6 characters.');
        return;
      }
    } else {
      if (password.length < 4) {
        setValidationError('Incorrect password sequence.');
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate luxury API authentication check
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const randId = Math.floor(100000 + Math.random() * 900000);
      setSessionRef(`SSN-${randId}-DXB`);
      setWelcomeUser(authMode === 'register' ? username : 'Valued Driver');
    }, 1800);
  };

  // Recovery Submit
  const handleRecoveryPhoneSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (recoveryPhone.trim().length < 9) {
      setValidationError('Please enter a valid phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRecoveryStep(2);
    }, 1200);
  };

  // OTP Verification Submit
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (otpCode.length < 4) {
      setValidationError('OTP verification code must be 4 digits.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRecoveryMode(false);
      setRecoveryStep(1);
      setAuthMode('login');
      // Autofill dummy phone
      setPhone(recoveryPhone);
      alert('Verification completed. Please enter your new password.');
    }, 1500);
  };

  const triggerMockReset = () => {
    setRecoveryMode(true);
    setRecoveryStep(1);
    setRecoveryPhone('');
    setOtpCode('');
  };

  return (
    <div className="login-page">
      {/* Background Animating Liquid Orbs */}
      <div className="login-page__bg">
        <div className="login-page__orb login-page__orb--1" />
        <div className="login-page__orb login-page__orb--2" />
        <div className="login-page__orb login-page__orb--3" />
        <div className="login-page__grid" />
      </div>

      <div className="login-page__container container">
        {/* Glass auth chassis */}
        <div className="login-card glass-panel">
          <div className="login-card__glow" />

          {/* SUCCESS SCREEN */}
          {isSubmitted ? (
            <div className="login-card__success animate-scale-in">
              <div className="login-card__success-icon-box">
                <CheckCircle2 size={44} className="login-card__success-icon" />
              </div>
              <h2 className="login-card__success-title">Access Authorized</h2>
              <p className="login-card__success-desc">
                Welcome back to Lux Motors, <strong>{welcomeUser}</strong>. Your secure console is ready.
              </p>

              <div className="login-card__receipt glass">
                <div className="login-card__receipt-row">
                  <span>Session Code:</span>
                  <strong className="font-mono">{sessionRef}</strong>
                </div>
                <div className="login-card__receipt-row">
                  <span>Authorized Line:</span>
                  <strong>+971 {phone}</strong>
                </div>
                <div className="login-card__receipt-row">
                  <span>Status:</span>
                  <strong className="status-badge">VIP Active</strong>
                </div>
              </div>

              <div className="login-card__redirect">
                <div className="login-card__loader-bar">
                  <div className="login-card__loader-fill" />
                </div>
                <span>Redirecting to VIP booking console...</span>
              </div>
            </div>
          ) : recoveryMode ? (
            /* RECOVERY SCREEN */
            <div className="login-card__recovery animate-fade-in">
              <button 
                className="login-card__back-btn"
                onClick={() => setRecoveryMode(false)}
              >
                ← Back to Sign In
              </button>

              <div className="login-card__header-text">
                <h2 className="login-card__title">Restore Access</h2>
                <p className="login-card__subtitle">
                  We will send a 4-digit SMS verification code to check your registration records.
                </p>
              </div>

              {validationError && (
                <div className="login-card__error glass">
                  <AlertTriangle size={14} />
                  <span>{validationError}</span>
                </div>
              )}

              {recoveryStep === 1 ? (
                <form onSubmit={handleRecoveryPhoneSubmit} className="login-card__form">
                  <div className="login-card__form-group">
                    <label htmlFor="recovery-phone" className="login-card__label">REGISTERED PHONE NUMBER</label>
                    <div className="login-card__input-wrapper">
                      <span className="login-card__phone-code">+971</span>
                      <Phone className="login-card__input-icon" size={16} />
                      <input
                        id="recovery-phone"
                        type="tel"
                        className="login-card__input"
                        placeholder="50 123 4567"
                        required
                        value={recoveryPhone}
                        onChange={(e) => setRecoveryPhone(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="login-card__submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Dispatching SMS...' : 'Send Verification OTP'}</span>
                    <Smartphone size={16} />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="login-card__form">
                  <div className="login-card__form-group">
                    <label htmlFor="otp-code" className="login-card__label">ENTER 4-DIGIT PIN CODE</label>
                    <div className="login-card__input-wrapper">
                      <KeyRound className="login-card__input-icon" size={16} />
                      <input
                        id="otp-code"
                        type="text"
                        maxLength={4}
                        className="login-card__input font-mono"
                        placeholder="••••"
                        style={{ letterSpacing: '6px', textAlign: 'center', fontSize: '18px' }}
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                    <span className="login-card__input-help">An SMS was sent to +971 {recoveryPhone}. Enter code to reset.</span>
                  </div>

                  <button 
                    type="submit" 
                    className="login-card__submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Verifying PIN...' : 'Verify & Recover Account'}</span>
                    <Check size={16} />
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* REGULAR AUTHENTICATION (LOGIN & REGISTER) */
            <div className="login-card__auth animate-fade-in">
              <header className="login-card__header">
                {/* Brand */}
                <div className="login-card__brand">
                  <span className="logo-lux">LUX</span>
                  <span className="logo-motors">MOTORS</span>
                </div>
                
                {/* Switcher Tab */}
                <nav className="login-card__switcher glass">
                  <button
                    className={`switcher-btn ${authMode === 'login' ? 'switcher-btn--active' : ''}`}
                    onClick={() => toggleAuthMode('login')}
                  >
                    <LogIn size={13} />
                    <span>Sign In</span>
                  </button>
                  <button
                    className={`switcher-btn ${authMode === 'register' ? 'switcher-btn--active' : ''}`}
                    onClick={() => toggleAuthMode('register')}
                  >
                    <UserPlus size={13} />
                    <span>Register</span>
                  </button>
                </nav>

                <h2 className="login-card__title">
                  {authMode === 'login' ? 'Welcome Back' : 'Command the Drive'}
                </h2>
                <p className="login-card__subtitle">
                  {authMode === 'login' 
                    ? 'Access your VIP booking panel and check reserved supercars.' 
                    : 'Create a secure driver profile to finalize supercar rentals instantly.'
                  }
                </p>
              </header>

              {/* Verification Errors */}
              {validationError && (
                <div className="login-card__error glass animate-fade-in">
                  <AlertTriangle size={14} />
                  <span>{validationError}</span>
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="login-card__form">
                
                {/* Username (Register mode only) */}
                {authMode === 'register' && (
                  <div className="login-card__form-group animate-slide-in">
                    <label htmlFor="reg-username" className="login-card__label">USERNAME</label>
                    <div className="login-card__input-wrapper">
                      <User className="login-card__input-icon" size={16} />
                      <input
                        id="reg-username"
                        type="text"
                        className="login-card__input"
                        placeholder="JohnDoe"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Phone Number */}
                <div className="login-card__form-group">
                  <label htmlFor="auth-phone" className="login-card__label">PHONE NUMBER</label>
                  <div className="login-card__input-wrapper">
                    <span className="login-card__phone-code">+971</span>
                    <Phone className="login-card__input-icon" size={16} />
                    <input
                      id="auth-phone"
                      type="tel"
                      className="login-card__input"
                      placeholder="50 123 4567"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="login-card__form-group">
                  <label htmlFor="auth-pass" className="login-card__label">PASSWORD</label>
                  <div className="login-card__input-wrapper">
                    <Lock className="login-card__input-icon" size={16} />
                    <input
                      id="auth-pass"
                      type={showPassword ? 'text' : 'password'}
                      className="login-card__input"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="login-card__eye"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (Register mode only) */}
                {authMode === 'register' && (
                  <div className="login-card__form-group animate-slide-in">
                    <label htmlFor="auth-confirm-pass" className="login-card__label">CONFIRM PASSWORD</label>
                    <div className="login-card__input-wrapper">
                      <Lock className="login-card__input-icon" size={16} />
                      <input
                        id="auth-confirm-pass"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="login-card__input"
                        placeholder="••••••••"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="login-card__eye"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Form Extras (Only login mode) */}
                {authMode === 'login' && (
                  <div className="login-card__extras">
                    <label className="login-card__remember">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="checkbox-custom">
                        {rememberMe && <Check size={10} />}
                      </span>
                      <span>Remember Me</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={triggerMockReset} 
                      className="login-card__forgot"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="login-card__submit-btn"
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting 
                      ? 'Authorizing Session...' 
                      : (authMode === 'login' ? 'Verify Credentials' : 'Register Secure Profile')
                    }
                  </span>
                  <ArrowRight size={16} className={isSubmitting ? 'login-card__submit-arrow--loading' : ''} />
                </button>
              </form>


            </div>
          )}

        </div>
      </div>
    </div>
  );
}
