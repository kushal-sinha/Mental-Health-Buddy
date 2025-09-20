import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { emojiForMood } from '../utils/emojiForMood';
import { LinearGradient } from 'expo-linear-gradient';

const MOODS = ['terrible', 'bad', 'neutral', 'good', 'great'] as const;

export default function MoodTracker() {
    const { state, addMood } = useApp();
    const [selected, setSelected] = useState<typeof MOODS[number] | null>(null);
    const [note, setNote] = useState('');

    return (
        <LinearGradient colors={['#E0EAFC', '#CFDEF3']} style={styles.container}>
            <Text style={styles.title}>How do you feel today?</Text>

            {/* Horizontal scrollable mood cards */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.moodScroll}
            >
                {MOODS.map((m) => (
                    <TouchableOpacity
                        key={m}
                        style={[
                            styles.moodCard,
                            selected === m && styles.moodCardActive,
                        ]}
                        onPress={() => setSelected(m)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.moodEmoji}>{emojiForMood(m)}</Text>
                        <Text style={styles.moodLabel}>{m}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TextInput
                style={styles.noteInput}
                placeholder="Write a quick note..."
                placeholderTextColor="#666"
                value={note}
                onChangeText={setNote}
                multiline
            />

            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                    if (selected) {
                        addMood({ mood: selected, note });
                        setSelected(null);
                        setNote('');
                    }
                }}
                activeOpacity={0.9}
            >
                <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.saveGradient}>
                    <Text style={styles.saveText}>💾 Save Mood</Text>
                </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.recentTitle}>Recent Moods</Text>
            {state.moods.slice(0, 5).map((m) => (
                <View key={m.id} style={styles.moodItem}>
                    <Text style={styles.moodItemEmoji}>{emojiForMood(m.mood)}</Text>
                    <View>
                        <Text style={styles.moodItemText}>{m.mood}</Text>
                        <Text style={styles.moodItemDate}>{m.date}</Text>
                    </View>
                </View>
            ))}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    moodScroll: {
        paddingHorizontal: 6,
        gap: 12, // spacing between cards
    },
    moodCard: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 16,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        width: 80,
        marginHorizontal: 6,
    },
    moodCardActive: {
        backgroundColor: '#4facfe20',
        borderWidth: 2,
        borderColor: '#4facfe',
    },
    moodEmoji: {
        fontSize: 30,
        marginBottom: 6,
    },
    moodLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        textTransform: 'capitalize',
    },
    noteInput: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        fontSize: 14,
        color: '#333',
        elevation: 2,
        shadowOpacity: 0.05,
        minHeight: 60,
        marginVertical: 16,
    },
    saveButton: {
        alignItems: 'center',
        marginBottom: 24,
    },
    saveGradient: {
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    saveText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    recentTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 12,
        color: '#444',
    },
    moodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#ffffffcc',
        borderRadius: 12,
    },
    moodItemEmoji: {
        fontSize: 24,
        marginRight: 10,
    },
    moodItemText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    moodItemDate: {
        fontSize: 12,
        color: '#777',
    },
});
