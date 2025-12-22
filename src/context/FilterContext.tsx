'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedFilters: Record<string, string[]>;
    toggleFilter: (section: string, option: string) => void;
    clearSection: (section: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    const toggleFilter = (section: string, option: string) => {
        setSelectedFilters(prev => {
            const sectionFilters = prev[section] || [];
            const exists = sectionFilters.includes(option);

            let newSectionFilters;
            if (exists) {
                newSectionFilters = sectionFilters.filter(item => item !== option);
            } else {
                newSectionFilters = [...sectionFilters, option];
            }

            // If array empty, remove key? Or keep empty. keeping empty is fine.
            return { ...prev, [section]: newSectionFilters };
        });
    };

    const clearSection = (section: string) => {
        setSelectedFilters(prev => ({ ...prev, [section]: [] }));
    };

    return (
        <FilterContext.Provider value={{ searchQuery, setSearchQuery, selectedFilters, toggleFilter, clearSection }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
}
