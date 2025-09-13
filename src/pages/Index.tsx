import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AppSidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentSubscriptions } from "@/components/dashboard/RecentSubscriptions";
import { SubscriptionCard } from "@/components/subscriptions/SubscriptionCard";
import { mockSubscriptions, calculateStats } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const { toast } = useToast();
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  
  const stats = calculateStats(mockSubscriptions);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    
    // Handle quick actions
    if (view === 'add') {
      toast({
        title: "Add Subscription",
        description: "This feature requires Supabase integration to store data.",
      });
      return;
    }
    
    if (view === 'import' || view === 'export') {
      toast({
        title: view === 'import' ? "Import Data" : "Export Data",
        description: "This feature will be available after Supabase integration.",
      });
      return;
    }
  };

  const handleSubscriptionAction = (action: string, id?: string) => {
    toast({
      title: `${action} Subscription`,
      description: "This feature requires Supabase integration for data persistence.",
    });
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md glass-card">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <Card className="w-full max-w-md glass-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Subscription Tracker</CardTitle>
            <CardDescription className="text-center">
              Please sign in to access your subscription dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => navigate('/auth')} 
              className="w-full gradient-primary"
            >
              Sign In
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account?</span>{' '}
              <Button
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={() => navigate('/auth?mode=signup')}
              >
                Sign up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <StatsCards {...stats} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <RecentSubscriptions 
                subscriptions={mockSubscriptions} 
                onViewAll={() => setActiveView('subscriptions')}
              />
              <div className="glass-card p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Insights</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Most expensive</span>
                    <span className="font-medium text-sm">Adobe Creative Cloud</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Next renewal</span>
                    <span className="font-medium text-sm">Netflix (Jan 15)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Top category</span>
                    <span className="font-medium text-sm">Entertainment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'subscriptions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Subscriptions</h2>
              <div className="text-sm text-muted-foreground">
                {mockSubscriptions.length} total subscriptions
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {mockSubscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  onEdit={(id) => handleSubscriptionAction('Edit', id)}
                  onDelete={(id) => handleSubscriptionAction('Delete', id)}
                  onViewDetails={(id) => handleSubscriptionAction('View', id)}
                />
              ))}
            </div>
          </div>
        );
        
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics</h2>
            <div className="glass-card p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Charts and detailed analytics will be available after integrating with Supabase
              </p>
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <div className="glass-card p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Settings Panel</h3>
              <p className="text-muted-foreground">
                User preferences and configuration options will be available here
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeView={activeView} onViewChange={handleViewChange} />
        
        <SidebarInset className="flex-1 w-full min-w-0">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 min-w-0" />
            <div className="hidden sm:block">
              <DashboardHeader 
                userName={user?.email?.split('@')[0] || 'User'} 
                onAddSubscription={() => handleViewChange('add')}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="ml-2"
            >
              Sign Out
            </Button>
          </header>
          
          <main className="flex-1 w-full min-w-0">
            <div className="p-4 sm:p-6">
              {renderContent()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
