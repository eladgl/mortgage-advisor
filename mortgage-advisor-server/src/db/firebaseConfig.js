// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import admin from "firebase-admin";
// Import dotenv to load environment variables
import "dotenv/config";
import bcrypt from "bcrypt";

const saltRounds = 10;

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
  const { email, password, rePassword, ...userInfo } = userData;

  // Check if the email is already in use
  const usersRef = admin.firestore().collection('users');
  const snapshot = await usersRef.where('email', '==', email).get();
  if (!snapshot.empty) {
      throw new Error('Email already in use');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create the user record
  const newUserRef = usersRef.doc();
  await newUserRef.set({
      ...userInfo,
      email,
      password: hashedPassword,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Fetch the newly created user to return
  const savedUser = await newUserRef.get();
  const userToReturn = {
      id: newUserRef.id,
      ...savedUser.data(),
      password: undefined, // Exclude the password from the returned user object
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

  const passwordMatch = await bcrypt.compare(password, userData.password);

  if (passwordMatch) {
    // Placeholder for password check
    const { password, ...userWithoutPassword } = userData;
    return { id: userDoc.id, ...userWithoutPassword };
  } else {
    throw new Error("Invalid password");
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
async function getUserData(email) {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "==", email).get();

  if (snapshot.empty) {
    return null; // User not found
  }

  const userDoc = snapshot.docs[0];
  return { id: userDoc.id, ...userDoc.data() };
}

async function changePassword(userId, oldPassword, newPassword) {
  const userRef = db.collection("users").doc(userId);
  const doc = await userRef.get();

  if (!doc.exists) {
    throw new Error("User not found");
  }

  const userData = doc.data();

  const passwordMatch = await bcrypt.compare(oldPassword, userData.password);
  if (!passwordMatch) {
    throw new Error("Old password is incorrect");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
  await userRef.update({ password: hashedNewPassword });

  return true;
}
async function getUserDataById(userId) {
  const userRef = db.collection("users").doc(userId);
  const doc = await userRef.get();

  if (!doc.exists) {
    return null;
  }

  return { id: doc.id, ...doc.data() };
}

// Add a function to store check details
async function storeCheck(checkDetails) {
  const { userId, userPrivateName, userLastName, userEmail, formValues } = checkDetails;

  const checkRef = db.collection("mortgageChecks").doc();
  await checkRef.set({
    userId,
    userPrivateName,
    userLastName,
    userEmail,
    formValues,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const savedCheck = await checkRef.get();
  return { id: checkRef.id, ...savedCheck.data() };
}

async function storeResetToken(email, token, expires) {
  const userRef = db.collection("users").doc(email);
  await userRef.update({
      resetPasswordToken: token,
      resetPasswordExpires: expires
  });
}

async function getUserByEmail(email) {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "==", email).get();

  if (snapshot.empty) {
    console.error("User not found");
    return null;
  }

  const userDoc = snapshot.docs[0];
  return { id: userDoc.id, ...userDoc.data() };
}

async function getUserByResetToken(token) {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("resetPasswordToken", "==", token).get();

  if (snapshot.empty) {
    console.error("User not found for given reset token");
    return null;
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  // Check if token has expired
  const now = Date.now();
  if (userData.resetPasswordExpires < now) {
    console.error("Reset token has expired");
    return null;
  }

  return { id: userDoc.id, ...userData };
}
async function resetPassword(userId, newPassword) {
  const userRef = db.collection("users").doc(userId);
  const doc = await userRef.get();

  if (!doc.exists) {
    throw new Error("User not found");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
  await userRef.update({ password: hashedNewPassword });

  return true;
}

async function clearResetToken(userId) {
  const userRef = db.collection("users").doc(userId);
  await userRef.update({
      resetPasswordToken: null,
      resetPasswordExpires: null
  });
}

export {
  admin,
  registerUser,
  loginUser,
  printUsers,
  getUserData,
  changePassword,
  getUserDataById,
  storeCheck,
  storeResetToken,
  getUserByEmail,
  getUserByResetToken,
  resetPassword,
  clearResetToken
};
