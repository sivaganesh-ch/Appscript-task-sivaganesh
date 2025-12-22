'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useFilter } from '@/context/FilterContext';
import styles from './SidebarFilter.module.css';

// Updated filtering structure to better match potential product data
const FILTERS = [
    { name: 'CATEGORY', options: ["men's clothing", "women's clothing", "jewelery", "electronics"] },
    { name: 'IDEAL FOR', options: ['Men', 'Women', 'Baby & Kids'] },
    { name: 'OCCASION', options: ['Casual', 'Formal', 'Party'] },
    { name: 'WORK', options: ['Office', 'Field'] },
    { name: 'FABRIC', options: ['Cotton', 'Silk', 'Wool'] },
    { name: 'SEGMENT', options: ['Luxury', 'Economy'] },
    { name: 'SUITABLE FOR', options: ['Summer', 'Winter'] },
    { name: 'RAW MATERIALS', options: ['Leather', 'Synthetic'] },
    { name: 'PATTERN', options: ['Solid', 'Striped'] },
];

export default function SidebarFilter() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
                <label className={styles.checkboxLabel}>
                    <input type="checkbox" />
                    <span className={styles.labelText}>Customizable</span>
                </label>
            </div>
            {FILTERS.map((f, i) => (
                <FilterGroup key={i} title={f.name} options={f.options} />
            ))}
        </aside>
    )
}

function FilterGroup({ title, options }: { title: string, options: string[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedFilters, toggleFilter, clearSection } = useFilter();

    // Get selected filters for this section
    const selected = selectedFilters[title] || [];

    return (
        <div className={styles.filterGroup}>
            <button className={styles.groupHeader} onClick={() => setIsOpen(!isOpen)}>
                <span className={styles.title}>{title}</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {isOpen && (
                <div className={styles.groupContent}>
                    <div className={styles.headerRow}>
                        <span className={styles.allText}>All</span>
                        {selected.length > 0 && (
                            <button className={styles.unselect} onClick={() => clearSection(title)}>
                                Unselect all
                            </button>
                        )}
                    </div>
                    {options.map(opt => (
                        <label key={opt} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selected.includes(opt)}
                                onChange={() => toggleFilter(title, opt)}
                            />
                            <span className={styles.labelText}>{opt}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}
