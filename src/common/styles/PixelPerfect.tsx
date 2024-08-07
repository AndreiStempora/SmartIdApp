import { convertX, convertY, scaleFont } from 'react-native-responsive-pixels';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';

export const w = (nr: number, WIDTH = 380) => {
    const number = convertX(nr, WIDTH);
    return isNaN(number) ? nr : number;
};

const height = Platform.OS === 'ios' ? 800 : 722;
export const h = (nr: number, HEIGHT = height) => {
    const number = convertY(nr, HEIGHT);
    return isNaN(number) ? nr : number;
};

// export const f = (nr: number, WIDTH = 380) => {
//     const number = scaleFont(nr, WIDTH);
//     return isNaN(number) ? nr : number;
// };

export const f = (nr: number, WIDTH = 722) => {
    const number = RFValue(nr, WIDTH);
    return isNaN(number) ? nr : number;
};
