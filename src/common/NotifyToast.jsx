import toast from 'react-hot-toast';
/**
 * 
 * @param string type 'error' || 'success'
 * @param string message 
 * @returns 
 */
export const notifySimple = (type, message) => {
    return toast[type](message)
}