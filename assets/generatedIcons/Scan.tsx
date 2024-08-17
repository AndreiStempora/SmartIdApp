import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Scan = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M2.5 5.5V1.5H6.5V2.5H3.5V5.5H2.5ZM20.5 5.5V2.5H17.5V1.5H21.5V5.5H20.5ZM2.5 22.5V18.5H3.5V21.5H6.5V22.5H2.5ZM17.5 22.5V21.5H20.5V18.5H21.5V22.5H17.5ZM6.5 17.8846C6.5 18.0385 6.5641 18.1795 6.6923 18.3077C6.82052 18.4359 6.96154 18.5 7.11538 18.5H16.8846C17.0385 18.5 17.1795 18.4359 17.3077 18.3077C17.4359 18.1795 17.5 18.0385 17.5 17.8846V6.11538C17.5 5.96154 17.4359 5.82052 17.3077 5.6923C17.1795 5.5641 17.0385 5.5 16.8846 5.5H7.11538C6.96154 5.5 6.82052 5.5641 6.6923 5.6923C6.5641 5.82052 6.5 5.96154 6.5 6.11538V17.8846ZM7.11538 19.5C6.65512 19.5 6.27083 19.3458 5.9625 19.0375C5.65417 18.7292 5.5 18.3449 5.5 17.8846V6.11538C5.5 5.65512 5.65417 5.27083 5.9625 4.9625C6.27083 4.65417 6.65512 4.5 7.11538 4.5H16.8846C17.3449 4.5 17.7292 4.65417 18.0375 4.9625C18.3458 5.27083 18.5 5.65512 18.5 6.11538V17.8846C18.5 18.3449 18.3458 18.7292 18.0375 19.0375C17.7292 19.3458 17.3449 19.5 16.8846 19.5H7.11538ZM9.5 9.5H14.5V8.5H9.5V9.5ZM9.5 12.5H14.5V11.5H9.5V12.5ZM9.5 15.5H14.5V14.5H9.5V15.5ZM6.5 17.8846V5.5V18.5V17.8846Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default Scan;