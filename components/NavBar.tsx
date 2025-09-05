import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SCREEN } from '../constants';
import { Home, Map, Users, Shield, BookOpen } from './Icons';

const NavButton = ({ label, icon, isActive, onClick }) => (
  <TouchableOpacity
    onPress={onClick}
    style={styles.navButton}
  >
    <View style={{ opacity: isActive ? 1 : 0.5 }}>
      {icon}
    </View>
    <Text style={[styles.navLabel, isActive ? styles.activeLabel : styles.inactiveLabel]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const NavBar = ({ activeScreen, setActiveScreen }) => {
  return (
    <View style={styles.navContainer}>
      <View style={styles.navBar}>
        <NavButton
            label="Home"
            icon={<Home width={24} height={24} color={activeScreen === SCREEN.HOME ? '#4A41C3' : '#333'} />}
            isActive={activeScreen === SCREEN.HOME}
            onClick={() => setActiveScreen(SCREEN.HOME)}
        />
        <NavButton
            label="Map"
            icon={<Map width={24} height={24} color={activeScreen === SCREEN.MAP ? '#4A41C3' : '#333'} />}
            isActive={activeScreen === SCREEN.MAP}
            onClick={() => setActiveScreen(SCREEN.MAP)}
        />
        <NavButton
            label="Contacts"
            icon={<Users width={24} height={24} color={activeScreen === SCREEN.CONTACTS ? '#4A41C3' : '#333'} />}
            isActive={activeScreen === SCREEN.CONTACTS}
            onClick={() => setActiveScreen(SCREEN.CONTACTS)}
        />
         <NavButton
            label="Hub"
            icon={<BookOpen width={24} height={24} color={activeScreen === SCREEN.HUB ? '#4A41C3' : '#333'} />}
            isActive={activeScreen === SCREEN.HUB}
            onClick={() => setActiveScreen(SCREEN.HUB)}
        />
        <NavButton
            label="Guardian"
            icon={<Shield width={24} height={24} color={activeScreen === SCREEN.GUARDIAN ? '#4A41C3' : '#333'} />}
            isActive={activeScreen === SCREEN.GUARDIAN}
            onClick={() => setActiveScreen(SCREEN.GUARDIAN)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: 500,
    alignSelf: 'center',
  },
  navBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 16 : 8, // Safe area for iOS home indicator
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  activeLabel: {
    color: '#4A41C3',
  },
  inactiveLabel: {
    color: 'rgba(0,0,0,0.5)',
  }
});

export default NavBar;
