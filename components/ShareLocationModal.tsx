import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Share2, User } from './Icons';

const DURATIONS = [
  { label: '15 min', value: 15 },
  { label: '1 hour', value: 60 },
  { label: '8 hours', value: 480 },
  { label: 'Until I stop', value: null },
];

const Checkbox = ({ checked, onChange }) => (
    <TouchableOpacity onPress={onChange} style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkboxTick}>✓</Text>}
    </TouchableOpacity>
);

const ShareLocationModal = ({ isVisible, contacts, onClose, onShare }) => {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState(15);

  const handleContactToggle = (contactId) => {
    setSelectedContactIds(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleShare = () => {
    if (selectedContactIds.length > 0) {
      onShare(selectedContactIds, selectedDuration);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Share Live Location</Text>
          
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Select Contacts</Text>
              <ScrollView style={styles.contactList}>
              {contacts.length > 0 ? contacts.map(contact => (
                  <TouchableOpacity key={contact.id} style={styles.contactItem} onPress={() => handleContactToggle(contact.id)}>
                      <Checkbox checked={selectedContactIds.includes(contact.id)} onChange={() => handleContactToggle(contact.id)} />
                      <View style={styles.avatar}>
                          <User width={20} height={20} color="#4A41C3"/>
                      </View>
                      <Text style={styles.contactName}>{contact.name}</Text>
                  </TouchableOpacity>
              )) : <Text style={styles.emptyText}>Add trusted contacts first.</Text>}
              </ScrollView>
          </View>

          <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Set Duration</Text>
              <View style={styles.durationGrid}>
              {DURATIONS.map(({ label, value }) => (
                  <TouchableOpacity
                      key={label}
                      onPress={() => setSelectedDuration(value)}
                      style={[styles.durationButton, selectedDuration === value && styles.durationButtonSelected]}
                  >
                    <Text style={[styles.durationText, selectedDuration === value && styles.durationTextSelected]}>{label}</Text>
                  </TouchableOpacity>
              ))}
              </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleShare}
              disabled={selectedContactIds.length === 0}
              style={[styles.button, styles.primaryButton, selectedContactIds.length === 0 && styles.disabledButton]}
            >
              <Share2 width={20} height={20} color="#FFF"/>
              <Text style={styles.primaryButtonText}>Start Sharing</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.secondaryButton]}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: 'white', borderRadius: 8, padding: 24, width: '90%', maxWidth: 380, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: 'black' },
  section: { marginBottom: 24 },
  sectionTitle: { fontWeight: '600', color: 'rgba(0,0,0,0.8)', marginBottom: 8 },
  contactList: { maxHeight: 160, backgroundColor: '#F3F4F6', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', padding: 8 },
  contactItem: { flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: 'white', borderRadius: 6, marginBottom: 8 },
  checkboxBase: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#4A41C3', borderColor: '#4A41C3' },
  checkboxTick: { color: 'white', fontWeight: 'bold' },
  avatar: { backgroundColor: 'rgba(0,0,0,0.1)', padding: 8, borderRadius: 999, marginHorizontal: 12 },
  contactName: { fontWeight: '500', color: 'black' },
  emptyText: { textAlign: 'center', padding: 16, color: '#6B7280' },
  durationGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  durationButton: { width: '48%', padding: 8, borderRadius: 6, backgroundColor: '#E5E7EB', alignItems: 'center', marginBottom: 8 },
  durationButtonSelected: { backgroundColor: '#4A41C3' },
  durationText: { fontWeight: '600', color: 'rgba(0,0,0,0.8)' },
  durationTextSelected: { color: 'white' },
  footer: { marginTop: 'auto' },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 8, marginBottom: 12 },
  primaryButton: { backgroundColor: '#4A41C3' },
  primaryButtonText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },
  secondaryButton: { backgroundColor: '#E5E7EB' },
  secondaryButtonText: { color: 'black', fontWeight: 'bold' },
  disabledButton: { backgroundColor: 'rgba(0,0,0,0.2)' },
});

export default ShareLocationModal;
