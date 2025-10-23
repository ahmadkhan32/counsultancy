// Test script to verify admin login API
const fetch = require('node-fetch');

async function testLogin() {
  try {
    console.log('🧪 Testing admin login API...');
    
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@visaconsultancy.com',
        password: 'admin123456'
      }),
    });

    const data = await response.json();
    
    console.log('📊 Response status:', response.status);
    console.log('📋 Response data:', data);
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('🎫 Token:', data.token);
      console.log('👤 User:', data.user);
    } else {
      console.log('❌ Login failed:', data.message);
    }
  } catch (error) {
    console.error('💥 Error testing login:', error.message);
  }
}

testLogin();
