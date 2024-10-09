import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(); // Initialize Firebase Auth
const provider = new GoogleAuthProvider(); // Initialize Google Auth Provider

const signInWithGoogle = () => {

    signInWithPopup(auth, provider)  // Use the Google provider here
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log("Google Access Token:", token);
            
            // The signed-in user info
            const user = result.user;
            console.log("User Info:", user);
            // Navigate to the home page on successful sign-in
            window.location.href = "/";
         
        })
        .catch((error) => {
            // Handle Errors here
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData?.email;  // Email might not always be available
            const credential = GoogleAuthProvider.credentialFromError(error);
            
            console.error("Error Code:", errorCode);
            console.error("Error Message:", errorMessage);
            console.error("Email:", email);
            console.error("Credential:", credential);
        });
};

const useSigninWithGoogle = () => {
    return { signInWithGoogle }; // Correct function name
};

export default useSigninWithGoogle;
