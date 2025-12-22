'use client';

import { Heart } from 'lucide-react';
import { Product } from '@/lib/api';
import { useFavorites } from '@/context/FavoritesContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }: { product: Product }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const liked = isFavorite(product.id);

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.title} loading="lazy" />
            </div>
            <div className={styles.info}>
                <h3 className={styles.title}>{product.title}</h3>
                <div className={styles.meta}>
                    <div className={styles.pricing}>
                        <span className={styles.loginText}>Sign in</span> or <span className={styles.loginText}>Create an account</span> to see pricing
                    </div>
                    <button
                        className={styles.wishlist}
                        onClick={() => toggleFavorite(product)}
                        aria-label="Add to wishlist"
                    >
                        <Heart size={20} fill={liked ? "red" : "none"} stroke={liked ? "red" : "currentColor"} />
                    </button>
                </div>
            </div>
        </div>
    );
}
