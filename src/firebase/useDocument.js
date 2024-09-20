import { projectFirestore } from "@/config/config";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { ref } from "vue";

const useDocument = (collectionName, id, subCollectionName) => {
    const isLoading = ref(false);

    const addDocs = async (formDoc) => {
        if (!id) {
            console.error("Document ID is required");
            return;
        }

        const documentRef = doc(projectFirestore, collectionName, id);
        const subCollectionRef = collection(documentRef, subCollectionName);

        try {
            isLoading.value = true;
            await addDoc(subCollectionRef, formDoc);
        } catch (err) {
            console.error("Error adding document to subcollection:", err);
        } finally {
            isLoading.value = false;
        }
    };

    const deleteDocs = async (collectionName, docId, subcollectionName = null) => {
        try {
            if (subcollectionName) {
                // Handle deletion of subcollection documents first
                const subcollectionRef = collection(projectFirestore, collectionName, docId, subcollectionName);
                const subcollectionSnapshot = await getDocs(subcollectionRef);

                // Delete all subcollection documents
                const deletionPromises = subcollectionSnapshot.docs.map((subDoc) => deleteDoc(subDoc.ref));
                await Promise.all(deletionPromises);
                console.log(`All documents in ${subcollectionName} subcollection deleted  ${docId}.`);
            }

            // Delete the main document
            const docRef = doc(projectFirestore, collectionName, docId);
            await deleteDoc(docRef);
            console.log(`Document in ${collectionName} with ID ${docId} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting document or subcollection:", error);
            throw error;
        }
    };

    return { addDocs, isLoading, deleteDocs };
};

export default useDocument;
