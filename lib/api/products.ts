// lib/api/products.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllProducts(params: Record<string, string>) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value);
    }
  });

  const res = await fetch(
    `${API_URL}/products?${query.toString()}`,
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



export async function getSingleProduct(slug: string) {
  const res = await fetch(
    `${API_URL}/products/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const result = await res.json();

  return result.data;
}


export const getRelatedProducts = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}/related`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return data.data || [];
  } catch {
    return [];
  }
};