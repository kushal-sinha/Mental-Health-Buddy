import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { styles } from '../styles/styles';

export default function JournalPreview({ openJournal }: { openJournal: () => void }) {
    const { state } = useApp();

    return (
        <View style={styles.card}>
            <Text style={styles.h1}>Journal</Text>
            {state.journals.length === 0 ? (
                <Text>No entries yet.</Text>
            ) : (
                <Text numberOfLines={2}>{state.journals[0].text}</Text>
            )}
            <TouchableOpacity style={[styles.primaryBtn, { marginTop: 12 }]} onPress={openJournal}>
                <Text style={styles.primaryBtnText}>Open Journal</Text>
            </TouchableOpacity>
        </View>
    );
}
