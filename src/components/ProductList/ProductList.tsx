'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import SidebarFilter from '../SidebarFilter/SidebarFilter';
import styles from './ProductList.module.css';
import { Product, getProducts } from '@/lib/api';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useFilter } from '@/context/FilterContext';

export default function ProductList({ products: initialProducts }: { products: Product[] }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(true);
    const [sortOpen, setSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('RECOMMENDED');

    const { searchQuery, selectedFilters } = useFilter();

    useEffect(() => {
        if (products.length === 0) {
            const fetchProducts = async () => {
                setIsLoading(true);
                try {
                    const data = await getProducts();
                    setProducts(data);
                } catch (error) {
                    console.error("Failed to load products on client", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProducts();
        }
    }, [products.length]);

    // Filter Logic
    const filteredProducts = products.filter(p => {
        // Search Filter
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());

        // Category Filter (Mapped from sidebar)
        // We look primarily at the "CATEGORY" section we added.
        // We can also map "IDEAL FOR" -> Clothing logic if needed.

        let matchesCategory = true;

        // Check CATEGORY section
        if (selectedFilters['CATEGORY'] && selectedFilters['CATEGORY'].length > 0) {
            matchesCategory = selectedFilters['CATEGORY'].includes(p.category);
        }

        // Optional: Map IDEAL FOR
        if (matchesCategory && selectedFilters['IDEAL FOR'] && selectedFilters['IDEAL FOR'].length > 0) {
            const ideals = selectedFilters['IDEAL FOR'];
            // Simple mapping for demo
            const isMen = ideals.includes('Men') && p.category === "men's clothing";
            const isWomen = ideals.includes('Women') && p.category === "women's clothing";
            // If user selected Men, but product is women's, this should fail if we treat it as strict filter.
            // If user selected Options, product must match AT LEAST ONE of selected options (OR logic within section).

            // If mapped logic is too complex for this demo without real data attributes, we rely on 'CATEGORY' section mainly.
            // But let's verify if product fits 'IDEAL'.
            if (ideals.includes('Men') && p.category !== "men's clothing" && !ideals.includes('Women')) {
                // partial fail? keeping it simple: match explicitly if category aligns
                // matchesCategory = false; // Let's rely on explicit category filter for now or build helper.
            }
        }

        return matchesSearch && matchesCategory;
    });

    // Sort Logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (selectedSort) {
            case 'PRICE: LOW TO HIGH': return a.price - b.price;
            case 'PRICE: HIGH TO LOW': return b.price - a.price;
            case 'NEWEST FIRST': return b.id - a.id; // Mock
            // 'POPULAR' and 'RECOMMENDED' can be default order
            default: return 0;
        }
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>DISCOVER OUR PRODUCTS</h1>
                <p>Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.</p>
            </div>

            <div className={styles.controls}>
                <div className={styles.leftControls}>
                    <span className={styles.count}>{sortedProducts.length} ITEMS</span>

                    {/* Desktop Toggle */}
                    <button className={`${styles.filterToggle} ${styles.desktopOnly}`} onClick={() => setShowFilter(!showFilter)}>
                        {showFilter ?
                            <><ChevronLeft size={16} /> HIDE FILTER</> :
                            <><ChevronRight size={16} /> SHOW FILTER</>
                        }
                    </button>

                    {/* Mobile Toggle */}
                    <button className={`${styles.filterToggle} ${styles.mobileOnly}`} onClick={() => setShowFilter(!showFilter)}>
                        FILTER
                    </button>
                </div>

                <div className={styles.sortContainer}>
                    <button className={styles.sortBtn} onClick={() => setSortOpen(!sortOpen)}>
                        {selectedSort} <ChevronDown size={16} />
                    </button>
                    {sortOpen && (
                        <ul className={styles.sortMenu}>
                            {['RECOMMENDED', 'NEWEST FIRST', 'POPULAR', 'PRICE: HIGH TO LOW', 'PRICE: LOW TO HIGH'].map(opt => (
                                <li key={opt} onClick={() => { setSelectedSort(opt); setSortOpen(false); }}>
                                    {selectedSort === opt && <b>✓ </b>} {opt}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className={styles.content}>
                {showFilter && <SidebarFilter />}
                <div className={showFilter ? styles.gridWithFilter : styles.gridFull}>
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map(p => <ProductCard key={p.id} product={p} />)
                    ) : (
                        <div className={styles.noResults}>
                            {isLoading ? 'Loading products...' : 'No products found matching your filters.'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
