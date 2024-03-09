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
  const {
    pname,
    lname,
    phoneNumber,
    email,
    password,
    rePassword,
    ...additionalInfo
  } = userData;
  // In a real application, ensure you hash the password before storing it.
  const newUserRef = db.collection("users").doc(); // Create a new document reference

  await newUserRef.set({
    pname,
    lname,
    phoneNumber,
    email,
    password,
    // Don't store rePassword as it's only for validation
    ...additionalInfo,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return newUserRef.id; // Return the new user's document ID
}

// "Login" by verifying user credentials (NOT secure as-is)
async function loginUser(email, password) {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "==", email).get();

  if (snapshot.empty) {
    throw new Error("No matching user");
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  // Here, you would verify the password, which should be hashed and compared securely
  // This is a placeholder and NOT secure
  if (userData.password === password) {
    // Passwords match - this is where you would return a session token or similar
    return userDoc.id; // For example purposes only
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
};


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
printUsers();
getUserPassword('eladgiving1@gmail.com');

export { admin, registerUser, loginUser, getUserPassword, printUsers };
