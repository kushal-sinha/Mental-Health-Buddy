import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function Gratitude() {
    const [entry, setEntry] = useState("");
    const [list, setList] = useState<string[]>([]);

    const addEntry = () => {
        if (entry.trim()) {
            setList([entry, ...list]);
            setEntry("");
        }
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, marginBottom: 12 }}>Gratitude Log 🙏</Text>
            <TextInput
                placeholder="Something positive today..."
                value={entry}
                onChangeText={setEntry}
                style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
            />
            <Button title="Add" onPress={addEntry} />
            <FlatList
                data={list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={{ padding: 8, fontSize: 16 }}>• {item}</Text>
                )}
            />
        </View>
    );
}
