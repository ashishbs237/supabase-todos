import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bvjyigdazlkcaruqzqwh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2anlpZ2RhemxrY2FydXF6cXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDQ0NDUsImV4cCI6MjA2MTY4MDQ0NX0.isey03mbmO2jG3Sx71uKuopfKWf_RIzxJdOWnSwgg6Q";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


