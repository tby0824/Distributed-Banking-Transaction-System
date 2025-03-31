import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

function Register({ onInputChange, registerData }) {
  const [email, setEmail] = useState(registerData.email || '');
  const [password, setPassword] = useState(registerData.password || '');
  const [termsAccepted, setTermsAccepted] = useState(registerData.termsAccepted || false);
  const [errors, setErrors] = useState({ email: '', password: '', server: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'termsAccepted') setTermsAccepted(checked);

    onInputChange({ [name]: newValue });
  };

  const validate = () => {
    const newErrors = { email: '', password: '', server: '' };
    let valid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!termsAccepted) {
      newErrors.server = 'You must accept the terms';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await register(email, password);
      alert('Registration successful!');
      setEmail('');
      setPassword('');
      setTermsAccepted(false);
      setErrors({ email: '', password: '', server: '' });
      onInputChange({ email: '', password: '', termsAccepted: false });
      navigate('/accounts');
    } catch (error) {
      if (error.message === 'Email already registered') {
        setErrors((prev) => ({
          ...prev,
          email: 'This email is already registered',
          server: '',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          server: error.message || 'Registration failed. Please try again.',
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-80">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              placeholder="you@example.com"
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              placeholder="••••••"
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={termsAccepted}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              disabled={isLoading}
            />
            <label className="ml-2 text-sm text-gray-600">
              I accept the{' '}
              <span
                onClick={openModal}
                className="text-green-600 hover:text-green-800 cursor-pointer underline"
              >
                terms and conditions
              </span>
            </label>
          </div>

          {errors.server && (
            <div className="bg-red-50 p-2 rounded text-red-700 text-sm">{errors.server}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </span>
            ) : (
              'Register'
            )}
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-semibold text-gray-800">Terms and Conditions</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto text-gray-700 text-sm leading-relaxed">
              <p className="mb-4">
                Welcome to our service! By registering, you agree to the following terms:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  We will not sell, trade, or otherwise misuse your email address for any
                  commercial purposes beyond providing you with our services.
                </li>
                <li>
                  Your personal information will be kept confidential and used solely to enhance
                  your experience with us.
                </li>
                <li>
                  You agree not to use our service for any illegal or unauthorized activities.
                </li>
                <li>
                  We reserve the right to terminate accounts that violate these terms at our
                  discretion.
                </li>
                <li>
                  These terms may be updated periodically, and continued use of the service
                  constitutes acceptance of any changes.
                </li>
              </ul>
              <p>
                If you have any questions, feel free to contact us at{' '}
                <a href="mailto:yimingjo.li@mail.utoronto.ca" className="text-green-600 hover:underline">
                  yimingjo.li@mail.utoronto.ca
                </a>.
              </p>
            </div>

            <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white z-10">
              <button
                onClick={closeModal}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;