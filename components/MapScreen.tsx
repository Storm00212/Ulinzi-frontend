import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { MapPin, Shield } from './Icons';

const MapScreen = ({ locationSharing, user }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (locationSharing.isSharing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        ])
      ).start();
    }
  }, [locationSharing.isSharing, pulseAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Location Map</Text>
      
      <View style={styles.mapContainer}>
        <Text style={styles.mapLabel}>Map of Kenya (Google Maps API)</Text>

        {locationSharing.isSharing ? (
          <View style={styles.locationActiveContainer}>
            {/* FIX: The style prop with -webkit-filter is not valid in React Native.
                It uses CSS syntax that causes a compilation error.
                Replaced with a container View using React Native shadow props. */}
            <View style={styles.mapPinContainer}>
                <Animated.View style={[styles.pulse, { transform: [{ scale: pulseAnim }] }]} />
                <MapPin width={64} height={64} color="#ef4444" />
            </View>
            <Text style={styles.locationName}>{user?.name || 'Your Location'}</Text>
            <Text style={styles.locationStatus}>Live location active</Text>
          </View>
        ) : (
          <View style={styles.locationInactiveContainer}>
            <Shield width={64} height={64} color="rgba(0,0,0,0.3)" />
            <Text style={styles.inactiveTitle}>Location Sharing is Inactive</Text>
            <Text style={styles.inactiveSubtitle}>
              Activate Guardian Mode from its screen to share your live location.
            </Text>
          </View>
        )}
      </View>

      {locationSharing.isSharing && (
        <View style={styles.sharingBanner}>
          <Text style={styles.bannerTitle}>Sharing is active</Text>
          <Text style={styles.bannerSubtitle}>Your location is being shared with all trusted contacts.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A41C3',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  mapLabel: {
    position: 'absolute',
    top: 8,
    left: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  locationActiveContainer: {
    alignItems: 'center',
  },
  mapPinContainer: {
    // Shadow for iOS
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 8,
  },
  pulse: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 4,
    borderColor: 'rgba(239, 68, 68, 0.5)',
    borderRadius: 999,
  },
  locationName: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  locationStatus: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
  },
  locationInactiveContainer: {
    padding: 16,
    alignItems: 'center',
  },
  inactiveTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.7)',
  },
  inactiveSubtitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 280,
  },
  sharingBanner: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(74, 65, 195, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#4A41C3',
    borderRadius: 4,
  },
  bannerTitle: {
    fontWeight: 'bold',
    color: '#3c349c',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#3c349c',
  },
});

export default MapScreen;
