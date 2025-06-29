import dotenv from 'dotenv';
import { askQuestion } from '../modules/extractExpenses/gemini.service';

dotenv.config();

async function main(): Promise<void> {
  const question: string = "How many days are in one year?";
  console.log('🤖 Gemini AI Test (Service Pattern)');
  console.log('===================================');
  console.log(`❓ Question: ${question}`);
  console.log('⏳ Getting answer from Gemini...\n');
  
  try {
    const answer = await askQuestion(question);
    console.log(`💡 Answer: ${answer}`);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

main(); 