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

  return res.json();
}