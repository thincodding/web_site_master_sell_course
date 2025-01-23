
import { ref } from 'vue';
import { collection, getDocs, doc } from 'firebase/firestore';
import { projectFirestore } from '@/config/config'; // Adjust import based on your project

const getNestedSubcollection = (collectionName, parentId, subCollectionName, docId, nestedSubCollectionName) => {
    const subcollectionData = ref([]);
    const isLoading = ref(false);
    
    const error = ref(null);

    const fetchSubcollections = async () => {
        isLoading.value = true;
        try {
            // Construct the correct document reference for the parent document
            const parentDocRef = doc(projectFirestore, collectionName, parentId, subCollectionName, docId);
            const nestedSubCollectionRef = collection(parentDocRef, nestedSubCollectionName);

            const snapshot = await getDocs(nestedSubCollectionRef);
            subcollectionData.value = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (err) {
            console.error('Error fetching nested subcollection:', err);
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    return { subcollectionData, fetchSubcollections, isLoading, error };
};

export default getNestedSubcollection;
