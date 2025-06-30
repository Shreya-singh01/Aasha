# 🔥 Firebase Authentication Setup Guide

This guide will walk you through setting up Firebase authentication for your Guardian Angel Alliance project.

## 📋 Prerequisites

- A Google account
- Node.js and npm installed
- Your React project ready

## 🚀 Step-by-Step Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `guardian-angel-alliance`
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"

### 3. Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

### 4. Set Up Security Rules

1. In Firestore Database, go to "Rules" tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admin users can read all data
    match /{document=**} {
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 5. Get Firebase Configuration

1. Click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "Guardian Angel Web")
6. Copy the configuration object

### 6. Set Up Environment Variables

1. Create a `.env` file in your project root
2. Add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_APP_NAME=Guardian Angel Alliance
VITE_APP_VERSION=1.0.0
```

### 7. Install Dependencies

```bash
npm install firebase --legacy-peer-deps
```

### 8. Test the Setup

1. Start your development server:
```bash
npm run dev
```

2. Try to sign up with a new account
3. Check Firebase Console to see if the user was created
4. Try signing in with the created account

## 🔧 Configuration Files Created

The following files have been created/updated:

- `src/config/firebase.ts` - Firebase initialization
- `src/services/authService.ts` - Authentication service
- `src/utils/tokenUtils.ts` - JWT token management
- `src/components/auth-provider.tsx` - Updated auth context
- `src/components/signup-form.tsx` - Updated signup form
- `src/pages/LandingPage.tsx` - Updated login modal
- `src/vite-env.d.ts` - Environment variable types

## 🛡️ Security Features

✅ **JWT Token Management**
- Automatic token storage and retrieval
- Token expiration handling
- Secure token removal on logout

✅ **User Profile Management**
- User data stored in Firestore
- Role-based access control
- Email verification support

✅ **Error Handling**
- Comprehensive error messages
- User-friendly error display
- Network error handling

✅ **Authentication Flow**
- Email/password authentication
- Guest access support
- Automatic session management

## 🚨 Important Notes

1. **Never commit your `.env` file** - Add it to `.gitignore`
2. **Update Firestore rules** for production
3. **Enable email verification** for better security
4. **Set up password reset** functionality
5. **Configure CORS** if needed for your domain

## 🔍 Troubleshooting

### Common Issues:

1. **"Firebase not initialized"**
   - Check your environment variables
   - Ensure Firebase config is correct

2. **"Permission denied"**
   - Check Firestore security rules
   - Verify user authentication status

3. **"Network error"**
   - Check internet connection
   - Verify Firebase project settings

4. **"Invalid API key"**
   - Double-check your Firebase config
   - Ensure API key is correct

## 📞 Support

If you encounter issues:
1. Check Firebase Console for error logs
2. Verify all configuration steps
3. Check browser console for errors
4. Ensure all environment variables are set

## 🎉 Next Steps

After setup is complete:
1. Test all authentication flows
2. Set up email templates in Firebase
3. Configure additional sign-in methods if needed
4. Set up monitoring and analytics
5. Deploy to production with proper security rules 