import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Header({ onHome }: { onHome: () => void }) {
    return (
        <LinearGradient
            colors={['#6BCB77', '#4D96FF']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.headerContainer}
        >
            <TouchableOpacity onPress={onHome} style={styles.titleWrapper} activeOpacity={0.8}>
                <Ionicons name="body" size={28} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.headerTitle}>MindCare</Text>
            </TouchableOpacity>

            <Text style={styles.headerSub}>Your mental health companion</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 8,
        alignItems: 'center',
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    headerSub: {
        fontSize: 14,
        color: '#e0f7fa',
        fontWeight: '500',
    },
});
