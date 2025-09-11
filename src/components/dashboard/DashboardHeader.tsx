import { Button } from "@/components/ui/button";
import { Bell, User, Plus } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  onAddSubscription: () => void;
}

export function DashboardHeader({ userName = "User", onAddSubscription }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between p-6 border-b border-border">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {userName}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's your subscription overview for this month
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
        </Button>
        
        <Button onClick={onAddSubscription} className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Subscription
        </Button>
        
        <Button variant="outline" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}