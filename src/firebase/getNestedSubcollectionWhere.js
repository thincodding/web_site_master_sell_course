import { collection, query, getDocs } from "firebase/firestore";
import { projectFirestore } from "@/config/config"; // Your Firebase config

// Fetch a Firestore collection
export const fetchCollection = async (collectionName) => {
  try {
    const collectionRef = collection(projectFirestore, collectionName);
    const snapshot = await getDocs(collectionRef);
    if (snapshot.empty) {
      console.warn(`No documents found in collection: ${collectionName}`);
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching collection: ${collectionName}`, error);
    throw error;
  }
};

// Fetch a subcollection
export const fetchSubcollection = async (parentCollection, parentId, subCollection) => {
  try {
    const subCollectionRef = collection(projectFirestore, parentCollection, parentId, subCollection);
    const snapshot = await getDocs(subCollectionRef);
    if (snapshot.empty) {
      console.warn(`No documents found in subcollection: ${parentCollection}/${parentId}/${subCollection}`);
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching subcollection: ${parentCollection}/${parentId}/${subCollection}`, error);
    throw error;
  }
};

// Fetch nested subcollection with an optional query
export const fetchNestedSubcollection = async (parentCollection, parentId, subCollection, subId, nestedCollection, queryCondition = null) => {
  try {
    const nestedRef = collection(projectFirestore, parentCollection, parentId, subCollection, subId, nestedCollection);
    
    // Apply query condition if provided
    const q = queryCondition ? query(nestedRef, ...queryCondition) : nestedRef;

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.warn(`No documents found in nested subcollection: ${parentCollection}/${parentId}/${subCollection}/${subId}/${nestedCollection}`);
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching nested subcollection: ${parentCollection}/${parentId}/${subCollection}/${subId}/${nestedCollection}`, error);
    throw error;
  }
};
