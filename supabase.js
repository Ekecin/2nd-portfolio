import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseClient = window.supabase.createClient(
   "https://zupebcqbkxxfrhczwyla.supabase.co",
    "sb_publishable_w_h44yTIz2sLDirhDaiqbQ_IT5HHqzT"
);
export default supabaseClient;