import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Subscription {
  id: string;
  name: string;
  price_cents: number;
  currency: string;
  billing_cycle: string;
  next_renewal_date: string;
  status: string;
  tags?: string;
  payment_method?: string;
  url?: string;
  notes?: string;
  custom_interval_days?: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface SubscriptionCardData {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'weekly' | 'custom';
  nextChargeDate: string;
  status: 'active' | 'cancelled' | 'paused';
  category: string;
  paymentMethod: string;
  managementUrl?: string;
  description?: string;
}

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSubscriptions = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching subscriptions",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setSubscriptions(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching subscriptions",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [user]);

  // Convert database format to component format
  const transformSubscriptions = (dbSubs: Subscription[]): SubscriptionCardData[] => {
    return dbSubs.map(sub => ({
      id: sub.id,
      name: sub.name,
      price: sub.price_cents / 100, // Convert cents to dollars
      currency: getCurrencySymbol(sub.currency),
      billingCycle: mapBillingCycle(sub.billing_cycle),
      nextChargeDate: sub.next_renewal_date,
      status: mapStatus(sub.status),
      category: sub.tags || 'General',
      paymentMethod: sub.payment_method || 'Not specified',
      managementUrl: sub.url,
      description: sub.notes,
    }));
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency.toUpperCase()) {
      case 'USD': return '$';
      case 'CAD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      default: return currency;
    }
  };

  const mapBillingCycle = (cycle: string): 'monthly' | 'yearly' | 'weekly' | 'custom' => {
    switch (cycle.toLowerCase()) {
      case 'monthly': return 'monthly';
      case 'yearly': return 'yearly';
      case 'weekly': return 'weekly';
      default: return 'custom';
    }
  };

  const mapStatus = (status: string): 'active' | 'cancelled' | 'paused' => {
    switch (status.toLowerCase()) {
      case 'active': return 'active';
      case 'cancelled': return 'cancelled';
      case 'paused': return 'paused';
      default: return 'active';
    }
  };

  const calculateStats = (subs: SubscriptionCardData[]) => {
    const activeSubscriptions = subs.filter(sub => sub.status === 'active');
    
    const monthlyTotal = activeSubscriptions.reduce((total, sub) => {
      switch (sub.billingCycle) {
        case 'monthly': return total + sub.price;
        case 'yearly': return total + (sub.price / 12);
        case 'weekly': return total + (sub.price * 4.33);
        default: return total;
      }
    }, 0);

    const yearlyTotal = monthlyTotal * 12;

    // Calculate upcoming renewals (next 7 days)
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const upcomingRenewals = activeSubscriptions.filter(sub => {
      const renewalDate = new Date(sub.nextChargeDate);
      return renewalDate >= today && renewalDate <= nextWeek;
    }).length;

    return {
      monthlyTotal,
      yearlyTotal,
      activeSubscriptions: activeSubscriptions.length,
      upcomingRenewals,
      monthlyChange: 0 // TODO: Calculate actual change when we have historical data
    };
  };

  const transformedSubscriptions = transformSubscriptions(subscriptions);
  const stats = calculateStats(transformedSubscriptions);

  return {
    subscriptions: transformedSubscriptions,
    rawSubscriptions: subscriptions,
    loading,
    stats,
    refetch: fetchSubscriptions
  };
};