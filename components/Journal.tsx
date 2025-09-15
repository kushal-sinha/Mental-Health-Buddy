import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { styles } from '../styles/styles';

export default function Journal() {
    const { state, addJournal } = useApp();
    const [text, setText] = useState('');

    return (
        <View>
            <Text style={styles.h1}>Daily Journal</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                multiline
                placeholder="Write about your day..."
                value={text}
                onChangeText={setText}
            />

            <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => {
                    if (text.trim()) {
                        addJournal({ text });
                        setText('');
                    }
                }}
            >
                <Text style={styles.primaryBtnText}>Save Journal</Text>
            </TouchableOpacity>

            <Text style={[styles.h1, { marginTop: 20 }]}>Recent Entries</Text>
            {state.journals.slice(0, 3).map((j) => (
                <View key={j.id} style={styles.card}>
                    <Text style={{ fontWeight: '600' }}>{j.date}</Text>
                    <Text>{j.text}</Text>
                </View>
            ))}
        </View>
    );
}
