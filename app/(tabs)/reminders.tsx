import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

// Premium reminder messages
const reminderMessages = [
    {
        title: '🌸 Mindful Moment',
        body: 'Take a breath and check in with yourself. How are you feeling right now?',
        emoji: '🌸'
    },
    {
        title: '✨ Self-Care Check',
        body: 'Your mental health matters. How has your day been treating you?',
        emoji: '✨'
    },
    {
        title: '🌙 Evening Reflection',
        body: 'As the day winds down, take a moment to reflect on your emotions.',
        emoji: '🌙'
    },
    {
        title: '🌅 Morning Intention',
        body: 'Good morning! Set your emotional intention for the day ahead.',
        emoji: '🌅'
    },
    {
        title: '💜 Gentle Reminder',
        body: 'You\'re doing great! Time for a quick emotional check-in.',
        emoji: '💜'
    }
];

export default function Reminders() {
    const [permission, setPermission] = useState(false);
    const [time, setTime] = useState(new Date());
    const [selectedMessage, setSelectedMessage] = useState(reminderMessages[0]);

    // Request notification permission safely
    const requestPermission = async () => {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                setPermission(true);
                Alert.alert(
                    '🎉 Perfect!',
                    'Notifications are now enabled. You\'re all set for mindful reminders!',
                    [{ text: 'Continue', style: 'default' }]
                );
            } else {
                Alert.alert(
                    '🔔 Notifications Needed',
                    'To get the most out of your wellness journey, please enable notifications in your device settings.',
                    [{ text: 'Got it', style: 'default' }]
                );
            }
        } catch (error) {
            console.log('Permission error:', error);
            Alert.alert(
                '⚠️ Oops!',
                'We couldn\'t enable notifications right now. Please try again or check your device settings.'
            );
        }
    };

    // Schedule daily notification
    const scheduleReminder = async () => {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: selectedMessage.title,
                    body: selectedMessage.body,
                    sound: 'default',
                    badge: 1,
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.DAILY,
                    hour: time.getHours(),
                    minute: time.getMinutes(),
                },
            });

            const timeString = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;

            Alert.alert(
                '🌟 Reminder Created!',
                `Your daily mindfulness reminder is set for ${timeString}. We'll gently nudge you to check in with yourself every day.`,
                [{ text: 'Perfect!', style: 'default' }]
            );
        } catch (error) {
            console.log('Schedule error:', error);
            Alert.alert(
                '😅 Something went wrong',
                'We couldn\'t schedule your reminder right now. Please try again in a moment.'
            );
        }
    };

    const getTimeBasedMessage = () => {
        const hour = time.getHours();
        if (hour >= 5 && hour < 12) return reminderMessages[3]; // Morning
        if (hour >= 12 && hour < 17) return reminderMessages[0]; // Afternoon
        if (hour >= 17 && hour < 21) return reminderMessages[1]; // Evening
        return reminderMessages[2]; // Night
    };

    React.useEffect(() => {
        setSelectedMessage(getTimeBasedMessage());
    }, [time]);

    return (
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={true}
            >
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.headerEmoji}>🔔</Text>
                    <Text style={styles.title}>Daily Mindfulness</Text>
                    <Text style={styles.subtitle}>
                        Create gentle reminders to nurture your mental well-being throughout the day
                    </Text>
                </View>

                {!permission ? (
                    /* Permission Card */
                    <BlurView intensity={20} tint="light" style={styles.permissionCard}>
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
                            style={styles.cardGradient}
                        >
                            <View style={styles.permissionContent}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="notifications-outline" size={48} color="#667eea" />
                                </View>
                                <Text style={styles.cardTitle}>Enable Gentle Reminders</Text>
                                <Text style={styles.cardSubtitle}>
                                    Get thoughtful daily check-ins to support your emotional wellness journey
                                </Text>

                                <TouchableOpacity style={styles.primaryButton} onPress={requestPermission}>
                                    <LinearGradient
                                        colors={['#667eea', '#764ba2']}
                                        style={styles.buttonGradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Ionicons name="heart-outline" size={20} color="#fff" />
                                        <Text style={styles.primaryButtonText}>Enable Notifications</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </BlurView>
                ) : (
                    /* Time Picker Card */
                    <BlurView intensity={20} tint="light" style={styles.timeCard}>
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.8)']}
                            style={styles.cardGradient}
                        >
                            <View style={styles.timeContent}>
                                <Text style={styles.cardTitle}>Choose Your Reminder Time</Text>

                                {/* Time Picker */}
                                <View style={styles.pickerContainer}>
                                    <DateTimePicker
                                        value={time}
                                        mode="time"
                                        is24Hour={false}
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        textColor="#667eea"
                                        onChange={(event, selectedDate) => {
                                            if (selectedDate) setTime(selectedDate);
                                        }}
                                        style={styles.picker}
                                    />
                                </View>

                                {/* Selected Time Display */}
                                <View style={styles.timeDisplay}>
                                    <Text style={styles.timeLabel}>Daily reminder at</Text>
                                    <View style={styles.timeChip}>
                                        <Text style={styles.timeText}>
                                            {time.toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </Text>
                                    </View>
                                </View>

                                {/* Message Preview */}
                                <View style={styles.messagePreview}>
                                    <Text style={styles.previewLabel}>Preview message:</Text>
                                    <View style={styles.messageCard}>
                                        <Text style={styles.messageEmoji}>{selectedMessage.emoji}</Text>
                                        <View style={styles.messageText}>
                                            <Text style={styles.messageTitle}>{selectedMessage.title}</Text>
                                            <Text style={styles.messageBody}>{selectedMessage.body}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Set Reminder Button */}
                                <TouchableOpacity style={styles.primaryButton} onPress={scheduleReminder}>
                                    <LinearGradient
                                        colors={['#667eea', '#764ba2']}
                                        style={styles.buttonGradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                                        <Text style={styles.primaryButtonText}>Set Daily Reminder</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </BlurView>
                )}
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 60,
        paddingBottom: 120, // Extra space for scrolling past bottom
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    headerEmoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    permissionCard: {
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 20,
    },
    timeCard: {
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 20,
    },
    cardGradient: {
        padding: 24,
    },
    permissionContent: {
        alignItems: 'center',
    },
    timeContent: {
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    cardSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    pickerContainer: {
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        width: '100%',
    },
    picker: {
        width: '100%',
    },
    timeDisplay: {
        alignItems: 'center',
        marginBottom: 24,
    },
    timeLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    timeChip: {
        backgroundColor: '#667eea',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    timeText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    messagePreview: {
        width: '100%',
        marginBottom: 24,
    },
    previewLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    messageCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
    },
    messageEmoji: {
        fontSize: 24,
        marginRight: 12,
    },
    messageText: {
        flex: 1,
    },
    messageTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    messageBody: {
        fontSize: 14,
        color: '#666',
        lineHeight: 18,
    },
    primaryButton: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});