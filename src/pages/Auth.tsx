
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  
  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Resume Genius Tailor</h1>
        <p className="text-gray-600">AI-powered resume tailoring for job seekers</p>
      </div>
      
      {isLogin ? (
        <LoginForm 
          onSuccess={() => navigate('/dashboard')}
          onRegisterClick={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm 
          onLoginClick={() => setIsLogin(true)}
        />
      )}
    </div>
  );
};

export default Auth;
