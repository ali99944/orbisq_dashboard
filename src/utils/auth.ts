// utils/auth.ts
import { cookies } from 'next/headers';

export async function getCustomerFromServer() {
  const cookieStore = await cookies();
  const customerCookie = cookieStore.get('customer');
  
  if (!customerCookie) return null;
  
  try {
    return JSON.parse(customerCookie.value) as {
      phone: string;
      name: string;
    };
  } catch {
    return null;
  }
}