import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft } from './Icons';

const Section = ({ title, children }) => (
  <>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.paragraph}>{children}</Text>
  </>
);

const TermsScreen = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft width={24} height={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Terms & Conditions</Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.lastUpdated}>Last updated: [Date]</Text>
        
        <Text style={styles.paragraph}>
          Welcome to Ulinzi. These terms and conditions outline the rules and regulations for the use of Ulinzi's Application.
        </Text>

        <Section title="1. Acceptance of Terms">
          By accessing this app, we assume you accept these terms and conditions. Do not continue to use Ulinzi if you do not agree to all of the terms and conditions stated on this page.
        </Section>

        <Section title="2. License to Use">
          Unless otherwise stated, Ulinzi and/or its licensors own the intellectual property rights for all material on Ulinzi. All intellectual property rights are reserved. You may access this from Ulinzi for your own personal use subjected to restrictions set in these terms and conditions.
        </Section>
        
        <Section title="3. User Responsibilities">
            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
        </Section>
        
        <Section title="4. Emergency Services">
            Ulinzi is a tool to assist in emergency situations but is not a replacement for contacting emergency services directly (e.g., dialing 911, 999, 112). We do not guarantee that your emergency contacts will receive or respond to any alert.
        </Section>

        <Section title="5. Technology and Third-Party Services">
            Ulinzi relies on robust third-party services to deliver its core safety features. By using the app, you acknowledge the use of these services:
            {'\n\n'}
            <Text style={styles.bold}>Maps & Location:</Text> We use the Google Maps API to accurately determine and share your GPS location during an emergency.
            {'\n\n'}
            <Text style={styles.bold}>WhatsApp Notifications:</Text> For users with a data connection, emergency alerts may also be sent via the WhatsApp API for fast, free, and reliable delivery.
            {'\n\n'}
            <Text style={styles.bold}>Push Notifications:</Text> Emergency alerts are sent as push notifications via Firebase Cloud Messaging for immediate delivery when an internet connection is available.
            {'\n\n'}
            <Text style={styles.bold}>SMS & Calls Fallback:</Text> To ensure maximum reliability, if a push notification cannot be sent, the app will automatically fall back to sending an SMS alert using industry-leading providers like Twilio or Africa’s Talking.
        </Section>

        <Section title="6. Disclaimer">
          The materials on Ulinzi's app are provided on an 'as is' basis. Ulinzi makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </Section>
        
        <Text style={[styles.paragraph, { paddingTop: 16 }]}>
            [... More sections on Privacy Policy, Limitation of Liability, Governing Law, etc. would be included here.]
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backButton: { padding: 8, marginLeft: -8, marginRight: 8 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A41C3' },
  contentContainer: { flex: 1 },
  lastUpdated: { fontWeight: '600', color: 'black', marginBottom: 16 },
  paragraph: { color: 'rgba(0,0,0,0.8)', fontSize: 14, lineHeight: 20 },
  sectionTitle: { fontWeight: 'bold', color: 'rgba(0,0,0,0.9)', paddingTop: 8, marginBottom: 8, fontSize: 16 },
  bold: { fontWeight: 'bold' },
});

export default TermsScreen;
