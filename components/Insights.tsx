import React from 'react';
import { View, Text } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { styles } from '../styles/styles';

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

    return (
        <View style={styles.card}>
            <Text style={styles.h1}>Insights</Text>
            <View style={styles.rowSpace}>
                <Text style={styles.statLabel}>Avg Sleep</Text>
                <Text style={styles.statValue}>{avgSleep} h</Text>
            </View>
            <View style={styles.rowSpace}>
                <Text style={styles.statLabel}>Avg Activity</Text>
                <Text style={styles.statValue}>{avgActivity} min</Text>
            </View>
        </View>
    );
}
