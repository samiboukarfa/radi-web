import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authenticateUser, setUserSession, getDashboardRoute } from '@/utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Info } from 'lucide-react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const demoCredentials = [{
    role: 'Admin',
    email: 'admin@radi.app',
    password: 'admin123'
  }, {
    role: 'Farmer (Ahmed)',
    email: 'farmer@radi.app',
    password: 'farmer123',
    description: 'Original Skikda farmer'
  }, {
    role: 'Farmer (Salem)',
    email: 'salem@radi.app',
    password: 'farmer123',
    description: 'Constantine olives'
  }, {
    role: 'Farmer (Hamza)',
    email: 'hamza@radi.app',
    password: 'farmer123',
    description: 'Wheat hailstorm claim'
  }, {
    role: 'CRMA Insurer',
    email: 'crma@radi.app',
    password: 'insurer123',
    description: 'Algeria agricultural insurance leader'
  }, {
    role: 'Institution',
    email: 'institution@radi.app',
    password: 'institution123'
  }];
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = authenticateUser(email, password);
    if (user) {
      setUserSession(user);
      const dashboardRoute = getDashboardRoute(user.userType);
      navigate(dashboardRoute);
    } else {
      setError('Invalid email or password. Please use demo credentials.');
    }
    setLoading(false);
  };
  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-agri-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">R</span>
            </div>
            <span className="text-3xl font-bold text-agri-green">RADI</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-agri-green hover:text-agri-green-dark">
              create a new account
            </Link>
          </p>
        </div>

        {/* Demo Credentials Info */}
        <Alert className="border-sky-blue bg-sky-blue-light">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="text-sm">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {demoCredentials.map((cred, index) => <div key={index} className="text-xs">
                    <button type="button" onClick={() => handleDemoLogin(cred.email, cred.password)} className="text-left hover:text-agri-green transition-colors w-full">
                      <div className="flex flex-col">
                        <span className="font-medium">{cred.role}:</span>
                        <span className="text-gray-600">{cred.email} / {cred.password}</span>
                        {cred.description}
                      </div>
                    </button>
                  </div>)}
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>}

              <Button type="submit" className="w-full bg-agri-green hover:bg-agri-green-dark" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/" className="text-sm text-agri-green hover:text-agri-green-dark">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>;
};
export default Login;