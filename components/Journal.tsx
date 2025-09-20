import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Journal({ onViewAll }: { onViewAll?: () => void }) {
    const { state, addJournal } = useApp();
    const [text, setText] = useState('');

    return (
        <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <Text style={styles.title}>📖 Daily Journal</Text>

                {/* Journal Input */}
                <TextInput
                    style={styles.input}
                    multiline
                    placeholder="✨ Write about your day..."
                    placeholderTextColor="#666"
                    value={text}
                    onChangeText={setText}
                />

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        if (text.trim()) {
                            addJournal({ text });
                            setText('');
                        }
                    }}
                    activeOpacity={0.85}
                >
                    <LinearGradient
                        colors={['#4facfe', '#00f2fe']}
                        style={styles.saveGradient}
                    >
                        <Text style={styles.saveText}>💾 Save Journal</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Recent Entries */}
                <Text style={styles.recentTitle}>📝 Recent Entries</Text>
                {state.journals.slice(0, 3).map((j) => (
                    <View key={j.id} style={styles.card}>
                        <Text style={styles.cardDate}>{j.date}</Text>
                        <Text style={styles.cardText}>{j.text}</Text>
                    </View>
                ))}

                {/* View All Journals */}
                {state.journals.length > 3 && (
                    <TouchableOpacity
                        style={styles.viewAllBtn}
                        onPress={onViewAll}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.viewAllText}>📚 View All Journals</Text>
                    </TouchableOpacity>
                )}
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
        minHeight: 120,
        marginBottom: 16,
        textAlignVertical: 'top',
    },
    saveButton: {
        alignItems: 'center',
        marginBottom: 28,
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
    recentTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
        color: '#444',
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
    viewAllBtn: {
        alignItems: 'center',
        marginTop: 12,
        paddingVertical: 10,
    },
    viewAllText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#4facfe',
    },
});
