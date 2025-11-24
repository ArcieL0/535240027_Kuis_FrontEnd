'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

interface Destination {
  id: number;
  name: string;
  country: string;
  city: string;
  description: string;
  visited: boolean;
  rating: number | null;
  budget: string | null;
  createdAt: string;
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'visited' | 'wishlist'>('all');

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('/api/destinations');
      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;

    try {
      const response = await fetch(`/api/destinations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDestinations(destinations.filter(d => d.id !== id));
        alert('Destination deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting destination:', error);
      alert('Failed to delete destination');
    }
  };

  const filteredDestinations = destinations.filter(dest => {
    if (filter === 'visited') return dest.visited;
    if (filter === 'wishlist') return !dest.visited;
    return true;
  });

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Travel Destinations</h1>
        <Link href="/destinations/create" className={styles.addButton}>
          ➕ Add New Destination
        </Link>
      </div>

      {/* Filter Buttons */}
      <div className={styles.filterGroup}>
        <button
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({destinations.length})
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'visited' ? styles.activeVisited : ''}`}
          onClick={() => setFilter('visited')}
        >
          Visited ({destinations.filter(d => d.visited).length})
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'wishlist' ? styles.activeWishlist : ''}`}
          onClick={() => setFilter('wishlist')}
        >
          Wishlist ({destinations.filter(d => !d.visited).length})
        </button>
      </div>

      {/* Destinations List */}
      {filteredDestinations.length === 0 ? (
        <div className={styles.emptyState}>
          <h4>No destinations found</h4>
          <p>Start adding your dream destinations!</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h5 className={styles.cardTitle}>{destination.name}</h5>
              </div>
              <div className={styles.cardBody}>
                <h6 className={styles.location}>
                  📍 {destination.city}, {destination.country}
                </h6>
                <p className={styles.description}>{destination.description}</p>
                
                <div className={styles.badges}>
                  {destination.visited ? (
                    <span className={`${styles.badge} ${styles.badgeVisited}`}>
                      ✓ Visited
                    </span>
                  ) : (
                    <span className={`${styles.badge} ${styles.badgeWishlist}`}>
                      ♡ Wishlist
                    </span>
                  )}
                  {destination.budget && (
                    <span className={`${styles.badge} ${styles.badgeBudget}`}>
                      {destination.budget}
                    </span>
                  )}
                </div>

                {destination.rating && (
                  <div className={styles.rating}>
                    {'⭐'.repeat(destination.rating)}
                  </div>
                )}
              </div>
              <div className={styles.cardFooter}>
                <Link 
                  href={`/destinations/${destination.id}`}
                  className={`${styles.cardButton} ${styles.viewButton}`}
                >
                  View
                </Link>
                <Link 
                  href={`/destinations/${destination.id}/edit`}
                  className={`${styles.cardButton} ${styles.editButton}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(destination.id)}
                  className={`${styles.cardButton} ${styles.deleteButton}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}