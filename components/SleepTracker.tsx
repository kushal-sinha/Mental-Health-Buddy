import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { styles } from '../styles/styles';

export default function SleepTracker() {
    const { state, addSleep } = useApp();
    const [hours, setHours] = useState('');
    const [quality, setQuality] = useState('');

    return (
        <View>
            <Text style={styles.h1}>Sleep Tracker</Text>
            <TextInput
                style={styles.input}
                placeholder="Hours slept"
                value={hours}
                onChangeText={setHours}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Quality (1-5)"
                value={quality}
                onChangeText={setQuality}
                keyboardType="numeric"
            />

            <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => {
                    if (hours) {
                        addSleep({ hours: Number(hours), quality: Number(quality) || undefined });
                        setHours('');
                        setQuality('');
                    }
                }}
            >
                <Text style={styles.primaryBtnText}>Save Sleep</Text>
            </TouchableOpacity>

            <Text style={[styles.h1, { marginTop: 20 }]}>Recent Sleep Logs</Text>
            {state.sleeps.slice(0, 5).map((s) => (
                <View key={s.id} style={styles.listItem}>
                    <Text>{s.date} — {s.hours}h (Quality: {s.quality ?? '-'})</Text>
                </View>
            ))}
        </View>
    );
}
