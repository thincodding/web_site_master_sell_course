import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink as firebaseSignInWithEmailLink } from "firebase/auth";

const auth = getAuth();

// Function to send the sign-in link via email
const sendSignInLink = async (email) => {
    const actionCodeSettings = {
        // URL the user will be redirected to after clicking the email link.
        url: 'http://localhost:8080/verify',  // Replace with your app's URL
        handleCodeInApp: true, // This must be true for passwordless sign-in
    };

    try {
        // Send the email with the sign-in link
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        console.log("Email sent!");
        // Save the user's email in localStorage to complete sign-in later
        window.localStorage.setItem('emailForSignIn', email);
    } catch (error) {
        console.error("Error sending sign-in link:", error.message);
        throw new Error(error.message);
    }
};

// Function to complete the sign-in process after the user clicks the link
const completeSignIn = async () => {
    const email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
        throw new Error("No email found for sign-in.");
    }

    if (isSignInWithEmailLink(auth, window.location.href)) {
        try {
            const result = await firebaseSignInWithEmailLink(auth, email, window.location.href);
            console.log("Successfully signed in:", result.user);
            window.localStorage.removeItem('emailForSignIn'); // Clear the email from storage
            return result.user;
        } catch (error) {
            console.error("Error completing sign-in:", error.message);
            throw new Error(error.message);
        }
    }
};

// Export the functions to use in Vue components
const useEmailLinkAuth = () => {
    return { sendSignInLink, completeSignIn };
};

export default useEmailLinkAuth;
