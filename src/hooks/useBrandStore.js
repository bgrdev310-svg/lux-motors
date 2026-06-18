import { useState, useEffect, useCallback } from 'react';
import { brands as defaultBrands } from '../data/brands';

const STORAGE_KEY = 'luxmotors-brands-v2';

function initBrands(defaults) {
  return defaults.map((b) => ({
    ...b,
    available: b.available !== undefined ? b.available : true,
    visible: b.visible !== undefined ? b.visible : true,
    customLogo: b.customLogo || '',
  }));
}

export function loadBrands() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* fall through */
  }

  // Attempt migration from v1 to update default brands with their correct logo slugs
  try {
    const rawV1 = localStorage.getItem('luxmotors-brands-v1');
    if (rawV1) {
      const parsedV1 = JSON.parse(rawV1);
      if (Array.isArray(parsedV1) && parsedV1.length > 0) {
        const updated = parsedV1.map((brand) => {
          if (brand.slug === 'rolls-royce' && brand.logoSlug === 'rollsroyce') {
            return { ...brand, logoSlug: 'rolls-royce' };
          }
          if (brand.slug === 'aston-martin' && brand.logoSlug === 'astonmartin') {
            return { ...brand, logoSlug: 'aston-martin' };
          }
          if (brand.slug === 'mercedes-benz' && brand.logoSlug === 'mercedes') {
            return { ...brand, logoSlug: 'mercedes-benz' };
          }
          if (brand.slug === 'land-rover' && brand.logoSlug === 'landrover') {
            return { ...brand, logoSlug: 'land-rover' };
          }
          return brand;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      }
    }
  } catch {
    /* fall through */
  }

  const initial = initBrands(defaultBrands);
  persistBrands(initial);
  return initial;
}

export function persistBrands(brands) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(brands));
  window.dispatchEvent(new CustomEvent('brands-updated'));
}

export function useBrandStore() {
  const [brands, setBrands] = useState(() => loadBrands());

  useEffect(() => {
    const sync = () => setBrands(loadBrands());
    window.addEventListener('brands-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('brands-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const save = useCallback((nextBrands) => {
    persistBrands(nextBrands);
    setBrands(nextBrands);
  }, []);

  const addBrand = useCallback((brand) => {
    const slug = brand.slug || brand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const next = [...brands, {
      ...brand,
      slug,
      available: brand.available !== undefined ? brand.available : true,
      visible: brand.visible !== undefined ? brand.visible : true,
      customLogo: brand.customLogo || '',
    }];
    save(next);
  }, [brands, save]);

  const updateBrand = useCallback((slug, updates) => {
    const next = brands.map((b) =>
      b.slug === slug ? { ...b, ...updates } : b
    );
    save(next);
  }, [brands, save]);

  const deleteBrand = useCallback((slug) => {
    save(brands.filter((b) => b.slug !== slug));
  }, [brands, save]);

  const resetToDefaults = useCallback(() => {
    save(initBrands(defaultBrands));
  }, [save]);

  /** Helper: get logo URL for a brand (custom or fallback) */
  const getLogoUrl = useCallback((brand) => {
    if (brand.customLogo) return brand.customLogo;
    return `https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/${brand.logoSlug || brand.slug}.png`;
  }, []);

  return {
    brands,
    addBrand,
    updateBrand,
    deleteBrand,
    resetToDefaults,
    getLogoUrl,
    visibleBrands: brands.filter((b) => b.visible !== false),
    refresh: () => setBrands(loadBrands()),
  };
}
