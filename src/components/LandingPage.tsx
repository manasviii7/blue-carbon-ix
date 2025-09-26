import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Shield, TrendingUp, Globe, CheckCircle, ArrowRight, TreePine, Waves, Calculator, Bot } from "lucide-react";
import { AuthModal } from "./AuthModal";

export const LandingPage = () => {
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);

  const features = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "AI Carbon Calculator",
      description: "Calculate industry-level emissions with precision and get AI-powered reduction recommendations."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Blockchain MRV System",
      description: "Tamper-proof Monitoring, Reporting & Verification for blue carbon projects across India."
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI Reduction Advisor",
      description: "Get personalized strategies to reduce carbon footprint and optimize credit purchases."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Credit Marketplace",
      description: "Trade verified carbon credits in INR with transparent pricing and instant verification."
    }
  ];

  const stats = [
    { label: "Projects Verified", value: "2,847", icon: <CheckCircle className="h-5 w-5" /> },
    { label: "Carbon Credits Issued", value: "₹45.2L", icon: <Leaf className="h-5 w-5" /> },
    { label: "Industries Connected", value: "156", icon: <Globe className="h-5 w-5" /> },
    { label: "Tons CO₂ Tracked", value: "12.8K", icon: <TreePine className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="gradient-ocean p-2 rounded-lg">
              <Waves className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CARBONIX
              </h1>
              <p className="text-xs text-muted-foreground">Blue Carbon Registry</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              onClick={() => setAuthModal('login')}
              className="hover:bg-primary/10"
            >
              Login
            </Button>
            <Button 
              onClick={() => setAuthModal('signup')}
              className="gradient-primary text-white hover:opacity-90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-secondary/10 text-secondary hover:bg-secondary/20">
          🇮🇳 Made in India • Verified Blockchain Registry
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
          India's First Blockchain
          <br />
          Blue Carbon Registry
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Transparent, tamper-proof carbon credit system with AI-powered emissions tracking, 
          MRV verification, and personalized reduction strategies for Indian industries.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            onClick={() => setAuthModal('signup')}
            className="gradient-primary text-white hover:opacity-90 px-8 py-3 text-lg"
          >
            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg"
          >
            View Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Complete Carbon Management Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From emission calculation to credit trading, everything you need for carbon neutrality in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4 text-primary group-hover:text-secondary transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                The Carbon Credit Crisis in India
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>🚨 <strong className="text-foreground">Data Tampering:</strong> 67% of carbon projects lack transparent verification</p>
                <p>🔄 <strong className="text-foreground">Double Counting:</strong> Credits sold multiple times due to poor tracking</p>
                <p>💰 <strong className="text-foreground">Trust Issues:</strong> ₹2,300 Cr. lost annually due to fraudulent credits</p>
                <p>📊 <strong className="text-foreground">Weak MRV:</strong> Manual reporting leads to 34% inaccuracy</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6 text-secondary">
                Our Blockchain Solution
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>🔐 <strong className="text-secondary">Immutable Records:</strong> Blockchain ensures tamper-proof data</p>
                <p>🎯 <strong className="text-secondary">Single Source:</strong> No double counting with unique token IDs</p>
                <p>🛡️ <strong className="text-secondary">Verified Trust:</strong> Smart contracts automate verification</p>
                <p>🤖 <strong className="text-secondary">AI-Powered MRV:</strong> Automated monitoring with 99.2% accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="max-w-4xl mx-auto border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Carbon Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 156+ Indian industries already using CARBONIX for transparent, 
              verified carbon management and earn from your sustainability efforts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setAuthModal('signup')}
                className="gradient-primary text-white hover:opacity-90 px-8 py-3"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-3"
              >
                Book Demo Call
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="gradient-ocean p-1.5 rounded-lg">
              <Waves className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">CARBONIX</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 CARBONIX. Building India's sustainable future through blockchain technology.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      {authModal && (
        <AuthModal 
          mode={authModal} 
          onClose={() => setAuthModal(null)} 
        />
      )}
    </div>
  );
};