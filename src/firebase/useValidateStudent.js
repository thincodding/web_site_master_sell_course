import { projectFirestore } from '@/config/config';
import { collection, getDocs } from 'firebase/firestore'; 


const checkValidateExistStudents = async (categoryId, productId, productDetailId) => {
    const docRef = collection(projectFirestore, 'categories', categoryId, 'product', productId, 'productDetail', productDetailId, 'student');
    
    try {
        const studentSnapshot = await getDocs(docRef);
        return !studentSnapshot.empty; 
    } catch (error) {
        console.error("Error fetching enrolled students: ", error);
        return false; 
    }
};

export default checkValidateExistStudents; 
