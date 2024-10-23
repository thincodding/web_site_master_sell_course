import { projectFirestore } from '@/config/config';
import { collection, getDocs } from 'firebase/firestore';

// Function to check if a category has associated products
const useValidateExist = async (categoryId) => {
    const docRef = collection(projectFirestore, 'categories', categoryId, 'product');
    const categorySnapshot = await getDocs(docRef);
    return !categorySnapshot.empty; 
};
export default useValidateExist;
