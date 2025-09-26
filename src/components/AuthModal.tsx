import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Eye, EyeOff, Building2, Users, Waves } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
}

export const AuthModal = ({ mode, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'ngo' | 'industry' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
    fullName: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && !userType) {
      toast({
        title: "Please select user type",
        description: "Choose whether you're from an NGO/Government or Industry",
        variant: "destructive"
      });
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical",
        variant: "destructive"
      });
      return;
    }

    // Simulate authentication
    toast({
      title: `${isLogin ? 'Login' : 'Registration'} Successful!`,
      description: `Welcome to CARBONIX ${userType ? `(${userType.toUpperCase()})` : ''}`,
    });
    
    // Redirect based on user type
    if (userType === 'ngo') {
      window.location.href = '/ngo-dashboard';
    } else if (userType === 'industry') {
      window.location.href = '/industry-dashboard';
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50 shadow-2xl">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="gradient-ocean p-2 rounded-lg">
              <Waves className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <CardTitle className="text-center text-2xl font-bold">
            {isLogin ? 'Welcome Back' : 'Join CARBONIX'}
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm">
            {isLogin 
              ? 'Sign in to your carbon management dashboard' 
              : 'Start your sustainable journey today'
            }
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                {/* User Type Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">I am from:</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType('ngo')}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        userType === 'ngo' 
                          ? 'border-secondary bg-secondary/10' 
                          : 'border-border hover:border-secondary/50'
                      }`}
                    >
                      <Users className="h-5 w-5 text-secondary mb-2" />
                      <div className="font-medium text-sm">NGO/Government</div>
                      <div className="text-xs text-muted-foreground">Generate MRV reports</div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setUserType('industry')}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        userType === 'industry' 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Building2 className="h-5 w-5 text-primary mb-2" />
                      <div className="font-medium text-sm">Industry</div>
                      <div className="text-xs text-muted-foreground">Calculate & buy credits</div>
                    </button>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                  />
                </div>

                {/* Organization Name */}
                <div className="space-y-2">
                  <Label htmlFor="organizationName">
                    {userType === 'ngo' ? 'NGO/Department Name' : 'Company Name'}
                  </Label>
                  <Input
                    id="organizationName"
                    type="text"
                    placeholder={userType === 'ngo' 
                      ? "e.g., Forest Department of Maharashtra" 
                      : "e.g., Tata Steel Limited"
                    }
                    value={formData.organizationName}
                    onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                    required
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@organization.in"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password for Signup */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
            )}

            {/* Forgot Password for Login */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full gradient-primary text-white hover:opacity-90 py-3"
              size="lg"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>

            {/* Toggle Mode */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </form>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center">
            <Badge variant="outline" className="text-xs border-secondary/30 text-secondary">
              🔐 Blockchain Secured • Made in India
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};