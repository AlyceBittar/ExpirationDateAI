import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const [foodItem, setItem] = useState('');
  const [location, setLocation] = useState('Refrigerator');
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    const response = await fetch('/api/expirationDate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ foodItem, location }),
    });
    const data = await response.json();
    setResult(data.result.replaceAll('\\n', '<br />'));
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>Expiration Date Generator</title>
        TODO: Change this to a food related favicon
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Expiration Date Generator 💡</h3>
        <form onSubmit={onSubmit}>
        <label>Food Item</label>
          <input
            type="text"
            name="food"
            placeholder="Enter the food items you wish to store"
            value={foodItem}
            onChange={(e) => setItem(e.target.value)}
          />

          <label>What location are you planning to store the item?</label>
          <select
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="pantry">Pantry</option>
            <option value="counter">Counter</option>
            <option value="refrigerator">Refrigerator</option>
            <option value="freezer">Freezer</option>
          </select>

          <input type="submit" value="Generate food exiration date and storage recommendation" />
        </form>
        {loading && (
          <div>
            <h3>Looking for the most accurate data...</h3>
            <img src="/loading.gif" className={styles.loading} />
          </div>
        )}
        <div
          className={styles.result}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}