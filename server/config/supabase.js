const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

// Only create clients if we have real credentials
let supabase, supabaseAdmin;

if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
  // Client for public operations
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Admin client for server-side operations
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
} else {
  console.warn('⚠️  Supabase credentials not found. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
  
  // Create mock clients for development
  const mockClient = {
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          single: () => ({ data: null, error: { message: 'Supabase not configured' } }) 
        }) 
      }),
      insert: () => ({ 
        select: () => ({ 
          single: () => ({ data: null, error: { message: 'Supabase not configured' } }) 
        }) 
      }),
      update: () => ({ 
        eq: () => ({ 
          select: () => ({ 
            single: () => ({ data: null, error: { message: 'Supabase not configured' } }) 
          }) 
        }) 
      }),
      delete: () => ({ 
        eq: () => ({ data: null, error: { message: 'Supabase not configured' } }) 
      })
    }),
    storage: {
      from: () => ({
        upload: () => ({ data: null, error: { message: 'Supabase not configured' } }),
        getPublicUrl: () => ({ data: { publicUrl: '#' } })
      })
    }
  };
  
  supabase = mockClient;
  supabaseAdmin = mockClient;
}

module.exports = {
  supabase,
  supabaseAdmin
};
