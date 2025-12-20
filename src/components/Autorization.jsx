import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import ToastContainer from './common/ToastContainer';
import { API_BASE_URL } from '../config/apiConfig';

const Authorization = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      showToast('You are already logged in', 'info');
      setTimeout(() => navigate('/main-page'), 1500);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for registration passwords
    if (!isLogin && password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    try {
      if (isLogin) {
        // Login flow through query string
        const url = `${API_BASE_URL}/auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Login failed');
        }

        const data = await response.json();
        if (data.accessToken && data.refreshToken) {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('username', username);
          showToast('Login successful! Redirecting...', 'success');
          setTimeout(() => navigate('/main-page'), 1500);
        } else {
          throw new Error('Invalid login response');
        }
      } else {
        // Registration flow
        const url = `${API_BASE_URL}/auth/register`;
        const registrationBody = {
          username,
          firstName,
          lastName,
          phone,
          address,
          email,
          password,
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationBody),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Registration failed');
        }

        const data = await response.json();
        showToast('Registration successful! Please log in.', 'success');
        localStorage.setItem('userInfo', JSON.stringify(data));

        // Switch to login view after successful registration
        setTimeout(() => {
          setIsLogin(true);
          setPassword('');
          setConfirmPassword('');
        }, 1500);
      }
    } catch (error) {
      // VULNERABILITY 7: Detailed error messages exposing system information
      console.error('🔓 Full error details:', {
        message: error.message,
        stack: error.stack,
        username: username,
        attemptedPassword: password,
        timestamp: new Date(),
        apiEndpoint: isLogin ? 'login' : 'register',
      });

      // VULNERABILITY 8: Exposing internal error details to user
      showToast(`Error: ${error.message} | Stack: ${error.stack?.substring(0, 50)}...`, 'error');

      // VULNERABILITY 9: Storing failed attempts
      const failedAttempts = JSON.parse(localStorage.getItem('failedLoginAttempts') || '[]');
      failedAttempts.push({
        username,
        password,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('failedLoginAttempts', JSON.stringify(failedAttempts));
    }
  };



  const fetchProtectedData = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      showToast('User is not logged in', 'error');
      return;
    }

    try {
      const response = await fetch('https://funko-store.onrender.com/api/protected-data', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Something went wrong');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error.message);
      showToast('Error fetching protected data', 'error');
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      showToast('Refresh token not found', 'error');
      return;
    }

    try {
      const response = await fetch('https://funko-store.onrender.com/api/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Something went wrong');
      }

      const data = await response.json();
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        showToast('Token refreshed successfully', 'success');
      } else {
        showToast('Failed to refresh token', 'error');
      }
    } catch (error) {
      console.error('Error:', error.message);
      showToast('Error refreshing token', 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  placeholder="Enter your phone"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  placeholder="Enter your address"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full p-2 bg-black hover:bg-white text-white hover:text-black hover:border border-black rounded-md mt-4"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => setIsLogin(!isLogin)} className="text-black ml-2">
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
