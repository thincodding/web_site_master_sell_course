import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { ref } from 'vue';
import { projectFirestore } from '@/config/config';

// Fetch Firestore collection
export const useFirestoreCollection = (collectionName) => {
    const documents = ref([]);

    const fetchCollection = async () => {
        try {
            const querySnapshot = await getDocs(collection(projectFirestore, collectionName));
            documents.value = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            console.error(`Error fetching collection ${collectionName}:`, error);
        }
    };

    return { documents, fetchCollection };
};


// Fetch Firestore subcollection
export const useSubcollection = (parentCollection, docId, subcollectionName, orderByField) => {
    const subcollectionData = ref([]);

    const fetchSubcollection = async () => {
        try {
            let subcollectionRef = collection(projectFirestore, `${parentCollection}/${docId}/${subcollectionName}`);
            
            // Apply ordering if orderByField is provided
            if (orderByField) {
                subcollectionRef = query(subcollectionRef, orderBy(orderByField));
            }

            const querySnapshot = await getDocs(subcollectionRef);
            subcollectionData.value = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            console.error(`Error fetching subcollection ${subcollectionName} for document ${docId}:`, error);
        }
    };

    return { subcollectionData, fetchSubcollection };
};


//use nested document




