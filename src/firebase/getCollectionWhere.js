import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { projectFirestore } from "@/config/config"; 

const getCollectionWhere = async (collectionName, docId) => {
    try {
        // Create a query to filter by document ID
        const q = query(
            collection(projectFirestore, collectionName),
            where(documentId(), "==", docId) 
        );

        const querySnapshot = await getDocs(q);
        const results = [];
        
        querySnapshot.forEach((doc) => {
            console.log("Document ID:", doc.id, " => Data:", doc.data());
            results.push({ id: doc.id, data: doc.data() });
        });
        
        console.log("Results:", results);
        return results; 
    } catch (err) {
        console.log("Error fetching content:", err);
    }
};

export default getCollectionWhere;
