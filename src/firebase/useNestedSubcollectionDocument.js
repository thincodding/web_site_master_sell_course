import { projectFirestore } from "@/config/config";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { ref } from "vue";

const useNestedSubDocument = (rootCollectionName, parentId, subCollectionName, documentId, subSubCollectionName, subNestDocument, subSubSubCollectionName) => {
    const isLoading = ref(false);
    const error = ref(null);
    // Add nested subcollection and deeper subcollection
    const addDocs = async (formDoc) => {
        if (!parentId || !documentId) {
            console.error("Both parentId and documentId are required");
            return null;
        }

        // Correct Firestore path structure: collection -> document -> collection -> document -> collection -> document -> collection
        const parentRef = doc(projectFirestore, rootCollectionName, parentId);
        const subCollectionRef = doc(parentRef, subCollectionName, documentId);
        const subSubCollectionRef = doc(subCollectionRef, subSubCollectionName, subNestDocument);
        const subSubSubCollectionRef = collection(subSubCollectionRef, subSubSubCollectionName);

        try {
            isLoading.value = true;
            const docRef = await addDoc(subSubSubCollectionRef, formDoc);
            return docRef;
        } catch (err) {
            console.error("Error adding document to nested sub-subcollection:", err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    // Delete all documents in the sub-sub-sub-collection
    // const deleteDocs = async () => {
    //     if (!parentId || !documentId || !subNestDocument) {
    //         console.error("parentId, documentId, and subNestDocument are required");
    //         return null;
    //     }

    //     // Firestore path structure: collection/document/collection/document/collection/document/collection
    //     const parentRef = doc(projectFirestore, rootCollectionName, parentId);
    //     const subCollectionRef = doc(parentRef, subCollectionName, documentId);
    //     const subSubCollectionRef = doc(subCollectionRef, subSubCollectionName, subNestDocument);
    //     const subSubSubCollectionRef = collection(subSubCollectionRef, subSubSubCollectionName);

    //     try {

    //         // Fetch all documents in the sub-sub-sub-collection
    //         const snapshot = await getDocs(subSubSubCollectionRef);

    //         // Delete each document in the sub-sub-sub-collection
    //         const deletePromises = snapshot.docs.map(async (subSubDoc) => {
    //             // Correctly create a document reference for each document
    //             const docRef = doc(subSubSubCollectionRef, subSubDoc.id);
    //             await deleteDoc(docRef);
    //         });

    //         // Wait for all deletions to complete
    //         await Promise.all(deletePromises);

    //         console.log('All documents in sub-sub-sub-collection deleted successfully.');
    //     } catch (err) {
    //         console.error("Error deleting documents from nested sub-sub-collection:", err);
    //         error.value = err.message;
    //     } 
    // };

    const deleteDocs = async (subSubSubDocId) => {
        if (!parentId || !documentId || !subNestDocument || !subSubSubDocId) {
            console.error("parentId, documentId, subNestDocument, and subSubSubDocId are required");
            return null;
        }
    
        // Firestore path structure: collection/document/collection/document/collection/document/collection
        const parentRef = doc(projectFirestore, rootCollectionName, parentId);
        const subCollectionRef = doc(parentRef, subCollectionName, documentId);
        const subSubCollectionRef = doc(subCollectionRef, subSubCollectionName, subNestDocument);
        const subSubSubCollectionRef = collection(subSubCollectionRef, subSubSubCollectionName);
    
        try {
            // Create a reference to the specific document in the sub-sub-sub-collection
            const docRef = doc(subSubSubCollectionRef, subSubSubDocId);
    
            // Delete the document by its ID
            await deleteDoc(docRef);
    
            console.log(`Document with ID ${subSubSubDocId} deleted successfully.`);
        } catch (err) {
            console.error("Error deleting document from sub-sub-sub-collection:", err);
            error.value = err.message;
        }
    };
    

    return { addDocs, isLoading, deleteDocs };
};

export default useNestedSubDocument;
