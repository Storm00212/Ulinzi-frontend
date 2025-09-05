import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Clock, Calendar, ArrowLeft, CreditCard, ArrowRight, Smartphone, MessageSquare } from './Icons';

const counsellorsData = [
  { id: 'c1', name: 'Dr. Amina Mohamed', age: 42, specialties: ['Trauma', 'GBV'], bio: 'Specializes in trauma-informed care and support for survivors of gender-based violence. 15+ years of experience.', imageUrl: `https://xsgames.co/randomusers/assets/avatars/female/42.jpg`, availability: 'Available' },
  { id: 'c2', name: 'John Omondi', age: 35, specialties: ['Anxiety', 'Depression'], bio: 'Focuses on cognitive-behavioral therapy (CBT) for anxiety and depression in young adults.', imageUrl: `https://xsgames.co/randomusers/assets/avatars/male/46.jpg`, availability: 'Available' },
  { id: 'c3', name: 'Fatima Ali', age: 55, specialties: ['Family', 'Relationships'], bio: 'Experienced in family therapy and relationship counselling, helping clients navigate complex interpersonal dynamics.', imageUrl: `https://xsgames.co/randomusers/assets/avatars/female/60.jpg`, availability: 'Busy' },
  { id: 'c4', name: 'David Kariuki', age: 29, specialties: ['Anxiety', 'Stress'], bio: 'Helps clients develop coping mechanisms for stress and anxiety using mindfulness and solution-focused techniques.', imageUrl: `https://xsgames.co/randomusers/assets/avatars/male/34.jpg`, availability: 'Available' },
];

const EXPERTISE_AREAS = ['Trauma', 'GBV', 'Anxiety', 'Depression', 'Family', 'Relationships', 'Stress'];
const AGE_RANGES = ['20-30', '30-40', '40-50', '50+'];

const generateTimeSlots = (date) => {
  const slots = [];
  const day = date.getDay();
  if (day === 0 || day === 6) return [];
  for (let i = 9; i <= 16; i++) {
    slots.push(`${String(i).padStart(2, '0')}:00`);
  }
  return slots;
};

