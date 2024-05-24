//create webhook
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { stripe } from '@/libs/stripe';

import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
} from '@/libs/supabaseAdmin';

//different events in the webhook
const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export async function POST(request: Request) {
  //need to pass string to stripe webhook
  const body = await request.text();
  const sig = headers().get('Stripe-Signature');

  //get webhook secret
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret!);
  } catch (error: any) {
    console.log('Error message ' + error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  //define the webhook
  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
        case 'price.created':
        case 'price.updated':
      }
    } catch {}
  }
}
