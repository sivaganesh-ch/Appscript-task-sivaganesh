'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, ShoppingBag, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import { useFilter } from '@/context/FilterContext';
import styles from './Header.module.css';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [favoritesOpen, setFavoritesOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { favorites } = useFavorites();
    const { searchQuery, setSearchQuery } = useFilter();

    return (
        <header className={styles.header}>
            <div className={styles.topBar}>
                <div className={styles.container}>
                    <div className={styles.mobileLeft}>
                        <div className={styles.mobileMenu} onClick={() => setMobileMenuOpen(true)}>
                            <Menu size={24} />
                        </div>
                        <div className={styles.logoIcon}>
                            <Image src="/logo.png" alt="Logo Icon" width={24} height={24} />
                        </div>
                    </div>

                    <Link href="/" className={styles.logo}>
                        LOGO
                    </Link>

                    <div className={styles.icons}>
                        <div className={styles.searchWrapper}>
                            <div className={`${styles.searchBox} ${searchOpen ? styles.open : ''}`}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                aria-label="Search"
                                className={styles.iconBtn}
                                onClick={() => setSearchOpen(!searchOpen)}
                            >
                                <Search size={22} />
                            </button>
                        </div>

                        <div className={styles.favWrapper}>
                            <button
                                aria-label="Favorites"
                                className={styles.iconBtn}
                                onClick={() => setFavoritesOpen(!favoritesOpen)}
                            >
                                <Heart size={22} fill={favorites.length > 0 ? "black" : "none"} className={favorites.length > 0 ? styles.heartActive : ''} />
                            </button>
                            {favoritesOpen && (
                                <div className={styles.favOverlay}>
                                    <h4>Favorites ({favorites.length})</h4>
                                    {favorites.length === 0 ? <p className={styles.emptyFav}>No favorites yet.</p> : (
                                        <ul className={styles.favList}>
                                            {favorites.map(p => (
                                                <li key={p.id} className={styles.favItem}>
                                                    <img src={p.image} alt={p.title} width={40} height={40} />
                                                    <span>{p.title.substring(0, 20)}...</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                        <button aria-label="Cart" className={styles.iconBtn}><ShoppingBag size={22} /></button>
                        <button aria-label="Account" className={`${styles.iconBtn} ${styles.desktopOnly}`}><User size={22} /></button>
                        <div className={`${styles.lang} ${styles.desktopOnly}`}>ENG</div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className={styles.mobileOverlay}>
                    <div className={styles.mobileSidebar}>
                        <button className={styles.closeBtn} onClick={() => setMobileMenuOpen(false)}>
                            <X size={24} />
                        </button>
                        <nav className={styles.mobileNav}>
                            <Link href="#" onClick={() => setMobileMenuOpen(false)}>SHOP</Link>
                            <Link href="#" onClick={() => setMobileMenuOpen(false)}>SKILLS</Link>
                            <Link href="#" onClick={() => setMobileMenuOpen(false)}>STORIES</Link>
                            <Link href="#" onClick={() => setMobileMenuOpen(false)}>ABOUT</Link>
                            <Link href="#" onClick={() => setMobileMenuOpen(false)}>CONTACT US</Link>
                        </nav>
                    </div>
                </div>
            )}

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><Link href="#">SHOP</Link></li>
                    <li className={styles.navItem}><Link href="#">SKILLS</Link></li>
                    <li className={styles.navItem}><Link href="#">STORIES</Link></li>
                    <li className={styles.navItem}><Link href="#">ABOUT</Link></li>
                    <li className={styles.navItem}><Link href="#">CONTACT US</Link></li>
                </ul>
            </nav>
        </header>
    );
}
