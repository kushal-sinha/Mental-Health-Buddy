import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

type Tab = 'Home' | 'Mood' | 'Journal' | 'Sleep' | 'Activity' | 'Insights';

export default function TabBar({
    tab,
    setTab,
    tabs,
}: {
    tab: Tab;
    setTab: (t: Tab) => void;
    tabs: readonly Tab[];   // <-- readonly
}) {
    return (
        <View style={styles.tabbar}>
            {tabs.map((t) => (
                <TouchableOpacity
                    key={t}
                    onPress={() => setTab(t)}
                    style={[styles.tabItem, tab === t && styles.tabItemActive]}
                >
                    <Text>{t}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
