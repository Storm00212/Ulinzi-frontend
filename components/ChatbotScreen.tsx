import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform, PermissionsAndroid, Alert } from 'react-native';
import { getChatbotResponse } from '../services/geminiService';
import { PaperPlane, Microphone, ArrowLeft } from './Icons';

// In a real app, you would use a library like @react-native-voice/voice.
// This is a placeholder to show the required logic.
const checkAndRequestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Microphone Permission',
                    message: 'Ulinzi needs access to your microphone to enable voice input.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    // iOS permissions are handled in Info.plist
    return true;
};


const ChatbotScreen = ({ language, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    const welcomeMessage = {
      role: 'model',
      text: language === 'en' 
        ? 'Hello! I am Ulinzi, your AI safety assistant. How can I help you today? You can ask for safety tips, legal help, or counselling.' 
        : 'Habari! Mimi ni Ulinzi, msaidizi wako wa usalama. Ninawezaje kukusaidia leo? Unaweza kuuliza vidokezo vya usalama, msaada wa kisheria, au ushauri nasaha.'
    };
    setMessages([welcomeMessage]);
  }, [language]);


  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    
    // Stop listening if it's active
    if (isListening) {
      setIsListening(false);
      // In a real app: Voice.stop();
    }

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await getChatbotResponse(input, language, messages);
    
    const modelMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };
  
  const handleMicClick = async () => {
    const hasPermission = await checkAndRequestMicrophonePermission();
    if (!hasPermission) {
        Alert.alert('Permission Denied', 'Please grant microphone access in your device settings to use voice input.');
        return;
    }
    
    if (isListening) {
      setIsListening(false);
      // Real app: Voice.stop();
    } else {
      setInput('');
      setIsListening(true);
      // Real app: Voice.start(language === 'sw' ? 'sw-KE' : 'en-US');
      // Voice.onSpeechResults = (e) => setInput(e.value?.[0] || '');
      // Voice.onSpeechEnd = () => setIsListening(false);
      // Voice.onSpeechError = (e) => { console.error(e); setIsListening(false); };
    }
  };

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft width={24} height={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Support Chat</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={[...messages, ...(isLoading ? [{ role: 'model', text: 'loading' }] : [])]}
        keyExtractor={(_, index) => index.toString()}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => {
            if (item.text === 'loading') {
                return (
                    <View style={styles.loadingContainer}>
                        <View style={styles.loadingDots}>
                            <ActivityIndicator size="small" color="#4A41C3" />
                        </View>
                    </View>
                );
            }
            return (
                <View style={[styles.messageRow, item.role === 'user' ? styles.userRow : styles.modelRow]}>
                    <View style={[styles.messageBubble, item.role === 'user' ? styles.userBubble : styles.modelBubble]}>
                        <Text style={item.role === 'user' ? styles.userText : styles.modelText}>{item.text}</Text>
                    </View>
                </View>
            );
        }}
        style={styles.messageList}
        contentContainerStyle={{ paddingBottom: 16 }}
      />


      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          placeholder={
            isListening 
              ? 'Listening...' 
              : language === 'en' 
                ? 'Type or speak your message...' 
                : 'Andika au ongea ujumbe wako...'
          }
          style={styles.input}
          placeholderTextColor="#6B7280"
          editable={!isLoading}
        />
        <TouchableOpacity
          onPress={handleMicClick}
          style={[styles.iconButton, isListening && styles.micListening]}
        >
          <Microphone width={20} height={20} color={isListening ? '#FFF' : '#4A41C3'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSend}
          disabled={isLoading || input.trim() === ''}
          style={[styles.iconButton, styles.sendButton, (isLoading || input.trim() === '') && styles.disabledButton]}
        >
          <PaperPlane width={20} height={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' },
    backButton: { padding: 8, marginLeft: -8, marginRight: 8 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#4A41C3' },
    messageList: { flex: 1, paddingHorizontal: 8 },
    messageRow: { flexDirection: 'row', marginVertical: 4 },
    userRow: { justifyContent: 'flex-end' },
    modelRow: { justifyContent: 'flex-start' },
    messageBubble: { maxWidth: '80%', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
    userBubble: { backgroundColor: '#4A41C3', borderBottomRightRadius: 4 },
    modelBubble: { backgroundColor: '#E5E7EB', borderBottomLeftRadius: 4 },
    userText: { color: '#FFF' },
    modelText: { color: '#111827' },
    loadingContainer: { flexDirection: 'row', justifyContent: 'flex-start' },
    loadingDots: { backgroundColor: '#E5E7EB', borderRadius: 20, borderBottomLeftRadius: 4, paddingHorizontal: 16, paddingVertical: 12 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E5E7EB', borderRadius: 999, padding: 8, borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)' },
    input: { flex: 1, backgroundColor: 'transparent', color: '#000', paddingHorizontal: 12, fontSize: 16 },
    iconButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    micListening: { backgroundColor: '#ef4444' /* red-500 */ },
    sendButton: { backgroundColor: '#4A41C3', marginLeft: 8 },
    disabledButton: { backgroundColor: 'rgba(0,0,0,0.2)' },
});

export default ChatbotScreen;
