import {  doc, deleteDoc } from 'firebase/firestore';

import { projectFirestore } from '@/config/config';

// Delete a document from Firestore
export const useDeleteDocument = () => {
    const deleteDocument = async (collectionName, docId, subcollectionName = null) => {
        try {
            let documentRef;
            if (subcollectionName) {
                documentRef = doc(projectFirestore, `${collectionName}/${docId}/${subcollectionName}`);
            } else {
                documentRef = doc(projectFirestore, `${collectionName}/${docId}`);
            }

            await deleteDoc(documentRef);
            console.log(`Document ${docId} deleted from ${collectionName}${subcollectionName ? `/${subcollectionName}` : ''}`);

        } catch (error) {
            console.error(`Error deleting document ${docId} from ${collectionName}:`, error);
        }
    };

    return { deleteDocument };
};
