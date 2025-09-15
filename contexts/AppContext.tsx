import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, MoodEntry, JournalEntry, SleepEntry, ActivityEntry } from '../utils/types';

const STORAGE_KEY = '@mental_assistant_state_v1';
const uid = () => Math.random().toString(36).slice(2, 9);
const todayISO = () => new Date().toISOString().slice(0, 10);

const defaultState: AppState = { moods: [], journals: [], sleeps: [], activities: [] };

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AppState>(defaultState);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(STORAGE_KEY);
                if (raw) setState(JSON.parse(raw));
            } catch (e) {
                console.warn('Failed to load state', e);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    const saveState = async (s: AppState) => {
        setState(s);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    };

    const addMood = async (m: Omit<MoodEntry, 'id' | 'date'> & { date?: string }) => {
        const entry: MoodEntry = { id: uid(), date: m.date ?? todayISO(), mood: m.mood, note: m.note };
        await saveState({ ...state, moods: [entry, ...state.moods] });
    };

    const addJournal = async (j: Omit<JournalEntry, 'id' | 'date'> & { date?: string }) => {
        const entry: JournalEntry = { id: uid(), date: j.date ?? todayISO(), text: j.text };
        await saveState({ ...state, journals: [entry, ...state.journals] });
    };

    const addSleep = async (sEntry: Omit<SleepEntry, 'id' | 'date'> & { date?: string }) => {
        const entry: SleepEntry = { id: uid(), date: sEntry.date ?? todayISO(), hours: sEntry.hours, quality: sEntry.quality };
        await saveState({ ...state, sleeps: [entry, ...state.sleeps] });
    };

    const addActivity = async (a: Omit<ActivityEntry, 'id' | 'date'> & { date?: string }) => {
        const entry: ActivityEntry = { id: uid(), date: a.date ?? todayISO(), minutes: a.minutes, type: a.type };
        await saveState({ ...state, activities: [entry, ...state.activities] });
    };

    const context = useMemo(
        () => ({ state, saveState, addMood, addJournal, addSleep, addActivity }),
        [state]
    );

    if (!loaded) return null;

    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used inside AppProvider');
    return ctx;
}
