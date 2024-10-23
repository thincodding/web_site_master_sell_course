import { projectFirestore } from '@/config/config'; 
import { collection, getDocs } from 'firebase/firestore'; 

const useForValidateProduct = async (categoryId, productId) => {
    const docRef = collection(projectFirestore, 'categories', categoryId, 'product', productId, 'productDetail');
    
    try {
        const productSnapshot = await getDocs(docRef);
        return !productSnapshot.empty; 
    } catch (error) {
        console.error("Error fetching product details: ", error);
        return false; 
    }
};

export default useForValidateProduct; 
