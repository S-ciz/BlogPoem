const publicKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdua2NhbWZ4c3d5Z3NuZ2xidG1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkxNDk1MDQsImV4cCI6MTk5NDcyNTUwNH0.OkopVJ63xbXXm6uJGWi9J0TfbrjBPDoRai00sZTwhsY";
const { createClient } = require("@supabase/supabase-js");
const url = "https://gnkcamfxswygsnglbtmd.supabase.co";
// Create a single supabase client for interacting with your database
const supabase = createClient(url, publicKey);

module.exports = supabase;
