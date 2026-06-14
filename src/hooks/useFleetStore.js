import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_FLEET, slugify } from '../data/defaultFleet';

const STORAGE_KEY = 'luxmotors-fleet-v1';

export function loadFleet() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* fall through to defaults */
  }
  return DEFAULT_FLEET;
}

export function persistFleet(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  window.dispatchEvent(new CustomEvent('fleet-updated'));
}

export function getCarBySlug(slug, cars = loadFleet()) {
  return cars.find((c) => c.slug === slug && c.visible !== false) || null;
}

export function useFleetStore() {
  const [cars, setCars] = useState(() => loadFleet());

  useEffect(() => {
    const sync = () => setCars(loadFleet());
    window.addEventListener('fleet-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('fleet-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const save = useCallback((nextCars) => {
    persistFleet(nextCars);
    setCars(nextCars);
  }, []);

  const addCar = useCallback((car) => {
    const slug = car.slug || slugify(car.name);
    const next = [...cars, { ...car, id: car.id || `car-${Date.now()}`, slug }];
    save(next);
    return slug;
  }, [cars, save]);

  const updateCar = useCallback((id, updates) => {
    const next = cars.map((c) => {
      if (c.id !== id) return c;
      const merged = { ...c, ...updates };
      if (updates.name && !updates.slug) merged.slug = slugify(updates.name);
      return merged;
    });
    save(next);
  }, [cars, save]);

  const deleteCar = useCallback((id) => {
    save(cars.filter((c) => c.id !== id));
  }, [cars, save]);

  const resetToDefaults = useCallback(() => {
    save(DEFAULT_FLEET);
  }, [save]);

  const getBySlug = useCallback((slug) => getCarBySlug(slug, cars), [cars]);

  return {
    cars,
    addCar,
    updateCar,
    deleteCar,
    resetToDefaults,
    getBySlug,
    refresh: () => setCars(loadFleet()),
  };
}
