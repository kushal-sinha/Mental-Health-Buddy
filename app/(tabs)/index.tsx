import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ActivityTracker from '@/components/ActivityTracker';
import Insights from '@/components/Insights';
import Journal from '@/components/Journal';
import JournalPreview from '@/components/JournalPreview';
import MoodQuickAdd from '@/components/MoodQuickAdd';
import MoodTracker from '@/components/MoodTracker';
import SleepTracker from '@/components/SleepTracker';
import TabBar from '@/components/TabBar';
import { AppProvider } from '@/contexts/AppContext';
import Header from '@/components/Header';

const TABS = ['Home', 'Mood', 'Journal', 'Sleep', 'Activity', 'Insights'] as const;
type Tab = typeof TABS[number];

export default function App() {
  const [tab, setTab] = useState<Tab>('Home');

  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* <Header onHome={() => setTab('Home')} /> */}

          {tab === 'Home' && (
            <View style={styles.homeContainer}>

              {/* Mood Quick Add */}
              <View style={styles.sectionWrapper}>
                <MoodQuickAdd onOpen={() => setTab('Mood')} />
              </View>

              {/* Journal Preview */}
              <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>📓 Journal Preview</Text>
                <JournalPreview openJournal={() => setTab('Journal')} />
              </View>

              {/* Insights */}
              <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>💡 Insights</Text>
                <Insights />
              </View>
            </View>
          )}

          {tab === 'Mood' && <MoodTracker />}
          {tab === 'Journal' && <Journal />}
          {tab === 'Sleep' && <SleepTracker />}
          {tab === 'Activity' && <ActivityTracker />}
          {tab === 'Insights' && <Insights />}
        </ScrollView>

        <TabBar tab={tab} setTab={setTab} tabs={TABS} />
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  homeContainer: {
    flex: 1,
  },
  welcomeSection: {
    backgroundColor: '#4D96FF',
    padding: 24,
    borderRadius: 24,
    marginBottom: 24,
  },
  h1: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0f7fa',
  },
  sectionWrapper: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
});
