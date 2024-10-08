import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Gallery = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M5.61538 20C5.15513 20 4.77083 19.8458 4.4625 19.5375C4.15417 19.2292 4 18.8449 4 18.3846V5.61537C4 5.15512 4.15417 4.77083 4.4625 4.4625C4.77083 4.15417 5.15513 4 5.61538 4H18.3846C18.8449 4 19.2292 4.15417 19.5375 4.4625C19.8458 4.77083 20 5.15512 20 5.61537V18.3846C20 18.8449 19.8458 19.2292 19.5375 19.5375C19.2292 19.8458 18.8449 20 18.3846 20H5.61538ZM5.61538 19H18.3846C18.5385 19 18.6795 18.9359 18.8077 18.8077C18.9359 18.6795 19 18.5385 19 18.3846V5.61537C19 5.46154 18.9359 5.32052 18.8077 5.1923C18.6795 5.0641 18.5385 5 18.3846 5H5.61538C5.46154 5 5.32052 5.0641 5.1923 5.1923C5.0641 5.32052 5 5.46154 5 5.61537V18.3846C5 18.5385 5.0641 18.6795 5.1923 18.8077C5.32052 18.9359 5.46154 19 5.61538 19ZM7.5 16.5H16.6538L13.8269 12.7308L11.2116 16.0385L9.46152 13.9231L7.5 16.5Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default Gallery;