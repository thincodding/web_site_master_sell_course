import { doc, updateDoc } from 'firebase/firestore';
import { projectFirestore } from '@/config/config'; // Ensure correct path

// Update a product in Firestore
export const useUpdateDocument = () => {
    const updateDocument = async (collectionName, docId, data, subcollectionPath = '') => {
        try {
            let documentRef;

            if (subcollectionPath) {
                documentRef = doc(projectFirestore, `${collectionName}/${docId}/${subcollectionPath}`);
            } else {
                documentRef = doc(projectFirestore, `${collectionName}/${docId}`);
            }

            await updateDoc(documentRef, data);
            console.log(`Document ${docId} updated in ${collectionName}${subcollectionPath ? `/${subcollectionPath}` : ''}`);

        } catch (error) {
            console.error(`Error updating document ${docId} in ${collectionName}:`, error);
            throw error; // Ensure the error is propagated
        }
    };

    return { updateDocument };
};
