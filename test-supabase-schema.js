const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkSchema() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .limit(1);
    
  if (error) {
    console.error("Error fetching projects:", error);
  } else {
    console.log("Projects table columns:", data.length > 0 ? Object.keys(data[0]) : "No data yet, cannot infer schema.");
  }
}

checkSchema();
