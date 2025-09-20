import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Insights() {
    const { state } = useApp();

    const avgSleep =
        state.sleeps.length > 0
            ? (state.sleeps.reduce((s, x) => s + x.hours, 0) / state.sleeps.length).toFixed(1)
            : 'N/A';

    const avgActivity =
        state.activities.length > 0
            ? (state.activities.reduce((s, x) => s + x.minutes, 0) / state.activities.length).toFixed(0)
            : 'N/A';

    const moodCounts: Record<string, number> = { terrible: 0, bad: 0, neutral: 0, good: 0, great: 0 };
    state.moods.slice(-7).forEach((m) => {
        moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
    });

    const moodColors: Record<string, string> = {
        terrible: '#FF6B6B',
        bad: '#FFA36C',
        neutral: '#FFD93D',
        good: '#6BCB77',
        great: '#4D96FF',
    };

    const moodEmojis: Record<string, string> = {
        terrible: '😫',
        bad: '😕',
        neutral: '😐',
        good: '🙂',
        great: '😄',
    };

    const maxMoodCount = Math.max(...Object.values(moodCounts), 1);

    // Animated values for each mood
    const animatedValues = useRef(
        Object.keys(moodCounts).reduce((acc: Record<string, Animated.Value>, m) => {
            acc[m] = new Animated.Value(0);
            return acc;
        }, {})
    ).current;

    useEffect(() => {
        // Animate all bars on mount
        const animations = Object.keys(animatedValues).map((m) =>
            Animated.timing(animatedValues[m], {
                toValue: (moodCounts[m] / maxMoodCount) * 120 + 20, // same proportional height
                duration: 800,
                useNativeDriver: false,
            })
        );
        Animated.stagger(100, animations).start();
    }, [animatedValues, moodCounts]);

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.container}>
                <Text style={styles.title}>🔍 Insights</Text>

                {/* Sleep Card */}
                <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.statCard}>
                    <View style={styles.statRow}>
                        <FontAwesome5 name="bed" size={28} color="#fff" />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.statLabel}>Average Sleep</Text>
                            <Text style={styles.statValue}>{avgSleep} h</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Activity Card */}
                <LinearGradient colors={['#ff758c', '#ff7eb3']} style={styles.statCard}>
                    <View style={styles.statRow}>
                        <MaterialCommunityIcons name="run" size={28} color="#fff" />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.statLabel}>Average Activity</Text>
                            <Text style={styles.statValue}>{avgActivity} min</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Weekly Mood Trends */}
                <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.statCard}>
                    <Text style={[styles.statLabel, { marginBottom: 12, color: '#fff', fontSize: 18 }]}>
                        Weekly Mood Trends
                    </Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {Object.keys(moodCounts).map((m) => (
                            <View key={m} style={styles.moodBarContainer}>
                                <Text style={styles.emoji}>{moodEmojis[m]}</Text>
                                <Animated.View
                                    style={[
                                        styles.moodBar,
                                        {
                                            height: animatedValues[m],
                                            backgroundColor: moodColors[m],
                                        },
                                    ]}
                                />
                                <Text style={styles.moodLabel}>{m}</Text>
                                <Text style={styles.moodCount}>{moodCounts[m]}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </LinearGradient>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    statCard: {
        borderRadius: 20,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    statValue: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginTop: 4,
    },
    moodBarContainer: {
        alignItems: 'center',
        marginHorizontal: 12,
        justifyContent: 'flex-end',
    },
    moodBar: {
        width: 30,
        borderRadius: 12,
        marginBottom: 6,
    },
    moodLabel: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    moodCount: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
        marginTop: 2,
    },
    emoji: {
        fontSize: 22,
        marginBottom: 4,
    },
});
