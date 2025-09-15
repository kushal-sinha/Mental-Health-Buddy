import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { styles } from '../styles/styles';
import { emojiForMood } from '../utils/emojiForMood';

const MOODS = ['terrible', 'bad', 'neutral', 'good', 'great'] as const;

export default function MoodTracker() {
    const { state, addMood } = useApp();
    const [selected, setSelected] = useState<typeof MOODS[number] | null>(null);
    const [note, setNote] = useState('');

    return (
        <View>
            <Text style={styles.h1}>How do you feel today?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 }}>
                {MOODS.map((m) => (
                    <TouchableOpacity
                        key={m}
                        style={[styles.moodBtn, selected === m && styles.moodBtnActive]}
                        onPress={() => setSelected(m)}
                    >
                        <Text style={styles.moodText}>{emojiForMood(m)}</Text>
                        <Text style={styles.moodLabel}>{m}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TextInput
                style={styles.input}
                placeholder="Add a note..."
                value={note}
                onChangeText={setNote}
            />

            <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => {
                    if (selected) {
                        addMood({ mood: selected, note });
                        setSelected(null);
                        setNote('');
                    }
                }}
            >
                <Text style={styles.primaryBtnText}>Save Mood</Text>
            </TouchableOpacity>

            <Text style={[styles.h1, { marginTop: 20 }]}>Recent Moods</Text>
            {state.moods.slice(0, 5).map((m) => (
                <View key={m.id} style={styles.listItem}>
                    <Text style={{ fontSize: 18, marginRight: 8 }}>{emojiForMood(m.mood)}</Text>
                    <Text>{m.date} — {m.mood}</Text>
                </View>
            ))}
        </View>
    );
}
