import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail, Lock, ArrowLeft, ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';

const BASE_URL = 'https://ubktowingbackend-production.up.railway.app/api';



// Email Input Component
const EmailStep = ({ email, setEmail, onNext }) => {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
       const navigate = useNavigate();


  const handleSubmit = async () => {
    setError('');
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/common/password/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send verification code');
      }

      console.log('Email submitted:', { email });
      onNext();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#043677] rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
            Forgot Password?
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base px-2">
            Enter your email address and we'll send you a verification code
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#043677] focus:border-transparent outline-none transition-all text-sm sm:text-base disabled:opacity-50"
                  placeholder="example@gmail.com"
                />
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className=" cursor-pointer w-full bg-[#043677] text-white py-3 rounded-lg font-semibold hover:bg-[#032958] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <button   onClick={() => navigate('/login')} className="text-[#043677] cursor-pointer  hover:underline text-sm flex items-center justify-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// OTP Verification Component
const OTPStep = ({ email, otp, setOtp, onNext, onBack }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async () => {
    setError('');
    if (!otp.every(digit => digit !== '')) {
      setError('Please enter the complete code');
      return;
    }
    const verificationCode = otp.join('');
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/common/password/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Invalid verification code');
      }

      console.log('OTP submitted:', { verificationCode });
      onNext();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 5);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      while (newOtp.length < 5) newOtp.push('');
      setOtp(newOtp);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#043677] rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
            Verify Your Email
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base px-2">
            Enter the 5-digit code sent to your email
          </p>

          <div className="space-y-6">
            <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#043677] focus:border-[#043677] outline-none transition-all disabled:opacity-50"
                />
              ))}
            </div>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive code?{' '}
                <button className="text-[#043677] font-semibold hover:underline">
                  Resend
                </button>
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className=" cursor-pointer w-full bg-[#043677] text-white py-3 rounded-lg font-semibold hover:bg-[#032958] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onBack}
              disabled={loading}
              className=" cursor-pointer w-full text-[#043677] hover:underline text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reset Password Component
const ResetPasswordStep = ({ email, newPassword, setNewPassword, confirmPassword, setConfirmPassword, onSubmit, onBack }) => {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/common/password/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
          confirmPassword
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to reset password');
      }

      console.log('Password reset:', { newPassword, confirmPassword });
      setSuccess(true);
      setTimeout(() => onSubmit(), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = newPassword.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword);
  const passwordsMatch = confirmPassword && newPassword === confirmPassword;

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Password Reset Successful!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base px-2">
              Your password has been updated successfully. Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#043677] rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base px-2">
            Create a strong new password for your account
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#043677] focus:border-transparent outline-none transition-all text-sm sm:text-base disabled:opacity-50"
                  placeholder="Enter new password"
                />
                <button
                  onClick={() => setShowNew(!showNew)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {newPassword && (
                <p className={`mt-2 text-xs sm:text-sm ${passwordStrength ? 'text-green-600' : 'text-orange-600'}`}>
                  {passwordStrength ? '✓ Strong password' : '⚠ Use 8+ characters with uppercase, lowercase & number'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#043677] focus:border-transparent outline-none transition-all text-sm sm:text-base disabled:opacity-50"
                  placeholder="Confirm new password"
                />
                <button
                  onClick={() => setShowConfirm(!showConfirm)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && (
                <p className={`mt-2 text-xs sm:text-sm ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={!passwordsMatch || !passwordStrength || loading}
              className=" cursor-pointer w-full bg-[#043677] text-white py-3 rounded-lg font-semibold hover:bg-[#032958] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
              <CheckCircle className="w-5 h-5" />
            </button>

            <button
              onClick={onBack}
              disabled={loading}
              className=" cursor-pointer w-full text-[#043677] hover:underline text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function ForgotPasswordFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordSubmit = () => {
    toast.success('Password reset successful!');
    navigate('/login');
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      {step === 1 && (
        <EmailStep
          email={email}
          setEmail={setEmail}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <OTPStep
          email={email}
          otp={otp}
          setOtp={setOtp}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <ResetPasswordStep
          email={email}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onSubmit={handlePasswordSubmit}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
}