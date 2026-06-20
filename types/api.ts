export interface ContactFormData {
  name: string;
  email: string;
  sujet: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}