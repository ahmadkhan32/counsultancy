const bcrypt = require('bcryptjs');
const { supabaseAdmin } = require('./config/supabase');

async function createAdminUser() {
  try {
    // Admin credentials
    const adminEmail = 'admin@visaconsultancy.com';
    const adminPassword = 'admin123456';
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    
    // Create admin user
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .insert([
        {
          email: adminEmail,
          password_hash: hashedPassword,
          role: 'admin',
          is_active: true,
          created_at: new Date().toISOString()
        }
      ])
      .select();
    
    if (error) {
      console.error('Error creating admin user:', error);
      return;
    }
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('🌐 Login URL: http://localhost:3000/admin/login');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
createAdminUser();
