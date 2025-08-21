import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://kbphhwipksvffxeswqcm.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticGhod2lwa3N2ZmZ4ZXN3cWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNDA2MjUsImV4cCI6MjA2ODkxNjYyNX0.Xop9qNQp_l3kCCgYrrGYe4OHPuV03UbmPh92X9obvqE";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;