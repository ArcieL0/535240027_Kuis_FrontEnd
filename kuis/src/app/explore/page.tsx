'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Country {
  name: string;
  capital?: string;
  region: string;
  subregion?: string;
  population: number;
  flag: string;
  languages?: { iso639_1: string; iso639_2: string; name: string; nativeName: string }[];
  currencies?: { code: string; name: string; symbol: string }[];
  alpha3Code: string;
}

export default function ExplorePage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    filterCountries();
  }, [searchTerm, selectedRegion, countries]);

  const fetchCountries = async () => {
    try {
      console.log('Starting fetch...');
      const response = await fetch('https://restcountries.com/v3.1/independent?status=true');
      
      console.log('Response received:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Data parsed, count:', data.length);
      
      // Sort by name
      const sortedData = data.sort((a: Country, b: Country) => 
        a.name.localeCompare(b.name)
      );
      
      setCountries(sortedData);
      setFilteredCountries(sortedData);
      console.log('Countries set successfully');
    } catch (error) {
      console.error('Detailed error:', error);
      
      const sampleData: Country[] = [
        {
          name: 'Indonesia',
          capital: 'Jakarta',
          region: 'Asia',
          subregion: 'South-Eastern Asia',
          population: 273523615,
          flag: 'https://flagcdn.com/w320/id.png',
          alpha3Code: 'IDN',
          languages: [{ iso639_1: 'id', iso639_2: 'ind', name: 'Indonesian', nativeName: 'Bahasa Indonesia' }],
          currencies: [{ code: 'IDR', name: 'Indonesian rupiah', symbol: 'Rp' }]
        },
        {
          name: 'France',
          capital: 'Paris',
          region: 'Europe',
          subregion: 'Western Europe',
          population: 67391582,
          flag: 'https://flagcdn.com/w320/fr.png',
          alpha3Code: 'FRA',
          languages: [{ iso639_1: 'fr', iso639_2: 'fra', name: 'French', nativeName: 'français' }],
          currencies: [{ code: 'EUR', name: 'Euro', symbol: '€' }]
        },
        {
          name: 'Japan',
          capital: 'Tokyo',
          region: 'Asia',
          subregion: 'Eastern Asia',
          population: 125836021,
          flag: 'https://flagcdn.com/w320/jp.png',
          alpha3Code: 'JPN',
          languages: [{ iso639_1: 'ja', iso639_2: 'jpn', name: 'Japanese', nativeName: '日本語' }],
          currencies: [{ code: 'JPY', name: 'Japanese yen', symbol: '¥' }]
        }
      ];
      
      setCountries(sampleData);
      setFilteredCountries(sampleData);
      alert('Using sample data (API connection failed). Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const filterCountries = () => {
    let filtered = countries;

    // Filter by region
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(country => country.region === selectedRegion);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.capital?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
  };

  const getBadgeClass = (region: string) => {
    const regionMap: { [key: string]: string } = {
      'Africa': styles.badgeAfrica,
      'Americas': styles.badgeAmericas,
      'Asia': styles.badgeAsia,
      'Europe': styles.badgeEurope,
      'Oceania': styles.badgeOceania,
    };
    return `${styles.badge} ${regionMap[region] || ''}`;
  };

  const regions = ['all', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className={styles.loadingText}>Loading countries data...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>🌎 Explore Countries</h1>
        <p className={styles.subtitle}>
          Discover amazing destinations around the world. Data from REST Countries API.
        </p>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="🔍 Search by country or capital..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.regionSelect}
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          {regions.map(region => (
            <option key={region} value={region}>
              {region === 'all' ? 'All Regions' : region}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div className={styles.resultsInfo}>
        Found <strong>{filteredCountries.length}</strong> countries
      </div>

      {/* Countries Grid */}
      {filteredCountries.length === 0 ? (
        <div className={styles.emptyState}>
          No countries found. Try adjusting your filters.
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredCountries.map((country) => (
            <div key={country.alpha3Code} className={styles.card}>
              {/* Flag Image */}
              <img
                src={country.flag}
                alt={`Flag of ${country.name}`}
                className={styles.flagImage}
              />
              
              <div className={styles.cardBody}>
                {/* Country Name */}
                <h5 className={styles.countryName}>{country.name}</h5>

                {/* Info List */}
                <ul className={styles.infoList}>
                  {country.capital && (
                    <li className={styles.infoItem}>
                      <span className={styles.infoLabel}>Capital:</span> {country.capital}
                    </li>
                  )}
                  <li className={styles.infoItem}>
                    <span className={styles.infoLabel}>Region:</span> {country.region}
                    {country.subregion && ` (${country.subregion})`}
                  </li>
                  <li className={styles.infoItem}>
                    <span className={styles.infoLabel}>Population:</span> {country.population.toLocaleString()}
                  </li>
                  {country.languages && country.languages.length > 0 && (
                    <li className={styles.infoItem}>
                      <span className={styles.infoLabel}>Languages:</span> {country.languages.map(l => l.name).join(', ')}
                    </li>
                  )}
                  {country.currencies && country.currencies.length > 0 && (
                    <li className={styles.infoItem}>
                      <span className={styles.infoLabel}>Currency:</span>{' '}
                      {country.currencies.map(c => 
                        `${c.name} (${c.symbol})`
                      ).join(', ')}
                    </li>
                  )}
                </ul>
              </div>

              <div className={styles.cardFooter}>
                <span className={getBadgeClass(country.region)}>{country.region}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}