# 🛡️ Ulinzi: AI Safety Companion

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B9?style=for-the-badge&logo=google-gemini&logoColor=white)

Ulinzi is an AI-powered safety and support application designed to protect individuals in high-risk situations. It features an emergency SOS, AI-powered danger detection, a bilingual AI chatbot for legal and mental health support, and a trusted contacts network.

---

## ✨ Key Features

-   **One-Tap SOS Alert:** Instantly send a distress signal with live location and AI-captured audio to your trusted contacts.
-   **Guardian Mode:** Proactively share your live location with trusted contacts for a set duration, providing peace of mind.
-   **Bilingual AI Support Chat:** Powered by the Google Gemini API, the chatbot offers compassionate guidance on safety, legal rights (Kenya-specific), and mental health in both **English** and **Swahili**.
-   **Trusted Contacts Network:** Easily manage a list of contacts who will be notified in an emergency. Designate a primary contact for priority alerts.
-   **Civic Hub:** A central place to find and book appointments with professional counsellors, with filters for expertise and age.
-   **Secure Authentication:** Standard sign-up and sign-in flow to protect user data.
-   **Data Persistence:** User data, contacts, and settings are saved locally on the device for a seamless experience.

## 🛠️ Tech Stack

-   **Framework:** [React Native](https://reactnative.dev/) (with [Expo](https://expo.dev/))
-   **AI Model:** [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash`)
-   **State Management:** React Hooks (`useState`, `useEffect`)
-   **Local Storage:** `@react-native-async-storage/async-storage`
-   **UI Components:**
    -   `@react-native-picker/picker` for dropdowns
    -   `react-native-svg` for custom icons
-   **Language:** JavaScript (JSX)

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [Git](https://git-scm.com/)
-   An iOS or Android simulator:
    -   **macOS:** [Xcode](https://developer.apple.com/xcode/)
    -   **Windows/Linux/macOS:** [Android Studio](https://developer.android.com/studio)
-   [Expo Go](https://expo.dev/go) app on your physical device (optional, for testing without a simulator)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ulinzi-app.git
    cd ulinzi-app
    ```

2.  **Install project dependencies:**
    The app requires specific native libraries. Install them using the `expo install` command to ensure version compatibility.
    ```bash
    npm install
    npx expo install @react-native-async-storage/async-storage @react-native-picker/picker react-native-svg
    ```

3.  **Set up your Gemini API Key:**
    The AI Chatbot requires a Google Gemini API key to function.
    -   Create a file named `.env` in the root of the project.
    -   Add your API key to the `.env` file as follows:
        ```
        API_KEY="YOUR_GEMINI_API_KEY_HERE"
        ```
    -   You can get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

1.  **Start the Metro server:**
    ```bash
    npx expo start
    ```
2.  **Launch the app on a simulator:**
    -   Make sure your iOS Simulator or Android Emulator is running.
    -   In the terminal where Metro is running:
        -   Press `i` to launch the app on the iOS Simulator.
        -   Press `a` to launch the app on the Android Emulator.

---

## 📁 Project Structure

```
ulinzi-app/
├── components/         # Reusable UI components for different screens
│   ├── ChatbotScreen.tsx
│   ├── ContactsScreen.tsx
│   ├── HomeScreen.tsx
│   └── ...
├── services/           # External API services (Gemini)
│   └── geminiService.ts
├── .env                # Environment variables (API Key) - Untracked by Git
├── App.tsx             # Main app component, handles routing and state
├── constants.ts        # App-wide constants (e.g., screen names)
└── index.tsx           # Entry point of the application
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to improve the app, please feel free to fork the repository, make your changes, and open a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
