export async function getBrands() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/brands`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const body = await res.text();

    throw new Error(
      `Brands API failed: ${res.status} ${res.statusText}\n${body}`
    );
  }

  const data = await res.json();
  return data.data || [];
}