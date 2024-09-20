import { projectFirestore } from "@/config/config";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { ref, watchEffect } from "vue";

const getDocument = (collectionName, id, subCollection) => {
    const isLoading = ref(true);
    const documents = ref([]);

    // Ensure id and collectionName are provided
    if (!id || !collectionName) {
        console.error("Collection name and document ID must be provided.");
        return { documents, isLoading };
    }

    // Correctly reference the document
    const documentRef = doc(projectFirestore, `${collectionName}/${id}`);

    // Reference the subcollection
    const subCollectionRef = collection(documentRef, subCollection);

    // Listen for real-time updates
    const unsubscribe = onSnapshot(subCollectionRef, (qry) => {
        const result = [];
        qry.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
        });
        documents.value = result;
        isLoading.value = false;
    }, (err) => {
        console.error("Error fetching documents:", err);
    });

    // Cleanup function to stop listening to updates
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsubscribe());
    });

    return { documents, isLoading };
};

export default getDocument;
