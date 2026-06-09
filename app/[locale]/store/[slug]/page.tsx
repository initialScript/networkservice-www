
import ProductsDetailClient from "./ProductsDetailClient";

type Params = Promise<{
  slug: string;
}>;

const Page = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  // Extract ID from slug (e.g., "prod-001-macbook-pro-14-m3-pro-chip" -> "prod-001")
const productId = slug.split('-').slice(0, 2).join('-');
  
  // Or if your ID always ends with a pattern, you can use regex:
  // const productId = productSlug.match(/^([^-]+-[^-]+)/)?.[0] || productSlug;

  return (
    <main className="w-full h-full">
      <ProductsDetailClient productId={productId} />
    </main>
  );
};

export default Page;