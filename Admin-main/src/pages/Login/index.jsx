import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
// Using original logo from public folder
const MagicRoastLogo = '/MagicRoast_Qoffee_Logo.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('admin@magicroastqoffee.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate('/calendar');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand */}
      <div className="hidden lg:flex lg:w-1/2 gradient-coffee relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-caramel blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-cream blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-center">
          {/* Logo */}
          <img src={MagicRoastLogo} alt="MagicRoast Logo" className="w-24 h-24 mb-8 shadow-2xl rounded-3xl object-contain" />

          <h1 className="text-4xl font-bold text-cream mb-4 font-display">
            MagicRoast Qoffee
          </h1>
          <p className="text-lg text-cream/80 mb-8 max-w-md">
            Enterprise Resource Planning System for Premium Coffee Operations
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            {[
              'HR Management',
              'Inventory Control',
              'Sales & Invoicing',
              'E-Commerce',
              'Financial Reports',
              'Real-time Analytics',
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-cream/70 text-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-caramel" />
                {feature}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-cream">48</p>
              <p className="text-sm text-cream/60">Employees</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-cream">3</p>
              <p className="text-sm text-cream/60">Branches</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-cream">$892K</p>
              <p className="text-sm text-cream/60">Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <img src={MagicRoastLogo} alt="MagicRoast Logo" className="w-16 h-16 mb-4 shadow-lg rounded-2xl object-contain" />
            <h1 className="text-2xl font-bold text-foreground">MagicRoast Qoffee</h1>
            <p className="text-sm text-muted-foreground">ERP System</p>
          </div>

          {/* Login Card */}
          <div className="bg-card rounded-2xl border shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
              <p className="text-muted-foreground mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-11"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-11 pr-11"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  'btn-primary w-full flex items-center justify-center gap-2',
                  isLoading && 'opacity-70 cursor-not-allowed'
                )}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 rounded-lg bg-muted">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Demo Credentials:
              </p>
              <p className="text-xs text-muted-foreground">
                Email: <span className="font-mono text-foreground">admin@magicroastqoffee.com</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Password: <span className="font-mono text-foreground">admin123</span>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            &copy; 2026 MagicRoast Qoffee. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}