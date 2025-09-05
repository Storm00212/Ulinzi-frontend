import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Shield } from './Icons';

const WelcomeScreen = ({ setAuthScreen, language }) => {
  const content = {
    en: {
      subtitle: 'Your Digital Bodyguard',
      createAccount: 'Create Account',
      signIn: 'Sign In',
    },
    sw: {
      subtitle: 'Mlinzi Wako wa Kidijitali',
      createAccount: 'Fungua Akaunti',
      signIn: 'Ingia',
    }
  };
  
  const t = content[language];

  return (
    <View style={styles.container}>
      <Shield width={96} height={96} color="#4A41C3" />
      <Text style={styles.title}>ULINZI</Text>
      <Text style={styles.subtitle}>{t.subtitle}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setAuthScreen('signup')}
          style={[styles.button, styles.primaryButton]}
        >
          <Text style={styles.primaryButtonText}>{t.createAccount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAuthScreen('signin')}
          style={[styles.button, styles.secondaryButton]}
        >
          <Text style={styles.secondaryButtonText}>{t.signIn}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 16,
  },
  subtitle: {
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 64,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#4A41C3',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  secondaryButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WelcomeScreen;
