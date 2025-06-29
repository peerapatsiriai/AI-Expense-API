import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 Testing Gemini Expense Extraction API (Functional)');
  console.log('====================================================\n');

  try {
    // Test health endpoint
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/expenses/health`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // Test expense extraction with sample data
    console.log('2️⃣ Testing expense extraction with sample data...');
    const testResponse = await axios.get(`${API_BASE_URL}/expenses/test`);
    console.log('✅ Test response:');
    console.log(`   Total expenses: ${testResponse.data.expenses.length} items`);
    console.log(`   Total amount: ${testResponse.data.total} บาท`);
    console.log('   Sample expenses:');
    testResponse.data.expenses.slice(0, 3).forEach((expense: any, index: number) => {
      console.log(`   ${index + 1}. ${expense.item}: ${expense.price} บาท`);
    });
    console.log('');

    // Test custom expense extraction
    console.log('3️⃣ Testing custom expense extraction...');
    const customText = "ซื้อกาแฟ 80 บาท ขนมปัง 30 บาท และน้ำเปล่า 15 บาท";
    const extractResponse = await axios.post(`${API_BASE_URL}/expenses/extract`, {
      text: customText
    });
    console.log('✅ Custom extraction:');
    console.log(`   Input: "${customText}"`);
    console.log(`   Total expenses: ${extractResponse.data.expenses.length} items`);
    console.log(`   Total amount: ${extractResponse.data.total} บาท`);
    console.log('   Extracted expenses:');
    extractResponse.data.expenses.forEach((expense: any, index: number) => {
      console.log(`   ${index + 1}. ${expense.item}: ${expense.price} บาท`);
    });

  } catch (error: any) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testAPI();
}

export { testAPI }; 