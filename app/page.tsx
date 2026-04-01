'use client';

import { useState } from 'react';
import SubscriptionCard from '@/components/SubscriptionCard';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [subs, setSubs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const analyzeEmail = async () => {
    if (!emailText.trim()) return;
    
    setLoading(true);
    setError(null);
    setSubs([]);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailText })
      });
      
      if (!response.ok) throw new Error('Failed to analyze');
      
      const data = await response.json();
      if (data.subscriptions) {
        setSubs(data.subscriptions);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 md:p-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          Cancellation Ninja 🥷
        </h1>
        <p className="text-lg text-gray-600">
          Find and cancel unwanted subscriptions instantly. Paste your email receipt below.
        </p>
      </header>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <textarea
          className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none mb-4 text-gray-800"
          placeholder="Paste the content of a subscription email or receipt here..."
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
        />
        <button 
          onClick={analyzeEmail}
          disabled={loading || !emailText.trim()}
          className="w-full bg-black text-white font-semibold px-6 py-4 rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex justify-center items-center"
        >
          {loading ? 'Scanning...' : 'Scan for Subscriptions'}
        </button>
        {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}
      </div>

      {subs.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Found Subscriptions</h2>
          {subs.map((sub, i) => (
            <SubscriptionCard key={i} sub={sub} />
          ))}
        </div>
      )}
    </main>
  );
}
