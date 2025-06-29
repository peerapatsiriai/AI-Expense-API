export interface OcrRequest {
  files: any[]; // File uploads from multipart/form-data
  box_threshold?: number;
}

export interface OcrData {
  text: string;
  bbox?: number[]; // [x1, y1, x2, y2] bounding box coordinates
}

export interface OcrTextResult {
  page: number;
  data: OcrData[];
  full_text: string;
  image_size: number[];
}

export interface OcrFileResult {
  filename: string;
  status: string;
  result: OcrTextResult[];
}

export interface OcrResponse {
  success: boolean;
  data: OcrFileResult[];
  message: string;
} 