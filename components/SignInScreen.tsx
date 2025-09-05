import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft } from './Icons';

const SignInScreen = ({ onSignInSuccess, setAuthScreen, onNavigateToTerms, language }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const content = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to access your dashboard.',
      emailPlaceholder: 'Email Address',
      passwordPlaceholder: 'Password',
      terms: 'By signing in, you agree to our',
      termsLink: 'Terms & Conditions',
      button: 'Sign In',
      footerText: "Don't have an account?",
      footerLink: 'Sign Up',
    },
    sw: {
      title: 'Karibu Tena',
      subtitle: 'Ingia ili ufikie dashibodi yako.',
      emailPlaceholder: 'Anwani ya Barua Pepe',
      passwordPlaceholder: 'Nenosiri',
      terms: 'Kwa kuingia, unakubali',
      termsLink: 'Sheria na Masharti',
      button: 'Ingia',
      footerText: 'Huna akaunti?',
      footerLink: 'Jisajili',
    }
  };
  const t = content[language];


  const handleSubmit = () => {
    if (email && password) {
      onSignInSuccess({ name: 'Ulinzi User', email });
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
      
      <Text style={styles.termsText}>
        {t.terms}{' '}
        <Text onPress={onNavigateToTerms} style={styles.termsLink}>
          {t.termsLink}
        </Text>
        .
      </Text>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button, styles.primaryButton]}
        >
          <Text style={styles.primaryButtonText}>{t.button}</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          {t.footerText}{' '}
          <Text onPress={() => setAuthScreen('signup')} style={styles.footerLink}>
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
  termsText: { fontSize: 12, color: 'rgba(0,0,0,0.5)', marginTop: 16 },
  termsLink: { textDecorationLine: 'underline', color: '#4A41C3' },
  footer: { marginTop: 'auto', paddingTop: 20 },
  button: { width: '100%', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  primaryButton: { backgroundColor: '#4A41C3' },
  primaryButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  footerText: { textAlign: 'center', fontSize: 14, color: '#6B7280', marginTop: 16 },
  footerLink: { fontWeight: '600', color: '#4A41C3' },
});

export default SignInScreen;
