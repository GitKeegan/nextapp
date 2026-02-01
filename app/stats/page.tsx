"use client";

import { useState, useEffect } from 'react';
import { LineChart, Line, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function StatsDisplay() {
  const [history, setHistory] = useState<{ time: string; cpu: number; ram: number; }[]>([]); // Array to store last 20 seconds
  const [stats, setStats] = useState({ cpu: 0, ram: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        
        setStats(data);

        // Add the new data to our history array
        setHistory(prev => {
          const newPoint = { 
            time: new Date().toLocaleTimeString().split(' ')[0], 
            cpu: parseFloat(data.cpu), 
            ram: parseFloat(data.ram) // Remember we mapped RAM to 'gpu' in server.js
          };
          
          const newHistory = [...prev, newPoint];
          if (newHistory.length > 20) return newHistory.slice(1); // Keep only 20 points
          return newHistory;
        });
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };

    const interval = setInterval(fetchStats, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stats-dashboard">
      <div className="current-stats">
        <p>CPU: {stats.cpu}% | RAM: {stats.ram}%</p>
      </div>

      {/* The Real-Time Graph */}
      <div style={{ width: '100%', height: 200, marginTop: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff41" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00ff41" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <YAxis domain={[0, 100]} hide />
            <Area 
              type="monotone" 
              dataKey="cpu" 
              stroke="#00ff41" 
              fillOpacity={1} 
              fill="url(#colorCpu)" 
              isAnimationActive={false} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
