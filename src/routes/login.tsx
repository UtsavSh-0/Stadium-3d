import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Mail, Lock, MapPin, Bus, Car, QrCode, ShoppingBag, Accessibility, Building, HelpCircle, AlertCircle, Box, ArrowRight, Utensils as FoodIcon, Map as MapIcon, Calendar as CalendarIcon, MessageCircle } from 'lucide-react';
import { pageHead } from '@/booking/metadata';

export const Route = createFileRoute('/login')({
  head: () => pageHead('Login - OMNYA LAB STADIUM', 'Login to your OMNYA LAB STADIUM account to book tickets and access VIP experiences.'),
  component: LoginPage,
});

// AI Assistant demo buttons
const aiAssistantActions = [
  { label: 'Find My Seat', icon: MapPin, action: 'Locate your seat in the stadium' },
  { label: 'My Gate', icon: User, action: 'Show your assigned entry gate' },
  { label: 'Nearest Washroom', icon: Building, action: 'Find closest facility' },
  { label: 'Food Near Me', icon: FoodIcon, action: 'Show nearby concessions' },
  { label: 'Stadium Map', icon: MapIcon, action: 'Display interactive map' },
  { label: 'Official Merchandise', icon: ShoppingBag, action: 'Browse official gear' },
  { label: 'Accessibility Support', icon: Accessibility, action: 'Request assistance' },
  { label: 'Match Schedule', icon: CalendarIcon, action: 'View upcoming fixtures' },
  { label: 'View Ticket', icon: QrCode, action: 'Show digital ticket' },
  { label: 'After Match', icon: Bus, action: 'Transport & parking info' },
];

function LoginPage() {
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleLogin = (_e: React.SyntheticEvent) => {
    _e.preventDefault();
    // Redirect to the external login success page after demo login
    window.location.href = 'https://h1.nu/1ChEX';
  };

  // Demo AI assistant actions
  const handleAIAction = (label: string, action: string) => {
    console.log(`AI Action: ${label} - ${action}`);
    // In a real app, this would open the relevant page or modal
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="display-heading mb-4">Welcome Back</h1>
              <p className="text-muted-foreground">
                Login to your OMNYA LAB STADIUM account
              </p>
            </div>

            <div className="space-y-4">
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="text-sm font-medium mb-1 block" htmlFor="email">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block" htmlFor="password">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Sign In
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm text-muted-foreground">
                  Or continue with
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <User className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>
            </div>

            <div className="text-center text-sm">
              <span>Don't have an account? </span>
              <Link to="/matches" className="underline-offset-4 hover:underline text-primary">
                Create account
              </Link>
            </div>
          </div>
        </div>

        {/* AI Stadium Assistant Box */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-card rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">AI Stadium Assistant</h2>
              </div>
              <button
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
              >
                <Box className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Demo Buttons Box */}
            <div className={`bg-background transition-all duration-300 ${showAIAssistant ? 'max-height-[800px] block' : 'max-height-0 h-0 invisible'}`}>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {aiAssistantActions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAIAction(item.label, item.action)}
                    className="flex items-start gap-3 p-3 bg-card hover:bg-accent/50 rounded-lg border border-border hover:border-primary/50 text-left transition-all duration-200"
                  >
                    <item.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.action}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* After Match Info */}
          <div className="bg-card rounded-xl p-6 shadow-sm mt-6">
            <h2 className="display-heading text-base mb-4 flex items-center gap-2">
              <Bus className="h-5 w-5 text-primary" />
              After the Match
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
                <Bus className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Metro 9min walk <span className="text-muted-foreground/70 text-xs">(9 min)</span></span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
                <Car className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Parking Lot P3 62% full <span className="text-muted-foreground/70 text-xs">(62% available)</span></span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Need help? <AlertCircle className="h-4 w-4 inline text-primary" /> Emergency assistance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}