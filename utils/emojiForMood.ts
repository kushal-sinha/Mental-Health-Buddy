import { MoodEntry } from './types';

export function emojiForMood(m: MoodEntry['mood']) {
    switch (m) {
        case 'terrible': return '😫';
        case 'bad': return '😕';
        case 'neutral': return '😐';
        case 'good': return '🙂';
        case 'great': return '😄';
    }
}
