import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductList from '@/components/ProductList/ProductList';
import { getProducts, Product } from '@/lib/api';

export default async function Home() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load products", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.title,
        "image": product.image,
        "description": product.description,
        "sku": product.id,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <ProductList products={products} />
      </main>
      <Footer />
    </>
  );
}
