import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Plus,
  Download,
  Upload
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const actions = [
    { id: 'add', label: 'Add Subscription', icon: Plus },
    { id: 'import', label: 'Import', icon: Upload },
    { id: 'export', label: 'Export', icon: Download },
  ];

  return (
    <aside className="w-64 min-h-screen glass-card border-r">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <CreditCard className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">SubTracker</h1>
            <p className="text-sm text-muted-foreground">Manage subscriptions</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  isActive && "bg-secondary text-secondary-foreground shadow-sm"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm font-medium text-muted-foreground mb-4">Quick Actions</p>
          <div className="space-y-2">
            {actions.map((action) => {
              const Icon = action.icon;
              
              return (
                <Button
                  key={action.id}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-3"
                  onClick={() => onViewChange(action.id)}
                >
                  <Icon className="w-4 h-4" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}