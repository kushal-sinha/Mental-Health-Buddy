import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

type Tab = 'Home' | 'Mood' | 'Journal' | 'Sleep' | 'Activity' | 'Insights';

const { width } = Dimensions.get('window');

// Premium icon mapping for each tab
const tabIcons = {
    Home: '🏠',
    Mood: '💖',
    Journal: '📓',
    Sleep: '😴',
    Activity: '🏃‍♂️',
    Insights: '💡',
};

export default function TabBar({
    tab,
    setTab,
    tabs,
}: {
    tab: Tab;
    setTab: (t: Tab) => void;
    tabs: readonly Tab[];
}) {
    return (
        <View style={styles.tabBarContainer}>
            <BlurView intensity={95} tint="light" style={styles.blurBackground}>
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
                    style={styles.gradientBackground}
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}
                        style={styles.scrollView}
                        bounces={true}
                        decelerationRate="fast"
                    >
                        <View style={styles.tabbar}>
                            {tabs.map((t) => {
                                const isActive = tab === t;
                                return (
                                    <TouchableOpacity
                                        key={t}
                                        onPress={() => setTab(t)}
                                        style={[
                                            styles.tabItem,
                                            isActive && styles.tabItemActive
                                        ]}
                                        activeOpacity={0.7}
                                    >
                                        {isActive && (
                                            <LinearGradient
                                                colors={['#667eea', '#764ba2']}
                                                style={styles.activeBackground}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                            />
                                        )}

                                        <View style={styles.tabContent}>
                                            <Text style={[
                                                styles.tabIcon,
                                                isActive && styles.tabIconActive
                                            ]}>
                                                {tabIcons[t]}
                                            </Text>
                                            <Text style={[
                                                styles.tabText,
                                                isActive && styles.tabTextActive
                                            ]}>
                                                {t}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </ScrollView>
                </LinearGradient>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        height: 85,
        borderRadius: 28,
        overflow: 'hidden',
        shadowColor: '#667eea',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 12,
    },
    blurBackground: {
        flex: 1,
        borderRadius: 28,
    },
    gradientBackground: {
        flex: 1,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    scrollView: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        minWidth: '100%',
    },
    tabbar: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: width - 56, // Account for margins and padding
    },
    tabItem: {
        minWidth: 85,
        height: 68,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        position: 'relative',
        overflow: 'hidden',
        paddingHorizontal: 8,
    },
    tabItemActive: {
        transform: [{ scale: 1.05 }],
        minWidth: 90,
    },
    activeBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 22,
        opacity: 0.9,
    },
    tabContent: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        paddingHorizontal: 4,
    },
    tabIcon: {
        fontSize: 22,
        marginBottom: 4,
        opacity: 0.6,
        transform: [{ scale: 1 }],
    },
    tabIconActive: {
        fontSize: 24,
        opacity: 1,
        transform: [{ scale: 1.1 }],
    },
    tabText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8E8E93',
        letterSpacing: 0.3,
        textAlign: 'center',
        lineHeight: 14,
        maxWidth: 70,
    },
    tabTextActive: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
        maxWidth: 75,
    },
});