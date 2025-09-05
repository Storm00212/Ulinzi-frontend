import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Shield } from './Icons';

const LanguageSelectionScreen = ({ onSelect }) => {
  return (
    <View style={styles.container}>
      <Shield width={96} height={96} color="#4A41C3" />
      <Text style={styles.title}>Choose Your Language</Text>
      <Text style={styles.subtitle}>Chagua Lugha Yako</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => onSelect('en')}
          style={[styles.button, styles.primaryButton]}
        >
          <Text style={styles.primaryButtonText}>Continue in English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect('sw')}
          style={[styles.button, styles.secondaryButton]}
        >
          <Text style={styles.secondaryButtonText}>Endelea kwa Kiswahili</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
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
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  secondaryButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LanguageSelectionScreen;
