import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ExternalLink, Calendar, DollarSign } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'weekly';
  nextChargeDate: string;
  status: 'active' | 'cancelled' | 'paused';
  category: string;
  paymentMethod: string;
  managementUrl?: string;
  description?: string;
}

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function SubscriptionCard({ 
  subscription, 
  onEdit, 
  onDelete, 
  onViewDetails 
}: SubscriptionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      case 'paused': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCycleLabel = (cycle: string) => {
    switch (cycle) {
      case 'monthly': return '/month';
      case 'yearly': return '/year';
      case 'weekly': return '/week';
      default: return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="glass-card hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg text-foreground">
                {subscription.name}
              </h3>
              <Badge className={getStatusColor(subscription.status)}>
                {subscription.status}
              </Badge>
            </div>
            <Badge variant="outline" className="text-xs">
              {subscription.category}
            </Badge>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(subscription.id)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(subscription.id)}>
                Edit
              </DropdownMenuItem>
              {subscription.managementUrl && (
                <DropdownMenuItem onClick={() => window.open(subscription.managementUrl, '_blank')}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Manage
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => onDelete(subscription.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Price</span>
          </div>
          <div className="font-bold text-lg text-foreground">
            {subscription.currency}{subscription.price.toFixed(2)}
            <span className="text-sm font-normal text-muted-foreground">
              {getCycleLabel(subscription.billingCycle)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Next charge</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {formatDate(subscription.nextChargeDate)}
          </span>
        </div>
        
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Payment: {subscription.paymentMethod}
          </p>
          {subscription.description && (
            <p className="text-xs text-muted-foreground mt-1">
              {subscription.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}