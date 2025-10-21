import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Only create client if we have real credentials
let supabase;

if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('⚠️  Supabase credentials not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file');
  
  // Create a mock client for development
  supabase = {
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          order: () => ({ 
            limit: () => ({ data: [], error: null }) 
          }) 
        }),
        order: () => ({ 
          limit: () => ({ data: [], error: null }) 
        })
      })
    })
  };
}

export { supabase };

// Helper functions for common operations
export const getCountries = async () => {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching countries:', error);
    return [];
  }

  return data;
};

export const getVisaTypes = async (category = null, country = null) => {
  let query = supabase
    .from('visa_types')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (category) {
    query = query.eq('category', category);
  }

  if (country) {
    query = query.contains('countries', [country]);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching visa types:', error);
    return [];
  }

  return data;
};

export const getBlogPosts = async (category = null, limit = 10) => {
  let query = supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, tags, category, author, published_at, views')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data;
};

export const getTestimonials = async (featured = false) => {
  let query = supabase
    .from('testimonials')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  if (featured) {
    query = query.eq('is_featured', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data;
};
