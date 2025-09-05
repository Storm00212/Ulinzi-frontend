import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ArrowLeft } from './Icons';

const SettingsRow = ({ label, children }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        {children}
    </View>
);

const SettingsScreen = ({ onBack, language, onSetLanguage }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const content = {
        en: {
            title: 'Settings',
            notifications: 'Push Notifications',
            languageLabel: 'Language',
            darkMode: 'Dark Mode',
            backAriaLabel: 'Go back to profile',
        },
        sw: {
            title: 'Mipangilio',
            notifications: 'Arifa za Kushinikiza',
            languageLabel: 'Lugha',
            darkMode: 'Hali Nyeusi',
            backAriaLabel: 'Rudi kwenye wasifu',
        }
    };
    const t = content[language];
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton} accessibilityLabel={t.backAriaLabel}>
                    <ArrowLeft width={24} height={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t.title}</Text>
            </View>
            
            <View style={styles.settingsContainer}>
                <SettingsRow label={t.notifications}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#818cf8" }}
                        thumbColor={notificationsEnabled ? "#4A41C3" : "#f4f3f4"}
                        onValueChange={() => setNotificationsEnabled(prev => !prev)}
                        value={notificationsEnabled}
                    />
                </SettingsRow>
                <SettingsRow label={t.languageLabel}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={language}
                            onValueChange={(itemValue) => onSetLanguage(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="English" value="en" />
                            <Picker.Item label="Swahili" value="sw" />
                        </Picker>
                    </View>
                </SettingsRow>
                <SettingsRow label={t.darkMode}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#818cf8" }}
                        thumbColor={"#f4f3f4"}
                        value={false}
                        disabled={true}
                    />
                </SettingsRow>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    backButton: { padding: 8, marginLeft: -8, marginRight: 8 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#4A41C3' },
    settingsContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    label: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.8)',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
    },
    picker: {
        width: 120,
        height: 40,
    }
});

export default SettingsScreen;
