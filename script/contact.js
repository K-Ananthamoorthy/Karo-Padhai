import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCN0VLc3wYAeKBk06g-HVtE4dDPcEZo6xk",
authDomain: "aiml-smvitm.firebaseapp.com",
databaseURL: "https://aiml-smvitm-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "aiml-smvitm",
storageBucket: "aiml-smvitm.appspot.com",
messagingSenderId: "867145474581",
appId: "1:867145474581:web:a2e294081b458bdb69e41c",
measurementId: "G-64CF103MLC"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Continue with the rest of your client-side code here
const form = document.getElementById('contactForm');
form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const usn = formData.get('usn');
    const phone = formData.get('phone');
    const message = formData.get('message');

    try {
        // Create a reference to the "messages" collection
        const messagesCollection = collection(db, 'messages');
        // Use the email as the document ID
        const messageDoc = doc(messagesCollection, email);
        // Set the contact details as a new document with the email as the document ID
        await setDoc(messageDoc, {
            name: name,
            email: email,
            usn: usn,
            phone: phone,
            message: message,
            timestamp: new Date().toISOString()
        });
        // Show toast notification
        const toastElement = document.getElementById('contactToast');
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        // Reset form after successful submission
        form.reset();

        
        
    } catch (error) {
        console.error('Error adding document: ', error);
        alert('An error occurred. Please try again later.');
    }
});
