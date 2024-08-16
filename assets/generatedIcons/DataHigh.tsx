import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const DataHigh = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'65'}
		height={height ? height:'64'}
		viewBox="0 0 65 64"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M32.5001 52.2051L4.29492 24C8.12399 20.6473 12.4231 18.0313 17.1923 16.1521C21.9616 14.2729 27.0641 13.3333 32.5001 13.3333C37.9394 13.3333 43.038 14.2729 47.7958 16.1521C52.5536 18.0313 56.8568 20.6473 60.7052 24L32.5001 52.2051ZM15.2659 31.7915C17.7285 29.959 20.4066 28.5234 23.3001 27.4846C26.1935 26.4459 29.2601 25.9265 32.5001 25.9265C35.74 25.9265 38.8083 26.4459 41.7052 27.4846C44.6021 28.5234 47.2933 29.959 49.7787 31.7915L57.3275 24.2085C53.7308 21.4792 49.8485 19.3604 45.6804 17.8521C41.5123 16.3439 37.1189 15.5897 32.5001 15.5897C27.8813 15.5897 23.4878 16.3439 19.3197 17.8521C15.1516 19.3604 11.2693 21.4792 7.67266 24.2085L15.2659 31.7915Z"
		fill={fill ? fill:'#23C36D'}/>
</Svg>

    )
}
export default DataHigh;