import { Request, Response } from 'express';
import { extractExpenses } from '@/modules/extractExpenses/extract.service';
import { ExpenseResult } from '@/modules/extractExpenses/extract.dto';
import { ExtractExpensesRequest } from '@/modules/extractExpenses/extract.validation';

export const extractExpensesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body as ExtractExpensesRequest;

    const result: ExpenseResult = await extractExpenses(text);
    res.json(result);
  } catch (error: any) {
    console.error('Expense extraction error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      status: 500
    });
  }
};

export const testExtractController = async (req: Request, res: Response): Promise<void> => {
  try {
    const testText = "วันนี้ไปซื้อกาแฟ 60 บาท และซื้อขนมปัง 25 บาท หลังจากนั้นไปซื้ออาหารกลางวัน 120 บาท น้ำเปล่า 10 บาท ซื้อผลไม้ 45 บาท เดินทางด้วยรถไฟฟ้า 40 บาท ซื้อของใช้ในบ้าน 250 บาท เติมน้ำมัน 1000 บาท ค่าโทรศัพท์ 300 บาท ค่าบริการอินเทอร์เน็ต 500 บาท ค่าไฟฟ้า 1200 บาท ค่าเช่าบ้าน 8000 บาท ซื้อหนังสือ 300 บาท ค่าเรียนพิเศษ 2000 บาท และค่ารักษาพยาบาล 500 บาท";

    const result: ExpenseResult = await extractExpenses(testText);

    res.json({
      ...result,
      testText,
      message: 'Test completed successfully'
    });
  } catch (error: any) {
    console.error('Test expense extraction error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      status: 500
    });
  }
};

export const healthExtractController = (req: Request, res: Response): void => {
  res.json({
    status: 'OK',
    service: 'Expense Extraction Service',
    timestamp: new Date().toISOString()
  });
}; 