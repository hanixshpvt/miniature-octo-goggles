
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, Service, Insight, QuizResult, UserLocation } from './types';
import { Activity, Database, Lock, GitMerge } from 'lucide-react';

const initialServices: Service[] = [
  { 
    id: 1,
    title: 'Ingest Recalibration', 
    label: 'Protocol 01', 
    img: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=1200', 
    desc: 'Regional intent recapture via bypass node syncing.',
    Icon: Database,
    tooltip: 'Analyzes and redirects lost patient traffic.'
  },
  { 
    id: 2,
    title: 'Triage Ingestion', 
    label: 'Protocol 02', 
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200', 
    desc: 'HIPAA-compliant triage forcing surgical calendar stability.',
    Icon: Activity,
    tooltip: 'Standardized speed-to-lead medical intake protocols.'
  },
  { 
    id: 3,
    title: 'Margin Stabilization', 
    label: 'Protocol 03', 
    img: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=1200', 
    desc: 'Algorithmic gap closure for verified appointment outcomes.',
    Icon: GitMerge,
    tooltip: 'Profit margin logic to prevent revenue leakage.'
  },
  { 
    id: 4,
    title: 'Exclusivity Partners', 
    label: 'Protocol 04', 
    img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200', 
    desc: 'Exclusive regional authority through category-locked hubs.',
    Icon: Lock,
    tooltip: 'Geographically fenced competitor lockout.'
  }
];

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [marketInsight, setMarketInsight] = useState<Insight | null>(null);
  const [insightTopic, setInsightTopic] = useState<string>('Regional medspa surgical demand shifts 2025');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const deleteService = (id: number) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Attempt to identify high-value regional context for the user
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Using a lightweight IP-API to mock authoritative geolocation without intrusive permission popups immediately
        // In production, we would use navigator.geolocation for precise coordinates
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.city) {
          setUserLocation({
            city: data.city.toUpperCase(),
            region: data.region_code,
            country: data.country_code
          });
        }
      } catch (e) {
        console.warn('Geolocation sync node failed - defaulting to National view.');
      }
    };
    fetchLocation();
  }, []);

  return (
    <AppContext.Provider value={{ 
      services, 
      deleteService, 
      marketInsight, 
      setMarketInsight,
      insightTopic,
      setInsightTopic,
      quizResult,
      setQuizResult,
      userLocation
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
};
