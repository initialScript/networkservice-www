// services/cart.ts

export interface CreateOrderRequest {
  customer: {
    full_name: string;
    email: string;
    phone: string;
    company?: string | null;
    ice?: string | null;
    address: {
      address_line: string;
      city: string;
      postal_code?: string | null;
    };
  };
  delivery_address: {
    address_line: string;
    city: string;
    postal_code?: string | null;
  } | null;
  payment_method: string;
  notes: string | null;
  items: Array<{
    product_id: number | string;
    name: string;
    slug: string;
    price: number;
    compare_price?: number | null;
    image?: string | null;
    quantity: number;
    total: number;
  }>;
}

// Define the response type
export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    user_id: string | null;
    address_id: string | null;
    guest_first_name: string;
    guest_last_name: string;
    guest_email: string;
    guest_phone: string;
    guest_company: string | null;
    guest_ice: string | null;
    guest_billing_address: {
      city: string;
      postal_code: string;
      address_line: string;
    };
    guest_shipping_address: {
      city: string;
      phone: string;
      full_name: string;
      postal_code: string;
      address_line: string;
    } | null;
    order_number: string;
    status: string;
    subtotal: string;
    shipping_fee: string;
    discount: string;
    total: string;
    payment_method: string;
    payment_status: string;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    OrderItems: Array<{
      id: string;
      order_id: string;
      product_id: string;
      quantity: number;
      unit_price: string;
      total_price: string;
      sku_snapshot: string;
      createdAt: string;
      updatedAt: string;
    }>;
  };
}

export async function createGuestOrder(orderData: CreateOrderRequest): Promise<OrderResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guest/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  // Log the response for debugging
  console.log('📡 API Response Status:', response.status);
  
  if (!response.ok) {
    let errorMessage = 'Erreur lors de la création de la commande';
    try {
      const errorData = await response.json();
      console.error('❌ API Error Response:', errorData);
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      console.error('❌ Failed to parse error response:', e);
    }
    throw new Error(errorMessage);
  }

  const data: OrderResponse = await response.json();
  console.log('✅ API Success Response:', data);
  
  return data;
}