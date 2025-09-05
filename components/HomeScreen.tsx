import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated, Easing, Switch } from 'react-native';
import { ShieldAlert, ShieldCheck, Siren, User as UserIcon } from './Icons';

const HomeScreen = ({ isGuardianModeActive, onGuardianToggle, trustedContactsCount, user, onNavigate }) => {
  const [sosState, setSosState] = useState('idle');
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    if (sosState !== 'sent') {
      animation.start();
    }
    return () => animation.stop();
  }, [pulseAnim, sosState]);

  const handleSosClick = () => {
    if (trustedContactsCount === 0) {
        alert("Please add at least one trusted contact before sending an SOS.");
        return;
    }
    setSosState('confirming');
  };

  const confirmSos = () => {
    setSosState('sent');
    setTimeout(() => {
      setSosState('idle');
    }, 5000);
  };

  const cancelSos = () => {
    setSosState('idle');
  };

  const SosConfirmationModal = () => (
    <Modal
      transparent={true}
      visible={sosState === 'confirming'}
      onRequestClose={cancelSos}
      animationType="fade"
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <Siren width={64} height={64} style={styles.modalIcon} />
                <Text style={styles.modalTitle}>Confirm SOS Alert</Text>
                <Text style={styles.modalText}>
                    This will send an alert to your trusted contacts with:
                </Text>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>• Your Name: <Text style={styles.boldText}>{user?.name || 'N/A'}</Text></Text>
                  <Text style={styles.infoText}>• Live Google Maps Link</Text>
                  <Text style={styles.infoText}>• AI-captured distress audio/message</Text>
                </View>
                <Text style={styles.smallText}>Sent via WhatsApp, Push Notifications, and SMS fallback.</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={confirmSos} style={[styles.button, styles.confirmButton]}>
                        <Text style={styles.buttonTextWhite}>Yes, Send Alert</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelSos} style={[styles.button, styles.cancelButton]}>
                        <Text style={styles.buttonTextBlack}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <SosConfirmationModal />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ULINZI</Text>
          <Text style={styles.subtitle}>Your Digital Bodyguard</Text>
        </View>
        <TouchableOpacity onPress={() => onNavigate('profile')} style={styles.profileButton}>
          <UserIcon width={28} height={28} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.sosContainer}>
        <View style={styles.sosButtonWrapper}>
          <TouchableOpacity
            onPress={handleSosClick}
            disabled={sosState === 'sent'}
            style={[
              styles.sosButton,
              sosState === 'sent' ? styles.sosButtonSent : styles.sosButtonActive
            ]}
          >
            <Animated.View style={[styles.pulse, { transform: [{ scale: pulseAnim }] }]} />
            {sosState === 'sent' ? (
              <View style={styles.sosContent}>
                <ShieldCheck width={64} height={64} color="#FFF" />
                <Text style={styles.sosButtonTextSent}>SENT</Text>
              </View>
            ) : (
              <View style={styles.sosContent}>
                <Siren width={64} height={64} color="#FFF" />
                <Text style={styles.sosButtonText}>SOS</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.guardianContainer}>
        <View style={styles.guardianContent}>
          <View style={styles.guardianTextContainer}>
            {isGuardianModeActive ? <ShieldCheck width={24} height={24} color="#4A41C3" /> : <ShieldAlert width={24} height={24} color="#6B7280" />}
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.guardianTitle}>Guardian Mode</Text>
              <Text style={[styles.guardianStatus, isGuardianModeActive && { color: '#4A41C3' }]}>
                {isGuardianModeActive ? 'Active & Protecting' : 'Inactive'}
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#818cf8" }}
            thumbColor={isGuardianModeActive ? "#4A41C3" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onGuardianToggle}
            value={isGuardianModeActive}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A41C3' },
  subtitle: { fontSize: 14, color: '#4B5563' },
  profileButton: { padding: 8, borderRadius: 999 },
  sosContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  sosButtonWrapper: { position: 'relative', marginBottom: 48 },
  sosButton: { width: 192, height: 192, borderRadius: 96, alignItems: 'center', justifyContent: 'center', shadowColor: '#dc2626', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 15 },
  sosButtonActive: { backgroundColor: '#dc2626' },
  sosButtonSent: { backgroundColor: '#22c55e' },
  pulse: { position: 'absolute', width: 192, height: 192, borderRadius: 96, borderWidth: 4, borderColor: 'rgba(220, 38, 38, 0.5)' },
  sosContent: { alignItems: 'center' },
  sosButtonText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', letterSpacing: 4, marginTop: 4 },
  sosButtonTextSent: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: 4 },
  guardianContainer: { backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', borderRadius: 8, padding: 16, width: '100%', maxWidth: 320, alignSelf: 'center' },
  guardianContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  guardianTextContainer: { flexDirection: 'row', alignItems: 'center' },
  guardianTitle: { fontWeight: '600', color: '#000' },
  guardianStatus: { fontSize: 14, color: '#6B7280' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center' },
  modalContainer: { backgroundColor: 'white', borderRadius: 8, padding: 32, maxWidth: 320, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 20 },
  modalIcon: { color: '#ef4444', marginBottom: 16 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#000' },
  modalText: { color: 'rgba(0,0,0,0.7)', marginBottom: 24, textAlign: 'center' },
  infoBox: { backgroundColor: '#F3F4F6', padding: 12, borderRadius: 6, marginBottom: 24, width: '100%' },
  infoText: { fontSize: 14, color: 'rgba(0,0,0,0.7)', marginBottom: 8, textAlign: 'left'},
  boldText: { fontWeight: 'bold' },
  smallText: { fontSize: 12, color: 'rgba(0,0,0,0.5)', marginBottom: 24 },
  buttonContainer: { width: '100%' },
  button: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, width: '100%', alignItems: 'center', justifyContent: 'center' },
  confirmButton: { backgroundColor: '#dc2626', marginBottom: 12 },
  cancelButton: { backgroundColor: '#E5E7EB' },
  buttonTextWhite: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  buttonTextBlack: { color: '#000000', fontWeight: 'bold', fontSize: 16 },
});

export default HomeScreen;
