import { ref } from 'vue';
import { collection, getDocs, doc } from 'firebase/firestore';
import { projectFirestore } from '@/config/config'; // Adjust import based on your project

const getNestedSubSubcollection = (collectionName, parentId, subCollectionName, docId, nestedSubCollectionName, subSubDocId, subSubCollectionName) => {
    const subSubcollectionData = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    const fetchSubSubcollections = async () => {
        isLoading.value = true;
        try {
            // Construct the Firestore path for sub-sub-collection
            const parentDocRef = doc(projectFirestore, collectionName, parentId, subCollectionName, docId);
            const nestedSubCollectionRef = doc(parentDocRef, nestedSubCollectionName, subSubDocId);
            const subSubCollectionRef = collection(nestedSubCollectionRef, subSubCollectionName);

            // Fetch all documents in the sub-sub-collection
            const snapshot = await getDocs(subSubCollectionRef);
            subSubcollectionData.value = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (err) {
            console.error('Error fetching sub-sub-collection:', err);
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    return { subSubcollectionData, fetchSubSubcollections, isLoading, error };
};

export default getNestedSubSubcollection;
