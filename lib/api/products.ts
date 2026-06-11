// lib/api/products.ts

const API_URL = process.env.API_URL;

export async function getAllProducts(params: Record<string, string>) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value);
    }
  });

  const res = await fetch(
    `${process.env.API_URL}/products?${query.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Products API failed: ${res.status} ${res.statusText}\n${body}`
    );
  }

  return res.json();
}