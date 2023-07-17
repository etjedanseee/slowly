import { createClient } from "@supabase/supabase-js";

if (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_KEY) {
  throw new Error('Please check supabase url and key')
}

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

export default supabase;