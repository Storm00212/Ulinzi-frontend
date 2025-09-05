import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft } from './Icons';

const SignUpScreen = ({ onSignUpSuccess, setAuthScreen, onNavigateToTerms, language }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const content = {
    en: {
      title: 'Create Account',
      subtitle: 'Join Ulinzi to stay safe and protected.',
      namePlaceholder: 'Full Name',
      emailPlaceholder: 'Email Address',
      passwordPlaceholder: 'Password',
      agreeToTerms: 'I have read and agree to the',
      termsLink: 'Terms & Conditions',
      button: 'Sign Up',
      footerText: 'Already have an account?',
      footerLink: 'Sign In',
    },
    sw: {
      title: 'Fungua Akaunti',
      subtitle: 'Jiunge na Ulinzi ili uwe salama na ulindwe.',
      namePlaceholder: 'Jina Kamili',
      emailPlaceholder: 'Anwani ya Barua Pepe',
      passwordPlaceholder: 'Nenosiri',
      agreeToTerms: 'Nimesoma na ninakubali',
      termsLink: 'Sheria na Masharti',
      button: 'Jisajili',
      footerText: 'Tayari una akaunti?',
      footerLink: 'Ingia',
    }
  };
  const t = content[language];

  const handleSubmit = () => {
    if (name && email && password) {
      onSignUpSuccess({ name, email });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
         <TouchableOpacity onPress={() => setAuthScreen('welcome')} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{t.title}</Text>
      </View>
      <Text style={styles.subtitle}>{t.subtitle}</Text>

      <View style={styles.form}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={t.namePlaceholder}
          style={styles.input}
          placeholderTextColor="#6B7280"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={t.emailPlaceholder}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#6B7280"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={t.passwordPlaceholder}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#6B7280"
        />
      </View>

      <View style={styles.termsContainer}>
          <TouchableOpacity onPress={() => setAgreedToTerms(!agreedToTerms)} style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
            {agreedToTerms && <Text style={styles.checkboxTick}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.termsText}>
              {t.agreeToTerms}{' '}
              <Text onPress={onNavigateToTerms} style={styles.termsLink}>
                  {t.termsLink}
              </Text>
              .
          </Text>
      </View>
      
      <View style={styles.footer}>
          <TouchableOpacity
              onPress={handleSubmit}
              disabled={!agreedToTerms}
              style={[styles.button, styles.primaryButton, !agreedToTerms && styles.disabledButton]}
          >
              <Text style={styles.primaryButtonText}>{t.button}</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
              {t.footerText}{' '}
              <Text onPress={() => setAuthScreen('signin')} style={styles.footerLink}>
                  {t.footerLink}
              </Text>
          </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingTop: 32 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backButton: { padding: 8, marginLeft: -8, marginRight: 8 },
  title: { fontSize: 30, fontWeight: 'bold', color: 'black' },
  subtitle: { color: '#6B7280', marginBottom: 32, marginLeft: 44 },
  form: { gap: 16 },
  input: { width: '100%', backgroundColor: '#F3F4F6', color: 'black', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB' },
  termsContainer: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 16 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 4, marginRight: 8, marginTop: 2, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#4A41C3', borderColor: '#4A41C3' },
  checkboxTick: { color: 'white', fontWeight: 'bold' },
  termsText: { flex: 1, fontSize: 12, color: '#6B7280' },
  termsLink: { textDecorationLine: 'underline', color: '#4A41C3' },
  footer: { marginTop: 'auto', paddingTop: 20 },
  button: { width: '100%', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  primaryButton: { backgroundColor: '#4A41C3' },
  primaryButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  disabledButton: { backgroundColor: 'rgba(0,0,0,0.2)' },
  footerText: { textAlign: 'center', fontSize: 14, color: '#6B7280', marginTop: 16 },
  footerLink: { fontWeight: '600', color: '#4A41C3' },
});

export default SignUpScreen;
