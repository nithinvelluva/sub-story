import type { Subscription } from "@/components/subscriptions/SubscriptionCard";

export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    price: 15.99,
    currency: '$',
    billingCycle: 'monthly',
    nextChargeDate: '2024-01-15',
    status: 'active',
    category: 'Entertainment',
    paymentMethod: 'Visa •••• 4532',
    managementUrl: 'https://netflix.com/account',
    description: 'Premium plan with 4K streaming'
  },
  {
    id: '2',
    name: 'GitHub Pro',
    price: 4.00,
    currency: '$',
    billingCycle: 'monthly',
    nextChargeDate: '2024-01-20',
    status: 'active',
    category: 'Development',
    paymentMethod: 'Mastercard •••• 8765',
    managementUrl: 'https://github.com/settings/billing',
    description: 'Advanced collaboration features'
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    price: 239.88,
    currency: '$',
    billingCycle: 'yearly',
    nextChargeDate: '2024-06-15',
    status: 'active',
    category: 'Design',
    paymentMethod: 'Visa •••• 4532',
    managementUrl: 'https://adobe.com/account',
    description: 'All apps included'
  },
  {
    id: '4',
    name: 'Spotify Premium',
    price: 9.99,
    currency: '$',
    billingCycle: 'monthly',
    nextChargeDate: '2024-01-18',
    status: 'active',
    category: 'Music',
    paymentMethod: 'PayPal',
    managementUrl: 'https://spotify.com/account',
    description: 'Ad-free music streaming'
  },
  {
    id: '5',
    name: 'Notion Pro',
    price: 8.00,
    currency: '$',
    billingCycle: 'monthly',
    nextChargeDate: '2024-01-22',
    status: 'active',
    category: 'Productivity',
    paymentMethod: 'Visa •••• 4532',
    managementUrl: 'https://notion.so/settings',
    description: 'Unlimited blocks and file uploads'
  },
  {
    id: '6',
    name: 'Dropbox Plus',
    price: 99.00,
    currency: '$',
    billingCycle: 'yearly',
    nextChargeDate: '2024-03-10',
    status: 'active',
    category: 'Cloud Storage',
    paymentMethod: 'Mastercard •••• 8765',
    managementUrl: 'https://dropbox.com/account',
    description: '2TB storage with advanced features'
  }
];

export const calculateStats = (subscriptions: Subscription[]) => {
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  
  const monthlyTotal = activeSubscriptions.reduce((total, sub) => {
    switch (sub.billingCycle) {
      case 'monthly': return total + sub.price;
      case 'yearly': return total + (sub.price / 12);
      case 'weekly': return total + (sub.price * 4.33);
      default: return total;
    }
  }, 0);

  const yearlyTotal = monthlyTotal * 12;

  // Mock upcoming renewals (next 7 days)
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
    monthlyChange: 12.5 // Mock percentage change
  };
};