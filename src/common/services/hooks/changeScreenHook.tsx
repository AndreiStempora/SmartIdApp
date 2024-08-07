import { useNavigation } from '@react-navigation/native';
import CustomHeaderIconButton from '../../components/buttons/buttonIcon/CustomHeaderIconButton.tsx';

type Response = {
    next: string;
    [key: string]: any;
};

const useChangeScreen = () => {
    const nav = useNavigation();
    const changeScreen = (responseObject: Response) => {
        try {
            if (responseObject?.next?.length > 0) {
                const destination =
                    responseObject.next.charAt(0).toUpperCase() +
                    responseObject.next.slice(1);
                // const nav = responseObject?.next
                //@ts-ignore
                nav.navigate(destination, responseObject);
            } else {
                console.log(
                    'error Nav, nowhere to navigate to',
                    responseObject
                );
            }
        } catch (error) {
            console.log('error Nav', error);
        }
    };

    const backButton = (responseObject: Response) => {
        try {
            if (responseObject?.back?.length > 0) {
                const destination =
                    responseObject.back.charAt(0).toUpperCase() +
                    responseObject.back.slice(1);
                // const nav = responseObject?.next
                console.log('destination', destination);
                // nav.navigate(destination, responseObject);
                return (
                    <CustomHeaderIconButton
                        onPress={() => {
                            //@ts-ignore
                            nav.navigate(destination, responseObject);
                        }}
                        icon={'arrowPrevious'}
                    />
                );
            } else {
                return false;
            }
        } catch (error) {
            console.log('error Nav', error);
        }
    };
    return { changeScreen, backButton };
};

export default useChangeScreen;
