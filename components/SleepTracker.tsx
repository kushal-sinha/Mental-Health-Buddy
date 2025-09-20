import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

export default function SleepTracker() {
    const { state, addSleep } = useApp();
    const [hours, setHours] = useState('');
    const [quality, setQuality] = useState('');

    // Prepare data for chart (last 5 sleeps)
    const recentSleeps = state.sleeps.slice(0, 5).reverse();
    const chartData = {
        labels: recentSleeps.map(s => s.date.split(',')[0]), // short date
        datasets: [
            {
                data: recentSleeps.map(s => s.hours),
                strokeWidth: 2,
            },
        ],
    };

    return (
        <LinearGradient colors={['#a18cd1', '#fbc2eb']} style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <Text style={styles.title}>😴 Sleep Tracker</Text>

                {/* Inputs */}
                <TextInput
                    style={styles.input}
                    placeholder="Hours slept"
                    placeholderTextColor="#666"
                    value={hours}
                    onChangeText={setHours}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quality (1-5)"
                    placeholderTextColor="#666"
                    value={quality}
                    onChangeText={setQuality}
                    keyboardType="numeric"
                />

                {/* Save Button */}
                <TouchableOpacity
                    onPress={() => {
                        if (hours) {
                            addSleep({ hours: Number(hours), quality: Number(quality) || undefined });
                            setHours('');
                            setQuality('');
                        }
                    }}
                    activeOpacity={0.85}
                >
                    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.saveBtn}>
                        <Text style={styles.saveText}>💾 Save Sleep</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Chart Section */}
                {recentSleeps.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>📊 Sleep Hours (last {recentSleeps.length} days)</Text>
                        <LineChart
                            data={chartData}
                            width={Dimensions.get('window').width - 32}
                            height={220}
                            chartConfig={{
                                backgroundGradientFrom: '#fff',
                                backgroundGradientTo: '#fff',
                                decimalPlaces: 1,
                                color: (opacity = 1) => `rgba(79, 172, 254, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                propsForDots: {
                                    r: '6',
                                    strokeWidth: '2',
                                    stroke: '#00f2fe',
                                },
                            }}
                            bezier
                            style={{
                                borderRadius: 16,
                                marginVertical: 8,
                            }}
                        />
                    </View>
                )}

                {/* Recent Logs */}
                <Text style={styles.sectionTitle}>📝 Recent Sleep Logs</Text>
                {recentSleeps.reverse().map((s) => (
                    <View key={s.id} style={styles.card}>
                        <Ionicons name="moon" size={20} color="#4facfe" style={{ marginRight: 8 }} />
                        <View>
                            <Text style={styles.cardText}>{s.date}</Text>
                            <Text style={styles.cardSub}>
                                {s.hours}h — Quality: {s.quality ?? '-'}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 14,
        fontSize: 15,
        marginBottom: 12,
        color: '#333',
        elevation: 2,
    },
    saveBtn: {
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
        marginVertical: 20,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
    },
    saveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        marginTop: 12,
        marginBottom: 8,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 2,
    },
    cardText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    cardSub: {
        fontSize: 13,
        color: '#666',
    },
});
