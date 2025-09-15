import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Breathing() {
    const [step, setStep] = useState("Ready?");
    const [running, setRunning] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (running) {
            const cycle = ["Inhale... 🌬️", "Hold...", "Exhale... 💨"];
            let i = 0;

            // start breathing animation
            animateBreathing("inhale");

            timer = setInterval(() => {
                setStep(cycle[i]);

                if (cycle[i].startsWith("Inhale")) {
                    animateBreathing("inhale");
                } else if (cycle[i].startsWith("Exhale")) {
                    animateBreathing("exhale");
                }

                i = (i + 1) % cycle.length;
            }, 4000);
        }
        return () => clearInterval(timer);
    }, [running]);

    const animateBreathing = (phase: "inhale" | "exhale") => {
        Animated.timing(scaleAnim, {
            toValue: phase === "inhale" ? 1.5 : 1,
            duration: 4000,
            useNativeDriver: true,
        }).start();
    };

    return (
        <LinearGradient
            colors={["#89f7fe", "#66a6ff"]}
            style={styles.container}
        >
            <Text style={styles.stepText}>{step}</Text>

            <Animated.View
                style={[
                    styles.circle,
                    { transform: [{ scale: scaleAnim }] },
                ]}
            />

            <TouchableOpacity
                style={[styles.button, running && styles.stopButton]}
                onPress={() => setRunning(!running)}
            >
                <Text style={styles.buttonText}>
                    {running ? "Stop" : "Start Breathing"}
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    stepText: {
        fontSize: 28,
        color: "white",
        marginBottom: 40,
        fontWeight: "600",
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "rgba(255,255,255,0.5)",
        marginBottom: 50,
    },
    button: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: "#4facfe",
        borderRadius: 30,
    },
    stopButton: {
        backgroundColor: "#ff6b6b",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
});
