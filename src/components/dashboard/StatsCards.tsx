import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Calendar, CreditCard } from "lucide-react";

interface StatsCardsProps {
  monthlyTotal: number;
  yearlyTotal: number;
  activeSubscriptions: number;
  upcomingRenewals: number;
  monthlyChange: number;
}

export function StatsCards({ 
  monthlyTotal, 
  yearlyTotal, 
  activeSubscriptions, 
  upcomingRenewals,
  monthlyChange 
}: StatsCardsProps) {
  const isPositiveChange = monthlyChange >= 0;
  
  const stats = [
    {
      title: "Monthly Total",
      value: `$${monthlyTotal.toFixed(2)}`,
      icon: DollarSign,
      description: `${isPositiveChange ? '+' : ''}${monthlyChange.toFixed(1)}% from last month`,
      trend: isPositiveChange,
      color: "text-success"
    },
    {
      title: "Yearly Projection",
      value: `$${yearlyTotal.toFixed(2)}`,
      icon: TrendingUp,
      description: "Based on current subscriptions",
      color: "text-primary"
    },
    {
      title: "Active Subscriptions",
      value: activeSubscriptions.toString(),
      icon: CreditCard,
      description: "Currently active services",
      color: "text-accent-foreground"
    },
    {
      title: "Upcoming Renewals",
      value: upcomingRenewals.toString(),
      icon: Calendar,
      description: "Next 7 days",
      color: "text-warning"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <Card key={stat.title} className="glass-card hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="flex items-center gap-1">
                {stat.trend !== undefined && (
                  <>
                    {stat.trend ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                  </>
                )}
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}