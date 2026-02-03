import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// המילה export כאן היא קריטית! בלי זה הדף לא יזהה את supabase
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // זה מה שיגרום למערכת לזכור אותך במונית
    autoRefreshToken: true,
  }
})