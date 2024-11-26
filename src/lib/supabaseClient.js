import { createClient } from '@supabase/supabase-js'

const url = 'https://hvwhmseloidfdwfaofyo.supabase.co'
const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2d2htc2Vsb2lkZmR3ZmFvZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NDcyMTAsImV4cCI6MjA0ODEyMzIxMH0.eVRyhhrROOJEVc6EVhNKwI0ODMsqFQ8PMcANa4kS0vs'

// Create a single supabase client for interacting with your database
const supabase = createClient(url, anon)


export default supabase