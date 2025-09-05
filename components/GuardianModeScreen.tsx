import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { ShieldCheck, ShieldOff } from './Icons';

const GuardianModeScreen = ({ isGuardianModeActive, onToggle }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    );
    if (isGuardianModeActive) {
      animation.start();
    } else {
      animation.stop();
      pulseAnim.setValue(1);
    }
    return () => animation.stop();
  }, [isGuardianModeActive, pulseAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guardian Mode</Text>
      <Text style={styles.description}>
        When activated, Guardian Mode automatically shares your location with contacts. If danger is detected, it sends an SOS via WhatsApp, Firebase Cloud Messaging, and an SMS fallback (powered by Twilio/Africa's Talking) if you are offline.
      </Text>

      <View style={[styles.circle, isGuardianModeActive ? styles.circleActive : styles.circleInactive]}>
        {isGuardianModeActive && (
          <>
            <Animated.View style={[styles.pulse, { transform: [{ scale: pulseAnim }] }]} />
            <View style={styles.innerCircle} />
          </>
        )}
        {isGuardianModeActive ? (
          <ShieldCheck width={128} height={128} color="#4A41C3" />
        ) : (
          <ShieldOff width={128} height={128} color="rgba(0,0,0,0.4)" />
        )}
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Status: 
          <Text style={isGuardianModeActive ? styles.statusActive : styles.statusPaused}>
            {isGuardianModeActive ? ' Active & Monitoring' : ' Paused'}
          </Text>
        </Text>
        <Text style={styles.statusDescription}>
          {isGuardianModeActive ? 'Live location is being shared with contacts.' : 'Activate to start background monitoring.'}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onToggle}
        style={[styles.toggleButton, isGuardianModeActive ? styles.deactivateButton : styles.activateButton]}
      >
        <Text style={styles.buttonText}>
          {isGuardianModeActive ? 'Pause Guardian Mode' : 'Activate Guardian Mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A41C3',
    marginBottom: 16,
  },
  description: {
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 32,
    textAlign: 'center',
    maxWidth: 320,
  },
  circle: {
    width: 256,
    height: 256,
    borderRadius: 128,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circleActive: {
    borderColor: '#4A41C3',
  },
  circleInactive: {
    borderColor: 'rgba(0,0,0,0.2)',
  },
  pulse: {
    position: 'absolute',
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: 'rgba(74, 65, 195, 0.1)',
  },
  innerCircle: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: 'rgba(74, 65, 195, 0.3)',
  },
  statusContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  statusActive: {
    color: '#4A41C3',
  },
  statusPaused: {
    color: 'rgba(0,0,0,0.5)',
  },
  statusDescription: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
    marginTop: 4,
  },
  toggleButton: {
    marginTop: 48,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  activateButton: {
    backgroundColor: '#4A41C3',
  },
  deactivateButton: {
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GuardianModeScreen;
