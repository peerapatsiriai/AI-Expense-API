export interface SpeechToTextRequest {
  files: any[]; // File uploads from multipart/form-data
  boosting_words?: string[];
}

export interface SpeechToTextTranscript {
  speaker: string;
  transcript: string;
  start_time: number;
  end_time: number;
}

export interface SpeechToTextFileResult {
  filename: string;
  status: string;
  result: SpeechToTextTranscript[];
  duration: number;
}

export interface SpeechToTextResponse {
  success: boolean;
  data: SpeechToTextFileResult[];
  message: string;
}

