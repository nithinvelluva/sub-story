import { useState } from "react";
import { AppSidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentSubscriptions } from "@/components/dashboard/RecentSubscriptions";
import { SubscriptionCard } from "@/components/subscriptions/SubscriptionCard";
import { mockSubscriptions, calculateStats } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const { toast } = useToast();
  
  const stats = calculateStats(mockSubscriptions);

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

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <StatsCards {...stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentSubscriptions 
                subscriptions={mockSubscriptions} 
                onViewAll={() => setActiveView('subscriptions')}
              />
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Insights</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Most expensive</span>
                    <span className="font-medium">Adobe Creative Cloud</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Next renewal</span>
                    <span className="font-medium">Netflix (Jan 15)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Top category</span>
                    <span className="font-medium">Entertainment</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <div className="flex min-h-screen w-full">
        <AppSidebar activeView={activeView} onViewChange={handleViewChange} />
        
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <DashboardHeader 
              userName="Alex" 
              onAddSubscription={() => handleViewChange('add')}
            />
          </header>
          
          <main className="flex-1">
            <div className="p-6">
              {renderContent()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
