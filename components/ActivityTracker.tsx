import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import { useApp } from '../contexts/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart, LineChart } from 'react-native-chart-kit';

export default function ActivityTracker() {
    const { state, addActivity } = useApp();
    const [minutes, setMinutes] = useState('');
    const [type, setType] = useState('');
    const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

    const recentActivities = state.activities.slice(-7);
    const labels = recentActivities.map((a) =>
        a.date.split('-').slice(1).join('/')
    ); // MM/DD
    const data = recentActivities.map((a) => a.minutes);

    const chartConfig = {
        backgroundColor: '#fff',
        backgroundGradientFrom: '#ff9a9e',
        backgroundGradientTo: '#fad0c4',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: { borderRadius: 16 },
        propsForDots: { r: '6', strokeWidth: '2', stroke: '#ff5e62' },
    };

    return (
        <LinearGradient colors={['#FAD0C4', '#FFD1FF']} style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <Text style={styles.title}>🏃‍♂️ Activity Tracker</Text>

                {/* Input Fields */}
                <TextInput
                    style={styles.input}
                    placeholder="Activity type (e.g. walk, yoga)"
                    placeholderTextColor="#666"
                    value={type}
                    onChangeText={setType}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Minutes"
                    placeholderTextColor="#666"
                    value={minutes}
                    onChangeText={setMinutes}
                    keyboardType="numeric"
                />

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        if (minutes) {
                            addActivity({ minutes: Number(minutes), type });
                            setMinutes('');
                            setType('');
                        }
                    }}
                    activeOpacity={0.85}
                >
                    <LinearGradient colors={['#ff9966', '#ff5e62']} style={styles.saveGradient}>
                        <Text style={styles.saveText}>💾 Save Activity</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Chart Type Toggle */}
                {recentActivities.length > 0 && (
                    <>
                        <View style={styles.chartToggleContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.chartToggleBtn,
                                    chartType === 'bar' && styles.chartToggleActive,
                                ]}
                                onPress={() => setChartType('bar')}
                            >
                                <Text style={styles.chartToggleText}>Bar Chart</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.chartToggleBtn,
                                    chartType === 'line' && styles.chartToggleActive,
                                ]}
                                onPress={() => setChartType('line')}
                            >
                                <Text style={styles.chartToggleText}>Line Chart</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.recentTitle}>📊 Last 7 Days</Text>
                        {chartType === 'bar' ? (
                            <BarChart
                                data={{ labels, datasets: [{ data }] }}
                                width={Dimensions.get('window').width - 32}
                                height={220}
                                yAxisSuffix="m"
                                fromZero
                                chartConfig={chartConfig}
                                style={{ marginVertical: 12, borderRadius: 16, alignSelf: 'center' }}
                            />
                        ) : (
                            <LineChart
                                data={{ labels, datasets: [{ data }] }}
                                width={Dimensions.get('window').width - 32}
                                height={220}
                                yAxisSuffix="m"
                                fromZero
                                chartConfig={chartConfig}
                                bezier
                                style={{ marginVertical: 12, borderRadius: 16, alignSelf: 'center' }}
                            />
                        )}
                    </>
                )}

                {/* Recent Activities */}
                <Text style={styles.recentTitle}>📌 Recent Activities</Text>
                {state.activities.slice(0, 5).map((a) => (
                    <View key={a.id} style={styles.card}>
                        <Text style={styles.cardDate}>{a.date}</Text>
                        <Text style={styles.cardText}>
                            {a.type || 'Activity'} — {a.minutes} min
                        </Text>
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
        borderRadius: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        fontSize: 15,
        color: '#333',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 16,
    },
    saveButton: {
        alignItems: 'center',
        marginBottom: 16,
    },
    saveGradient: {
        paddingVertical: 14,
        paddingHorizontal: 50,
        borderRadius: 30,
    },
    saveText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    chartToggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 8,
    },
    chartToggleBtn: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 5,
        elevation: 2,
    },
    chartToggleActive: {
        backgroundColor: '#ff7e5f',
    },
    chartToggleText: {
        fontWeight: '700',
        color: '#333',
    },
    recentTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
        marginTop: 10,
        color: '#444',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    cardDate: {
        fontSize: 12,
        fontWeight: '600',
        color: '#777',
        marginBottom: 6,
    },
    cardText: {
        fontSize: 14,
        color: '#333',
    },
});
