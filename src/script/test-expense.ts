import dotenv from 'dotenv';
import { extractExpenses } from '@/modules/extractExpenses/gemini.service';
import { ExpenseResult } from '@/modules/extractExpenses/extract.dto';

dotenv.config();

async function testExpenseExtraction(): Promise<void> {
  const testText: string = "วันนี้ไปซื้อกาแฟ 60 บาท และซื้อขนมปัง 25 บาท หลังจากนั้นไปซื้ออาหารกลางวัน 120 บาท น้ำเปล่า 10 บาท ซื้อผลไม้ 45 บาท เดินทางด้วยรถไฟฟ้า 40 บาท ซื้อของใช้ในบ้าน 250 บาท เติมน้ำมัน 1000 บาท ค่าโทรศัพท์ 300 บาท ค่าบริการอินเทอร์เน็ต 500 บาท ค่าไฟฟ้า 1200 บาท ค่าเช่าบ้าน 8000 บาท ซื้อหนังสือ 300 บาท ค่าเรียนพิเศษ 2000 บาท และค่ารักษาพยาบาล 500 บาท";
  
  console.log('💰 Expense Extraction Test (JSON)');
  console.log('==================================');
  console.log('📝 Input Text:');
  console.log(testText);
  console.log('\n⏳ Processing with Gemini AI...\n');
  
  try {
    const result: ExpenseResult = await extractExpenses(testText);
    
    console.log('💡 Extracted Expenses (JSON Object):');
    //console.log(JSON.stringify(result, null, 2));
    
    console.log('\n📊 Summary:');
    console.log(`Total Expenses: ${result.expenses.length} items`);
    console.log(`Total Amount: ${result.total} บาท`);
    
    console.log('\n📋 Expense Details:');
    result.expenses.forEach((expense, index) => {
      console.log(`${index + 1}. ${expense.item}: ${expense.price} บาท`);
    });
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

testExpenseExtraction(); 