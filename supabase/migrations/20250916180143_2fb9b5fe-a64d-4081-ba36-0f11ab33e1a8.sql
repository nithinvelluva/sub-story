-- Add sample subscription data for the current user
INSERT INTO public.subscriptions (
  user_id,
  name,
  price_cents,
  currency,
  billing_cycle,
  next_renewal_date,
  status
) VALUES 
(
  '83863f46-0026-4d3e-a359-499402148139',
  'Netflix',
  1599,
  'CAD',
  'monthly',
  '2025-10-15',
  'active'
),
(
  '83863f46-0026-4d3e-a359-499402148139',
  'Spotify Premium',
  999,
  'CAD',
  'monthly',
  '2025-10-20',
  'active'
),
(
  '83863f46-0026-4d3e-a359-499402148139',
  'Adobe Creative Cloud',
  5999,
  'CAD',
  'monthly',
  '2025-10-10',
  'active'
);