const CivicHubScreen = ({ appointments, onAddAppointment, onNavigate }) => {
  const [view, setView] = useState('list');
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ expertise: 'all', age: 'all' });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [mpesaNumber, setMpesaNumber] = useState('');

  const filteredCounsellors = useMemo(() => {
    return counsellorsData.filter(c => {
      const expertiseMatch = activeFilters.expertise === 'all' || c.specialties.includes(activeFilters.expertise);
      const [minAge, maxAge] = activeFilters.age === 'all' ? [0, 100] : activeFilters.age.split('-').map(Number);
      const ageMatch = c.age >= minAge && c.age <= (maxAge || 100);
      return expertiseMatch && ageMatch;
    });
  }, [activeFilters]);
  
  const handleConfirmBooking = () => {
    if (!selectedCounsellor || !selectedTime) return;
    if (paymentMethod === 'mpesa' && !/^(07|01)\d{8}$/.test(mpesaNumber)) {
      Alert.alert('Invalid Number', 'Please enter a valid M-Pesa number (e.g., 0712345678).');
      return;
    }
    const newAppointment = { id: new Date().toISOString(), counsellor: selectedCounsellor, date: selectedTime.date, time: selectedTime.time, paymentMethod };
    onAddAppointment(newAppointment);
    const successMessage = paymentMethod === 'mpesa'
      ? `Booking successful! An STK push has been sent to ${mpesaNumber} to complete the payment.`
      : 'Booking and payment successful! Your appointment is confirmed.';
    Alert.alert('Success', successMessage);
    setView('list');
  };

  const renderHeader = (title, onBack) => (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}><ArrowLeft width={24} height={24} color="#333" /></TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );

  const MainList = () => (
    <ScrollView>
      <Text style={styles.pageTitle}>Counselling Hub</Text>
      <Text style={styles.sectionTitle}>My Upcoming Appointments</Text>
      {appointments.length > 0 ? (
        appointments.map(appt => (
          <View key={appt.id} style={styles.card}>
            <Text style={styles.boldText}>{appt.counsellor.name}</Text>
            <View style={styles.row}><Calendar width={16} height={16} /><Text>{new Date(appt.date).toDateString()}</Text></View>
            <View style={styles.row}><Clock width={16} height={16} /><Text>{appt.time}</Text></View>
            <View style={styles.row}>{appt.paymentMethod === 'card' ? <CreditCard width={16} height={16} /> : <Smartphone width={16} height={16} />}<Text>Paid via {appt.paymentMethod}</Text></View>
          </View>
        ))
      ) : <View style={[styles.card, {alignItems: 'center'}]}><Text>No upcoming appointments.</Text></View>}
      
      <Text style={styles.sectionTitle}>Find a Counsellor</Text>
      <View style={styles.row}>
        <View style={styles.pickerContainer}><Picker selectedValue={activeFilters.expertise} onValueChange={itemValue => setActiveFilters(f => ({...f, expertise: itemValue}))}><Picker.Item label="All Expertise" value="all" />{EXPERTISE_AREAS.map(a => <Picker.Item key={a} label={a} value={a} />)}</Picker></View>
        <View style={styles.pickerContainer}><Picker selectedValue={activeFilters.age} onValueChange={itemValue => setActiveFilters(f => ({...f, age: itemValue}))}><Picker.Item label="Any Age" value="all" />{AGE_RANGES.map(r => <Picker.Item key={r} label={r} value={r} />)}</Picker></View>
      </View>
      {filteredCounsellors.map(c => (
        <TouchableOpacity key={c.id} onPress={() => { setSelectedCounsellor(c); setView('profile'); }} style={styles.counsellorItem}>
          <Image source={{ uri: c.imageUrl }} style={styles.avatar} />
          <View>
            <Text style={styles.boldText}>{c.name}</Text>
            <View style={styles.row}><View style={[styles.statusDot, {backgroundColor: c.availability === 'Available' ? '#22c55e' : c.availability === 'Busy' ? '#f59e0b' : '#9ca3af'}]} /><Text>{c.availability}</Text></View>
          </View>
          <ArrowRight width={20} height={20} color="#9ca3af" style={{ marginLeft: 'auto' }}/>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const ProfileStep = () => {
    if (!selectedCounsellor) return null;
    return (
      <View><ScrollView>
        {renderHeader('Counsellor Profile', () => setView('list'))}
        <View style={{ alignItems: 'center' }}>
            <Image source={{ uri: selectedCounsellor.imageUrl }} style={styles.profileAvatar} />
            <Text style={styles.profileName}>{selectedCounsellor.name}</Text>
            <Text>{selectedCounsellor.age} years old</Text>
            <View style={[styles.row, { flexWrap: 'wrap', justifyContent: 'center' }]}>{selectedCounsellor.specialties.map(s => <View key={s} style={styles.specialtyBadge}><Text style={styles.specialtyText}>{s}</Text></View>)}</View>
            <Text style={styles.bio}>{selectedCounsellor.bio}</Text>
            <Text style={styles.profileName}>Session Rate: 400 KES / 1 hour</Text>
            <TouchableOpacity onPress={() => setView('booking')} disabled={selectedCounsellor.availability !== 'Available'} style={[styles.button, selectedCounsellor.availability !== 'Available' && styles.disabledButton]}><Text style={styles.buttonText}>{selectedCounsellor.availability === 'Available' ? 'Book a Session' : 'Currently Unavailable'}</Text></TouchableOpacity>
        </View>
      </ScrollView></View>
    );
  };
  
  const BookingStep = () => {
    const dates = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d; }).filter(d => generateTimeSlots(d).length > 0), []);
    useEffect(() => { if (dates.length > 0 && !selectedDate) setSelectedDate(dates[0]); }, [dates, selectedDate]);
    const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

    return (
        <View>{renderHeader('Book a Session', () => setView('profile'))}<ScrollView>
            <Text style={styles.sectionTitle}>Select a Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>{dates.map(date => {
                const isSelected = selectedDate?.toDateString() === date.toDateString();
                return <TouchableOpacity key={date.toISOString()} onPress={() => setSelectedDate(date)} style={[styles.dateButton, isSelected && styles.dateButtonSelected]}><Text style={isSelected && {color: 'white'}}>{date.toLocaleString('en-US', { weekday: 'short' })}</Text><Text style={[styles.boldText, isSelected && {color: 'white'}]}>{date.getDate()}</Text><Text style={isSelected && {color: 'white'}}>{date.toLocaleString('en-US', { month: 'short' })}</Text></TouchableOpacity>;
            })}</ScrollView>
            {selectedDate && <>
                <Text style={styles.sectionTitle}>Select a Time for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {timeSlots.map(time => <TouchableOpacity key={time} onPress={() => { setSelectedTime({ date: selectedDate.toISOString().split('T')[0], time }); setView('confirm'); }} style={styles.timeButton}><Text>{time}</Text></TouchableOpacity>)}
                </View>
            </>}
        </ScrollView></View>
    );
  };

  const ConfirmationStep = () => {
    if (!selectedCounsellor || !selectedTime) return null;
    return (
      <View>{renderHeader('Confirm Booking', () => setView('booking'))}<ScrollView>
        <View style={styles.card}>
            <Text style={styles.boldText}>{selectedCounsellor.name}</Text>
            <View style={styles.row}><Calendar width={16} height={16} /><Text>{new Date(selectedTime.date).toDateString()}</Text></View>
            <View style={styles.row}><Clock width={16} height={16} /><Text>{selectedTime.time}</Text></View>
        </View>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.row}>
            <TouchableOpacity onPress={() => setPaymentMethod('card')} style={[styles.paymentButton, paymentMethod === 'card' && styles.paymentButtonSelected]}><CreditCard width={20} height={20} color={paymentMethod === 'card' ? 'white' : 'black'} /><Text style={paymentMethod === 'card' && {color: 'white'}}> Card</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod('mpesa')} style={[styles.paymentButton, paymentMethod === 'mpesa' && styles.paymentButtonSelected]}><Smartphone width={20} height={20} color={paymentMethod === 'mpesa' ? 'white' : 'black'} /><Text style={paymentMethod === 'mpesa' && {color: 'white'}}> M-Pesa</Text></TouchableOpacity>
        </View>
        {paymentMethod === 'mpesa' && <TextInput value={mpesaNumber} onChangeText={setMpesaNumber} placeholder="e.g., 0712345678" style={styles.input} keyboardType="phone-pad" />}
        <View style={[styles.card, {alignItems: 'center'}]}><Text style={[styles.boldText, {fontSize: 20, color: '#4A41C3'}]}>Total: 400 KES</Text></View>
        <TouchableOpacity onPress={handleConfirmBooking} style={styles.button}><Text style={styles.buttonText}>Confirm & Pay</Text></TouchableOpacity>
      </ScrollView></View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {view === 'list' && <MainList />}
      {view === 'profile' && <ProfileStep />}
      {view === 'booking' && <BookingStep />}
      {view === 'confirm' && <ConfirmationStep />}
      <TouchableOpacity onPress={() => onNavigate('chat')} style={styles.chatFab}><MessageSquare width={24} height={24} color="white" /></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    backButton: { padding: 8, marginLeft: -8, marginRight: 8 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#4A41C3' },
    pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#4A41C3', marginBottom: 24, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 12 },
    card: { backgroundColor: '#f3f4f6', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 12, gap: 8 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    boldText: { fontWeight: 'bold' },
    pickerContainer: { flex: 1, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8 },
    counsellorItem: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 12, backgroundColor: '#f3f4f6', borderRadius: 8, marginBottom: 8 },
    avatar: { width: 48, height: 48, borderRadius: 24 },
    statusDot: { width: 8, height: 8, borderRadius: 4 },
    profileAvatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 16 },
    profileName: { fontSize: 20, fontWeight: 'bold' },
    specialtyBadge: { backgroundColor: 'rgba(74,65,195,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99, margin: 4 },
    specialtyText: { color: '#3c349c', fontSize: 12, fontWeight: '600' },
    bio: { backgroundColor: '#f3f4f6', padding: 16, borderRadius: 8, marginVertical: 16, textAlign: 'left' },
    button: { marginTop: 24, width: '100%', backgroundColor: '#4A41C3', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: 'bold' },
    disabledButton: { backgroundColor: '#9ca3af' },
    dateButton: { flexShrink: 0, padding: 12, width: 80, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#f3f4f6', marginRight: 8 },
    dateButtonSelected: { backgroundColor: '#4A41C3', borderColor: '#4A41C3' },
    timeButton: { padding: 12, borderRadius: 8, backgroundColor: '#e5e7eb', alignItems: 'center' },
    paymentButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, borderWidth: 2, borderColor: '#e5e7eb', backgroundColor: '#e5e7eb' },
    paymentButtonSelected: { backgroundColor: '#4A41C3', borderColor: '#4A41C3' },
    input: { width: '100%', backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB', marginVertical: 16 },
    chatFab: { position: 'absolute', bottom: 80, right: 16, backgroundColor: '#4A41C3', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 5 },
});

export default CivicHubScreen;
