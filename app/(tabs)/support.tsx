import React from 'react';
import { View, Text, Linking, Button } from 'react-native';

export default function Support() {
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, marginBottom: 12 }}>Crisis Support 🚨</Text>
            <Text style={{ marginBottom: 8 }}>
                If you are in crisis, please reach out:
            </Text>

            <Button
                title="National Suicide Prevention Lifeline (US)"
                onPress={() => Linking.openURL("tel:988")}
            />
            <View style={{ height: 12 }} />
            <Button
                title="Samaritans (UK)"
                onPress={() => Linking.openURL("tel:116123")}
            />
            <View style={{ height: 12 }} />
            <Button
                title="Other international hotlines"
                onPress={() =>
                    Linking.openURL("https://findahelpline.com/")
                }
            />
        </View>
    );
}
