# 🤖 GenAI Chatbot - Your Intelligent AI Assistant

> **Experience the future of AI conversation with our beautiful, installable Progressive Web App!**

A stunning, modern chatbot application built with Angular 15+ that delivers intelligent AI-powered responses through Google's Generative AI. Features a gorgeous glass morphism UI with dual theme support and can be installed as a native app on any device!

![GenAI Chatbot](https://img.shields.io/badge/PWA-Ready-brightgreen) ![Angular](https://img.shields.io/badge/Angular-15+-red) ![AI](https://img.shields.io/badge/AI-Google%20Gemini-blue)

## ✨ Key Features

### 🎨 **Beautiful UI/UX**
- **Glass Morphism Design** - Modern frosted glass effects with backdrop blur
- **Dual Theme Support** - Light (Orange-White) & Dark (Navy Blue) modes
- **iPhone-Style Toggle** - Smooth animated theme switcher
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Animated Messages** - Smooth fade-in animations and typing indicators

### 🧠 **AI-Powered Intelligence**
- **Google Gemini AI** - Free, powerful AI responses
- **Real-time Chat** - Instant question and answer functionality
- **Smart Formatting** - Automatic text formatting with bold, lists, and paragraphs
- **Message History** - Keep track of your conversations
- **Error Handling** - Graceful fallbacks for network issues

### 📱 **Progressive Web App (PWA)**
- **Install Anywhere** - Add to home screen on mobile/desktop
- **Offline Ready** - Works without internet connection
- **Native Feel** - App-like experience when installed
- **Custom Icon** - Beautiful neural network branded icon
- **Fast Loading** - Optimized performance and caching

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Angular CLI

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd GenAI
```

2. **Install dependencies:**
```bash
npm install --legacy-peer-deps
```

3. **Add your Google AI API key:**
   - Get your free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Update `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiKey: 'your-google-ai-api-key-here'
   };
   ```

4. **Start the development server:**
```bash
ng serve
```

5. **Open your browser:**
   Navigate to `http://localhost:4200` and start chatting!

## 📱 Install as PWA

### On Mobile (iOS/Android):
1. Open the app in your browser
2. Tap the **Share** button (iOS) or **Menu** (Android)
3. Select **"Add to Home Screen"**
4. Enjoy the native app experience!

### On Desktop:
1. Look for the **install icon** in your browser's address bar
2. Click **"Install GenAI Chatbot"**
3. Launch from your desktop or start menu

## 🎯 How to Use

1. **💬 Start Chatting** - Type any question in the input field
2. **🎨 Switch Themes** - Toggle between light and dark modes
3. **📱 Install App** - Add to home screen for quick access
4. **🔄 Enjoy Responses** - Get intelligent, formatted AI responses

## 🛠️ Tech Stack

- **🅰️ Angular 15** - Modern web framework with standalone components
- **🎨 Tailwind CSS** - Utility-first CSS with glass morphism effects
- **🤖 Google Generative AI** - Free Gemini AI API for intelligent responses
- **📱 PWA** - Progressive Web App with offline capabilities
- **⚡ TypeScript** - Type-safe JavaScript for better development
- **🔄 RxJS** - Reactive programming for smooth user experience

## 🎨 Themes

### 🌅 Light Mode (Default)
- Warm orange-white gradient background
- Glass panels with subtle transparency
- Perfect for daytime use

### 🌙 Dark Mode
- Cool navy blue gradient background
- Deep glass morphism effects
- Easy on the eyes for night use

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── chat/           # Main chat interface
│   │   └── message/        # Individual message bubbles
│   ├── services/
│   │   └── chatbot.service.ts  # Google AI integration
│   └── models/
│       └── message.model.ts    # Message data structure
├── assets/
│   └── icons/              # PWA icons (72x72 to 512x512)
├── manifest.json           # PWA configuration
├── sw.js                  # Service worker for offline support
└── styles.css             # Global Tailwind styles
```

## 🔧 Build & Deploy

```bash
# Development build
ng build

# Production build
ng build --prod

# Serve built files
npx http-server dist/gen-ai
```

## 🤝 Contributing

We welcome contributions! Here's how:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨💻 Created By

**Aman Rajbhar**  
🌐 Portfolio: [https://amnnrajbhar.github.io/info/](https://amnnrajbhar.github.io/info/)  
📧 Connect with me for collaborations and projects!

---

⭐ **Star this repo if you found it helpful!** ⭐

*Built with ❤️ using Angular, Tailwind CSS, and Google AI*