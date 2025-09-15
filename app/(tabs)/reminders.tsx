import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function Reminders() {
    const [permission, setPermission] = useState(false);
    const [time, setTime] = useState(new Date());

    // Request notification permission safely
    const requestPermission = async () => {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                setPermission(true);
                Alert.alert('✅ Notifications Enabled');
            } else {
                Alert.alert('❌ Permission Denied');
            }
        } catch (error) {
            console.log('Permission error:', error);
            Alert.alert('❌ Could not enable notifications');
        }
    };

    // Schedule daily notification
    const scheduleReminder = async () => {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: '🌞 Daily Reminder',
                    body: 'How are you feeling today? Log your mood!',
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.DAILY,
                    hour: time.getHours(),
                    minute: time.getMinutes(),
                },
            });

            Alert.alert(
                '✅ Reminder Set',
                `Notification will fire daily at ${time
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`
            );
        } catch (error) {
            console.log('Schedule error:', error);
            Alert.alert('❌ Could not schedule reminder');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔔 Daily Reminders</Text>
            <Text style={styles.subtitle}>
                Choose a time for your daily mental health check-in
            </Text>

            {!permission ? (
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Ionicons name="notifications-outline" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Enable Notifications</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.pickerWrapper}>
                    {/* Inline Time Picker */}
                    <DateTimePicker
                        value={time}
                        mode="time"
                        is24Hour={true}
                        display="spinner" // iOS spinner works better visually
                        textColor="#00796B" //
                        onChange={(event, selectedDate) => {
                            if (selectedDate) setTime(selectedDate);
                        }}
                        style={styles.picker}
                    />

                    {/* Selected time preview */}
                    <Text style={styles.selectedTime}>
                        Selected Time: {time.getHours().toString().padStart(2, '0')}:
                        {time.getMinutes().toString().padStart(2, '0')}
                    </Text>

                    <TouchableOpacity style={[styles.button, { marginTop: 16 }]} onPress={scheduleReminder}>
                        <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Set Reminder</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F7FA',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#00796B',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#004D40',
        textAlign: 'center',
        marginBottom: 24,
    },
    pickerWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    picker: {
        width: '100%',
    },
    selectedTime: {
        fontSize: 18,
        fontWeight: '600',
        color: '#00796B',
        marginTop: 12,
        textAlign: 'center',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#00796B',
        padding: 14,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 8,
    },
});
