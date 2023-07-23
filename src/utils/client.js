import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	"https://ctxkjxcruspejsfkznjl.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0eGtqeGNydXNwZWpzZmt6bmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4MjQzNjMsImV4cCI6MTk5NzQwMDM2M30.EitTzfQSfy8XZEM7ulOki61dHIsc1dMx1vlSqr6zl2Y"
);

export default supabase;
