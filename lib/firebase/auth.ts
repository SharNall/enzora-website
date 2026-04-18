import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { app } from "./client";

export const auth: Auth = getAuth(app);

// Admin login with email and password
export const adminLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      },
      token,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Login failed",
    };
  }
};

// Admin logout
export const adminLogout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Logout failed",
    };
  }
};

// Get current user
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Create admin user (for setup purposes - should be called from backend only)
export const createAdminUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      uid: userCredential.user.uid,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "User creation failed",
    };
  }
};
