import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LogOut, User, ArrowLeft } from './Icons';
import SettingsScreen from './SettingsScreen';

const ProfileScreen = ({ user, onLogout, onUpdateUser, language, onSetLanguage, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  useEffect(() => {
    setEditedName(user.name);
  }, [user.name]);

  const handleSave = () => {
    if (editedName.trim()) {
      onUpdateUser({ ...user, name: editedName.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user.name);
    setIsEditing(false);
  };

  if (showSettings) {
    return <SettingsScreen onBack={() => setShowSettings(false)} language={language} onSetLanguage={onSetLanguage} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft width={24} height={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <User width={48} height={48} color="rgba(0,0,0,0.4)" />
        </View>
        
        {isEditing ? (
          <TextInput
            value={editedName}
            onChangeText={setEditedName}
            style={styles.nameInput}
          />
        ) : (
          <Text style={styles.userName}>{user.name}</Text>
        )}
        <Text style={styles.userEmail}>{user.email}</Text>
        
        <View style={styles.actionsContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity onPress={handleSave} style={[styles.button, styles.primaryButton]}>
                <Text style={styles.primaryButtonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.secondaryButton]}>
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => setIsEditing(true)} style={[styles.button, styles.secondaryButton]}>
                <Text style={styles.secondaryButtonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowSettings(true)} style={[styles.button, styles.secondaryButton]}>
                <Text style={styles.secondaryButtonText}>Settings</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <LogOut width={20} height={20} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' },
    backButton: { padding: 8, marginLeft: -8, marginRight: 8 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#4A41C3' },
    content: { flex: 1, alignItems: 'center', paddingTop: 32 },
    avatarContainer: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    userName: { fontSize: 24, fontWeight: '600', color: '#000' },
    nameInput: { width: '80%', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB', textAlign: 'center', fontSize: 24, fontWeight: '600' },
    userEmail: { color: '#6B7280', marginTop: 4 },
    actionsContainer: { width: '100%', maxWidth: 320, marginTop: 48, gap: 16 },
    button: { width: '100%', padding: 16, borderRadius: 8, alignItems: 'center' },
    primaryButton: { backgroundColor: '#4A41C3' },
    primaryButtonText: { color: '#FFF', fontWeight: 'bold' },
    secondaryButton: { backgroundColor: '#F3F4F6' },
    secondaryButtonText: { color: '#374151', fontWeight: 'bold' },
    footer: { paddingBottom: 16 },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ef4444', paddingVertical: 12, borderRadius: 8 },
    logoutText: { color: '#ef4444', fontWeight: 'bold', marginLeft: 8 },
});

export default ProfileScreen;
