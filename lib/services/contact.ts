// services/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface ContactFormData {
  name: string;
  email: string;
  sujet: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export const contactService = {
  /**
   * Send contact form message
   */
  async sendMessage(data: ContactFormData): Promise<ContactResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erreur lors de l\'envoi du message');
      }

      const result = await response.json();
      console.log('📧 Contact API Response:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Contact API Error:', error);
      throw error;
    }
  }
};