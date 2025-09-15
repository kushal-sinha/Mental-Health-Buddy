import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { styles } from '../styles/styles';

export default function ActivityTracker() {
    const { state, addActivity } = useApp();
    const [minutes, setMinutes] = useState('');
    const [type, setType] = useState('');

    return (
        <View>
            <Text style={styles.h1}>Activity Tracker</Text>
            <TextInput
                style={styles.input}
                placeholder="Activity type (e.g. walk, yoga)"
                value={type}
                onChangeText={setType}
            />
            <TextInput
                style={styles.input}
                placeholder="Minutes"
                value={minutes}
                onChangeText={setMinutes}
                keyboardType="numeric"
            />

            <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => {
                    if (minutes) {
                        addActivity({ minutes: Number(minutes), type });
                        setMinutes('');
                        setType('');
                    }
                }}
            >
                <Text style={styles.primaryBtnText}>Save Activity</Text>
            </TouchableOpacity>

            <Text style={[styles.h1, { marginTop: 20 }]}>Recent Activities</Text>
            {state.activities.slice(0, 5).map((a) => (
                <View key={a.id} style={styles.listItem}>
                    <Text>{a.date} — {a.type ?? 'Activity'} ({a.minutes} min)</Text>
                </View>
            ))}
        </View>
    );
}
