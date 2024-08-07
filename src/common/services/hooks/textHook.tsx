import { useSelector } from 'react-redux';
import { getTranslation } from '../../store/slices/translationSlice';
import Translation from './Translation.tsx';

const useText = () => {
    const texts = Translation;
    // useSelector(getTranslation);

    // useEffect(() => {
    //     console.log('texts changed', texts);
    // }, [texts]);
    const t = (path: string) => {
        // console.log('translation cccccc', texts);
        // Split the input string by dots
        const keys = path.split('.');
        // Iterate through the keys to navigate through the global object
        let currentObj: any = texts;
        for (const key of keys) {
            // Check if the key exists in the current object
            if (currentObj?.hasOwnProperty(key)) {
                // Update the current object
                currentObj = currentObj[key];
            } else {
                // If the key is not found, return '???'
                return '';
            }
        }

        // Return the value found at the end of the string
        return currentObj;
    };

    return {
        t,
        texts,
    };
};

export default useText;
