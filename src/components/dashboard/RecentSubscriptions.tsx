import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, DollarSign } from "lucide-react";
import type { Subscription } from "@/components/subscriptions/SubscriptionCard";

interface RecentSubscriptionsProps {
  subscriptions: Subscription[];
  onViewAll: () => void;
}

export function RecentSubscriptions({ subscriptions, onViewAll }: RecentSubscriptionsProps) {
  const recentSubs = subscriptions.slice(0, 5);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getCycleShort = (cycle: string) => {
    switch (cycle) {
      case 'monthly': return '/mo';
      case 'yearly': return '/yr';
      case 'weekly': return '/wk';
      case 'custom': return '';
      default: return '';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Subscriptions</CardTitle>
        <Button variant="ghost" size="sm" onClick={onViewAll}>
          View All
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentSubs.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{sub.name}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <DollarSign className="w-3 h-3" />
                    {sub.currency}{sub.price.toFixed(2)}{getCycleShort(sub.billingCycle)}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDate(sub.nextChargeDate)}
                  </div>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                sub.status === 'active' ? 'bg-success' : 
                sub.status === 'cancelled' ? 'bg-destructive' : 'bg-warning'
              }`} />
            </div>
          ))}
          
          {recentSubs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No subscriptions yet</p>
              <p className="text-sm mt-1">Add your first subscription to get started</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}