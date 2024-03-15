// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import admin from "firebase-admin";
// Import dotenv to load environment variables
import "dotenv/config";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY_ID.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Additional optional fields if needed
  }),
});

const db = admin.firestore();
// Add a user to Firestore
async function registerUser(userData) {
  const { password, rePassword, ...userInfo } = userData;
  const newUserRef = db.collection("users").doc();

  await newUserRef.set({
    ...userInfo,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const savedUser = await newUserRef.get();
  const userToReturn = {
    id: newUserRef.id,
    ...savedUser.data(),
    password: undefined, // Remove sensitive data
  };

  return userToReturn;
}
async function loginUser(email, password) {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "==", email).get();

  if (snapshot.empty) {
    throw new Error("No matching user");
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  // Verify the password securely (hash comparison, etc.)
  if (userData.password === password) {
    // Placeholder for password check
    const { password, ...userWithoutPassword } = userData;
    return { id: userDoc.id, ...userWithoutPassword };
  } else {
    throw new Error("Invalid password");
  }
}

async function getUserPassword(email) {
  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) {
      console.error("User not found");
      return null; // or any other value to indicate user not found
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    console.log(userData.password);
    return userData.password;
  } catch (error) {
    console.error("Error retrieving password:", error);
    return null; // or any other value to indicate an error occurred
  }
}

async function printUsers() {
  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();

    if (snapshot.empty) {
      console.log("No users found");
      return;
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export { admin, registerUser, loginUser, getUserPassword, printUsers };
