import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// ============================================================================
// Firebase Configuration
// ============================================================================
// 🔐 Security Note: All credentials use NEXT_PUBLIC_* prefix, which means:
//    - These values ARE visible in the browser (part of Firebase's design)
//    - They are public by nature and NOT security-sensitive
//    - API keys are restricted at Firebase Console level
//    - Real secrets (Admin SDK, database passwords) should NEVER be here
// 
// 📋 Required Environment Variables (in .env.local):
//    - NEXT_PUBLIC_FIREBASE_API_KEY
//    - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
//    - NEXT_PUBLIC_FIREBASE_PROJECT_ID
//    - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
//    - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
//    - NEXT_PUBLIC_FIREBASE_APP_ID
// ============================================================================

// Firebase configuration (loaded from environment variables via Next.js)
// These values are injected by Next.js at build time (NEXT_PUBLIC_ prefix)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
} as const;

// Validate configuration at runtime (provides helpful error messages)
const validateConfig = () => {
  const missingVars: string[] = [];
  
  if (!firebaseConfig.apiKey) missingVars.push("NEXT_PUBLIC_FIREBASE_API_KEY");
  if (!firebaseConfig.authDomain) missingVars.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  if (!firebaseConfig.projectId) missingVars.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  if (!firebaseConfig.storageBucket) missingVars.push("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  if (!firebaseConfig.messagingSenderId) missingVars.push("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
  if (!firebaseConfig.appId) missingVars.push("NEXT_PUBLIC_FIREBASE_APP_ID");

  if (missingVars.length > 0) {
    const errorMsg = `Missing required Firebase environment variables:\n  - ${missingVars.join(
      "\n  - "
    )}\n\nPlease check your .env.local file. See .env.example for the template.`;
    
    console.error("❌ Firebase Configuration Error:", errorMsg);
    throw new Error(errorMsg);
  }
};

validateConfig();

// Initialize Firebase (reuse existing app if already initialized)
export const app: FirebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

// Get Firestore instance
export const db: Firestore = getFirestore(app);

// ============================================================================
// Security Best Practices Applied:
// ✅ Environment variables used instead of hardcoded values
// ✅ .env.local excluded from Git via .gitignore
// ✅ Runtime validation with clear error messages
// ✅ Public credentials clearly marked and documented
// ✅ No sensitive data (Admin SDK keys, database passwords) in frontend
// ✅ Configuration validation warns of missing variables
// ============================================================================

