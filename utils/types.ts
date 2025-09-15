export type ID = string;

export type MoodEntry = {
    id: ID;
    date: string;
    mood: 'terrible' | 'bad' | 'neutral' | 'good' | 'great';
    note?: string;
};

export type JournalEntry = {
    id: ID;
    date: string;
    text: string;
};

export type SleepEntry = {
    id: ID;
    date: string;
    hours: number;
    quality?: number;
};

export type ActivityEntry = {
    id: ID;
    date: string;
    minutes: number;
    type?: string;
};

export type AppState = {
    moods: MoodEntry[];
    journals: JournalEntry[];
    sleeps: SleepEntry[];
    activities: ActivityEntry[];
};
