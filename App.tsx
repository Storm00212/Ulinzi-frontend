import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SCREEN } from './constants';
import HomeScreen from './components/HomeScreen';
import ChatbotScreen from './components/ChatbotScreen';
import ContactsScreen from './components/ContactsScreen';
import CivicHubScreen from './components/CivicHubScreen';
import NavBar from './components/NavBar';
import WelcomeScreen from './components/WelcomeScreen';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import TermsScreen from './components/TermsScreen';
import ProfileScreen from './components/ProfileScreen';
import LanguageSelectionScreen from './components/LanguageSelectionScreen';
import GuardianModeScreen from './components/GuardianModeScreen';
import MapScreen from './components/MapScreen';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authScreen, setAuthScreen] = useState('language');
  const [previousAuthScreen, setPreviousAuthScreen] = useState('welcome');
  
  const [activeScreen, setActiveScreen] = useState(SCREEN.HOME);
  const [isGuardianModeActive, setGuardianModeActive] = useState(false);
  const [trustedContacts, setTrustedContacts] = useState([]);
  const [locationSharing, setLocationSharing] = useState({
    isSharing: false,
    contactIds: [],
    endTime: null,
  });
  const [language, setLanguage] = useState('en');
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
      await AsyncStorage.removeItem('isAuthenticated');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('trustedContacts');
      setIsAuthenticated(false);
      setUser(null);
      setTrustedContacts([]);
      setActiveScreen(SCREEN.HOME);
      setAuthScreen('welcome');
  };
  
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('language');
        const lang = storedLang || 'en';
        setLanguage(lang);

        const initialAuth = storedLang ? 'welcome' : 'language';
        setAuthScreen(initialAuth);

        const loggedIn = await AsyncStorage.getItem('isAuthenticated') === 'true';
        if (loggedIn) {
          const storedUser = await AsyncStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          } else {
            await handleLogout();
          }
        }

        const storedContacts = await AsyncStorage.getItem('trustedContacts');
        if (storedContacts) {
          setTrustedContacts(JSON.parse(storedContacts));
        } else {
           setTrustedContacts([
              { id: '1', name: 'Sarah Mwangi', phone: '+254712345678', email: 'sarah@example.com', relationship: 'Sister', notificationMethod: 'All Methods', isPrimary: true },
              { id: '2', name: 'John Kimani', phone: '+254798765432', email: '', relationship: 'Friend', notificationMethod: 'SMS', isPrimary: false },
           ]);
        }
      } catch (e) {
        console.error("Failed to load data from AsyncStorage", e);
        await handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleSetTrustedContacts = async (contacts) => {
    setTrustedContacts(contacts);
    try {
        await AsyncStorage.setItem('trustedContacts', JSON.stringify(contacts));
    } catch (error) {
        console.error("Failed to save trusted contacts to AsyncStorage", error);
    }
  };
  
  const handleAuthSuccess = async (userData) => {
      await AsyncStorage.setItem('isAuthenticated', 'true');
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
  };

  const handleUpdateUser = async (updatedUser) => {
    setUser(updatedUser);
    try {
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
        console.error("Failed to save user data to AsyncStorage", error);
    }
  };

  const handleSetLanguage = async (lang) => {
    setLanguage(lang);
    try {
        await AsyncStorage.setItem('language', lang);
    } catch (error) {
        console.error("Failed to save language to AsyncStorage", error);
    }
  };

  const handleLanguageSelection = (lang) => {
    handleSetLanguage(lang);
    setAuthScreen('welcome');
  };
  
  const handleNavigateToTerms = (fromScreen) => {
      setPreviousAuthScreen(fromScreen);
      setAuthScreen('terms');
  }

  const handleGuardianToggle = () => {
    if (isGuardianModeActive) {
      setGuardianModeActive(false);
      setLocationSharing({ isSharing: false, contactIds: [], endTime: null });
      alert('Guardian Mode deactivated. Live location sharing has stopped.');
    } else {
      if (trustedContacts.length === 0) {
        alert("Please add at least one trusted contact to activate Guardian Mode.");
        return;
      }
      const allContactIds = trustedContacts.map(c => c.id);
      setLocationSharing({ isSharing: true, contactIds: allContactIds, endTime: null });
      setGuardianModeActive(true);
      alert(`Guardian Mode activated. Your live location is now being shared with all ${allContactIds.length} trusted contact(s).`);
    }
  };

  const handleAddAppointment = (appointment) => {
    setAppointments(prev => [...prev, appointment].sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()));
  };
  
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4A41C3" />
      </View>
    );
  }

  const renderMainApp = () => {
    const renderScreen = () => {
      switch (activeScreen) {
        case SCREEN.HOME:
          return (
            <HomeScreen 
              isGuardianModeActive={isGuardianModeActive} 
              onGuardianToggle={handleGuardianToggle}
              trustedContactsCount={trustedContacts.length}
              user={user}
              onNavigate={setActiveScreen}
            />
          );
        case SCREEN.MAP:
            return (
              <MapScreen 
                locationSharing={locationSharing}
                user={user}
              />
            );
        case SCREEN.CHAT:
          return <ChatbotScreen language={language} onBack={() => setActiveScreen(SCREEN.HUB)} />;
        case SCREEN.CONTACTS:
          return (
            <ContactsScreen 
              trustedContacts={trustedContacts} 
              setTrustedContacts={handleSetTrustedContacts}
            />
          );
        case SCREEN.HUB:
            return <CivicHubScreen appointments={appointments} onAddAppointment={handleAddAppointment} onNavigate={setActiveScreen} />;
        case SCREEN.GUARDIAN:
            return (
              <GuardianModeScreen
                isGuardianModeActive={isGuardianModeActive}
                onToggle={handleGuardianToggle}
              />
            );
        case SCREEN.PROFILE:
            if (!user) return null;
            return (
              <ProfileScreen 
                user={user} 
                onLogout={handleLogout} 
                onUpdateUser={handleUpdateUser}
                language={language}
                onSetLanguage={handleSetLanguage}
                onBack={() => setActiveScreen(SCREEN.HOME)}
              />
            );
        default:
          return (
            <HomeScreen 
              isGuardianModeActive={isGuardianModeActive} 
              onGuardianToggle={handleGuardianToggle}
              trustedContactsCount={trustedContacts.length}
              user={user}
              onNavigate={setActiveScreen}
            />
          );
      }
    };

    return (
      <>
        <View style={styles.mainContent}>
          {renderScreen()}
        </View>
        <NavBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </>
    );
  };

  const renderAuthFlow = () => {
    switch (authScreen) {
        case 'language':
            return <LanguageSelectionScreen onSelect={handleLanguageSelection} />;
        case 'welcome':
            return <WelcomeScreen setAuthScreen={setAuthScreen} language={language} />;
        case 'signin':
            return <SignInScreen onSignInSuccess={handleAuthSuccess} setAuthScreen={setAuthScreen} onNavigateToTerms={() => handleNavigateToTerms('signin')} language={language}/>;
        case 'signup':
            return <SignUpScreen onSignUpSuccess={handleAuthSuccess} setAuthScreen={setAuthScreen} onNavigateToTerms={() => handleNavigateToTerms('signup')} language={language} />;
        case 'terms':
            return <TermsScreen onBack={() => setAuthScreen(previousAuthScreen)} />;
        default:
            return <WelcomeScreen setAuthScreen={setAuthScreen} language={language}/>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.appContainer}>
        {isAuthenticated ? renderMainApp() : <View style={styles.authContainer}>{renderAuthFlow()}</View>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appContainer: {
    flex: 1,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#4A41C3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  mainContent: {
    flex: 1,
    padding: 16,
    paddingBottom: 96, // For NavBar
  },
  authContainer: {
    flex: 1,
    padding: 16,
  },
});

export default App;
