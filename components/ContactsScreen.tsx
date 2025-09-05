import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal, Alert, ScrollView } from 'react-native';
import { UserPlus, Trash2, Shield, Phone, Mail, Pencil, WhatsApp } from './Icons';
import { Picker } from '@react-native-picker/picker';

const ContactsScreen = ({ trustedContacts, setTrustedContacts }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    notificationMethod: 'All Methods',
  });

  const handleInputChange = (name, value) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingContact(null);
    setFormState({ name: '', phone: '', email: '', relationship: '', notificationMethod: 'All Methods' });
    setModalVisible(true);
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setFormState({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        relationship: contact.relationship,
        notificationMethod: contact.notificationMethod,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingContact(null);
  };
  
  const handleSaveContact = () => {
    if (formState.name.trim() && formState.phone.trim() && formState.relationship.trim()) {
      if (editingContact) {
        // Update existing contact
        setTrustedContacts(
          trustedContacts.map(c => 
            c.id === editingContact.id ? { ...c, ...formState } : c
          )
        );
      } else {
        // Add new contact
        const newContact = {
          id: new Date().toISOString(),
          ...formState,
          isPrimary: trustedContacts.length === 0,
        };
        setTrustedContacts([...trustedContacts, newContact]);
      }
      closeModal();
    } else {
      Alert.alert("Validation Error", "Please fill in all required fields.");
    }
  };

  const deleteContact = (id) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
            const wasPrimary = trustedContacts.find(c => c.id === id)?.isPrimary;
            const remainingContacts = trustedContacts.filter(contact => contact.id !== id);
            if (wasPrimary && remainingContacts.length > 0) {
              remainingContacts[0].isPrimary = true;
            }
            setTrustedContacts(remainingContacts);
          }
        }
      ]
    );
  };

  const setPrimaryContact = (id) => {
    setTrustedContacts(
      trustedContacts.map(contact => ({
        ...contact,
        isPrimary: contact.id === id,
      }))
    );
  };

  const filteredContacts = trustedContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getNotificationIcon = (method) => {
    switch(method) {
        case 'SMS': return <Phone width={12} height={12} />;
        case 'WhatsApp': return <WhatsApp width={12} height={12} />;
        case 'All Methods':
        default: return <Shield width={12} height={12} />;
    }
  };

  const renderContact = ({ item }) => (
    <View style={styles.contactCard}>
      <View style={{ flex: 1 }}>
        <View style={styles.contactHeader}>
          <Text style={styles.contactName}>{item.name}</Text>
          {item.isPrimary && <View style={styles.primaryBadge}><Text style={styles.primaryText}>Primary</Text></View>}
        </View>
        <View style={styles.contactDetails}>
          <View style={styles.detailRow}><Phone width={16} height={16} color="#4B5563" /><Text style={styles.detailText}>{item.phone}</Text></View>
          {item.email && <View style={styles.detailRow}><Mail width={16} height={16} color="#4B5563" /><Text style={styles.detailText}>{item.email}</Text></View>}
          <Text style={styles.relationshipText}>{item.relationship}</Text>
          <View style={styles.detailRow}>{getNotificationIcon(item.notificationMethod)}<Text style={styles.relationshipText}> {item.notificationMethod}</Text></View>
        </View>
      </View>
      <View style={styles.contactActions}>
        {!item.isPrimary && (
          <TouchableOpacity onPress={() => setPrimaryContact(item.id)} style={styles.setPrimaryButton}>
            <Text style={styles.setPrimaryText}>Set Primary</Text>
          </TouchableOpacity>
        )}
        <View style={styles.iconButtons}>
          <TouchableOpacity onPress={() => openEditModal(item)} style={styles.iconButton}><Pencil width={16} height={16} color="#374151" /></TouchableOpacity>
          <TouchableOpacity onPress={() => deleteContact(item.id)} style={styles.iconButton}><Trash2 width={16} height={16} color="#374151" /></TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.mainHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Shield width={32} height={32} color="#4A41C3" />
          <Text style={styles.mainTitle}>Ulinzi</Text>
        </View>
        <Text style={styles.mainSubtitle}>Your digital bodyguard</Text>
      </View>
      
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Shield width={32} height={32} color="#4A41C3" />
          <Text style={styles.subTitle}>Trusted Contacts</Text>
          <Text style={styles.subSubtitle}>People notified during emergencies</Text>
        </View>
        
        <TouchableOpacity onPress={openAddModal} style={styles.addButton}>
          <UserPlus width={20} height={20} color="white" />
          <Text style={styles.addButtonText}>Add Trusted Contact</Text>
        </TouchableOpacity>

        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name..."
          placeholderTextColor="#6B7280"
          style={styles.searchInput}
        />

        <FlatList
          data={filteredContacts}
          renderItem={renderContact}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>{searchQuery ? 'No contacts match your search.' : 'Add your first trusted contact.'}</Text>}
          contentContainerStyle={{ flexGrow: 1 }}
        />

        <TouchableOpacity style={styles.testButton}>
          <Text style={styles.addButtonText}>Test Emergency Notifications</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>{editingContact ? 'Edit Contact' : 'Add New Contact'}</Text>
              <TextInput value={formState.name} onChangeText={v => handleInputChange('name', v)} placeholder="Name" style={styles.input} />
              <TextInput value={formState.phone} onChangeText={v => handleInputChange('phone', v)} placeholder="Phone Number" keyboardType="phone-pad" style={styles.input} />
              <TextInput value={formState.email} onChangeText={v => handleInputChange('email', v)} placeholder="Email (Optional)" keyboardType="email-address" style={styles.input} />
              <TextInput value={formState.relationship} onChangeText={v => handleInputChange('relationship', v)} placeholder="Relationship (e.g. Sister)" style={styles.input} />
              <View style={styles.pickerContainer}>
                <Picker selectedValue={formState.notificationMethod} onValueChange={(itemValue) => handleInputChange('notificationMethod', itemValue)}>
                  <Picker.Item label="All Methods" value="All Methods" />
                  <Picker.Item label="SMS" value="SMS" />
                  <Picker.Item label="WhatsApp" value="WhatsApp" />
                </Picker>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleSaveContact} style={[styles.modalButton, styles.saveButton]}><Text style={styles.addButtonText}>{editingContact ? 'Save' : 'Add'}</Text></TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={[styles.modalButton, styles.cancelButton]}><Text style={styles.cancelButtonText}>Cancel</Text></TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F9FAFB' },
  mainHeader: { alignItems: 'center', paddingTop: 8, paddingBottom: 24 },
  mainTitle: { fontSize: 30, fontWeight: 'bold', color: '#4A41C3' },
  mainSubtitle: { color: '#4B5563' },
  container: { flex: 1, backgroundColor: 'white', borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, padding: 16 },
  subHeader: { alignItems: 'center', marginBottom: 16 },
  subTitle: { fontSize: 20, fontWeight: 'bold', color: 'black', marginTop: 4 },
  subSubtitle: { fontSize: 14, color: '#6B7280' },
  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4A41C3', paddingVertical: 12, borderRadius: 8, marginVertical: 16 },
  addButtonText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },
  searchInput: { backgroundColor: '#F3F4F6', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB', marginBottom: 16 },
  contactCard: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, marginBottom: 12, flexDirection: 'row' },
  contactHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  contactName: { fontWeight: 'bold', color: 'black' },
  primaryBadge: { backgroundColor: '#10B981', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  primaryText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  contactDetails: { marginTop: 8, gap: 4 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { fontSize: 14, color: '#4B5563' },
  relationshipText: { fontSize: 12, color: '#6B7280', paddingTop: 4 },
  contactActions: { flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' },
  setPrimaryButton: { backgroundColor: 'rgba(74, 65, 195, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  setPrimaryText: { color: '#3c349c', fontSize: 10, fontWeight: 'bold' },
  iconButtons: { flexDirection: 'row', gap: 8, marginTop: 'auto' },
  iconButton: { backgroundColor: '#E5E7EB', padding: 8, borderRadius: 6 },
  emptyText: { textAlign: 'center', color: '#6B7280', paddingTop: 32 },
  testButton: { backgroundColor: '#4A41C3', paddingVertical: 12, borderRadius: 8, marginTop: 'auto' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 24, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'semibold', marginBottom: 12, color: 'black' },
  input: { width: '100%', backgroundColor: '#F9FAFB', color: 'black', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB', marginBottom: 12 },
  pickerContainer: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, marginBottom: 12 },
  modalButtons: { flexDirection: 'row', gap: 12, marginTop: 16 },
  modalButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  saveButton: { backgroundColor: '#4A41C3' },
  cancelButton: { backgroundColor: '#E5E7EB' },
  cancelButtonText: { color: 'black', fontWeight: 'bold' },
});

export default ContactsScreen;
