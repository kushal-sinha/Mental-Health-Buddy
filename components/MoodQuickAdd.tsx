import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import { useApp } from '../contexts/AppContext';

const moods = [
    { mood: 'terrible', emoji: '😫', color: '#FF6B6B' },
    { mood: 'bad', emoji: '😕', color: '#FFA36C' },
    { mood: 'neutral', emoji: '😐', color: '#FFD93D' },
    { mood: 'good', emoji: '🙂', color: '#6BCB77' },
    { mood: 'great', emoji: '😄', color: '#4D96FF' },
] as const;

export default function MoodQuickAdd({ onOpen }: { onOpen: () => void }) {
    const { addMood } = useApp();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quick Mood Add</Text>

            {/* Horizontal ScrollView */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.moodRow}
            >
                {moods.map((m) => (
                    <MoodButton
                        key={m.mood}
                        emoji={m.emoji}
                        mood={m.mood}
                        color={m.color}
                        onPress={() => addMood({ mood: m.mood })}
                        onLongPress={onOpen}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

function MoodButton({
    emoji,
    mood,
    color,
    onPress,
    onLongPress,
}: {
    emoji: string;
    mood: string;
    color: string;
    onPress: () => void;
    onLongPress: () => void;
}) {
    const scale = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale }], marginHorizontal: 8 }}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.moodBtn, { backgroundColor: color }]}
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Text style={styles.emoji}>{emoji}</Text>
                <Text style={styles.moodText}>{mood}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
    },
    moodRow: {
        flexDirection: 'row',
        paddingHorizontal: 8,
    },
    moodBtn: {
        width: 70,
        height: 90,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5,
    },
    emoji: {
        fontSize: 28,
    },
    moodText: {
        fontSize: 12,
        marginTop: 4,
        color: '#fff',
        fontWeight: '600',
        textTransform: 'capitalize',
    },
});
