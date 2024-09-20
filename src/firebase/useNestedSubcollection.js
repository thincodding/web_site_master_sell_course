import { projectFirestore } from "@/config/config";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref } from "vue";


//this is file use for nested SubCollection
const useNestedDocument = (rootCollectionName, parentId, subCollectionName, documentId, subSubCollectionName) => {
    const isLoading = ref(false);

    //add nested Subcollection
    const addDocs = async (formDoc) => {
        if (!parentId || !documentId) {
            console.error("Both parentId and documentId are required");
            return null;
        }

        // Correct Firestore path structure: collection -> document -> collection -> document -> collection
        const parentRef = doc(projectFirestore, rootCollectionName, parentId);
        const subCollectionRef = doc(parentRef, subCollectionName, documentId);
        const subSubCollectionRef = collection(subCollectionRef, subSubCollectionName);

        try {
            isLoading.value = true;
            const docRef = await addDoc(subSubCollectionRef, formDoc);
            return docRef;
        } catch (err) {
            console.error("Error adding document to nested subcollection:", err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };


    // Function to delete a document from a nested subcollection
    const deleteDocs = async (subSubCollectionDocId) => {
        if (!parentId || !documentId || !subSubCollectionDocId) {
            console.error("ParentId, DocumentId, and SubSubCollectionDocId are required");
            return null;
        }

        const nestedDocRef = doc(
            projectFirestore,
            rootCollectionName,
            parentId,
            subCollectionName,
            documentId,
            subSubCollectionName,
            subSubCollectionDocId
        );

        try {
            isLoading.value = true;
            await deleteDoc(nestedDocRef);
            console.log(`Successfully deleted document with ID ${subSubCollectionDocId}`);
        } catch (err) {
            console.error("Error deleting document from nested subcollection:", err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    // Function to update a document in a nested subcollection
    const updateDocs = async (docId, updatedData) => {
        if (!parentId || !documentId || !docId) {
            console.error("Both parentId, documentId, and docId are required");
            return null;
        }

        // Construct the Firestore path: collection -> document -> collection -> document -> collection -> document
        const parentRef = doc(projectFirestore, rootCollectionName, parentId);
        const subCollectionRef = doc(parentRef, subCollectionName, documentId);
        const subSubCollectionRef = doc(subCollectionRef, subSubCollectionName, docId);

        try {
            isLoading.value = true;
            // Perform the update operation
            await updateDoc(subSubCollectionRef, updatedData);
        } catch (err) {
            console.error("Error updating document in nested subcollection:", err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    return { addDocs, isLoading, deleteDocs, updateDocs };
};


export default useNestedDocument;
