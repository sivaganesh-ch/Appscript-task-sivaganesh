export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}

export async function getProducts(): Promise<Product[]> {
    const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' }); // Ensure fresh data or use 'force-cache' for SSG
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
}
