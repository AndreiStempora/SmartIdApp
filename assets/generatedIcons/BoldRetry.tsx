import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BoldRetry = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M11 20.4307C9.12433 20.187 7.57208 19.3608 6.34325 17.9519C5.11442 16.5429 4.5 14.8923 4.5 12.9999C4.5 11.9833 4.70067 11.0093 5.102 10.0779C5.50333 9.14644 6.0655 8.32811 6.7885 7.62294L7.85775 8.69219C7.24358 9.25253 6.78042 9.90286 6.46825 10.6432C6.15608 11.3835 6 12.1691 6 12.9999C6 14.4666 6.46825 15.7593 7.40475 16.8779C8.34125 17.9964 9.53967 18.6807 11 18.9307V20.4307ZM13 20.4499V18.9499C14.4437 18.6576 15.6379 17.9579 16.5828 16.8509C17.5276 15.7439 18 14.4603 18 12.9999C18 11.3333 17.4167 9.91661 16.25 8.74994C15.0833 7.58328 13.6667 6.99994 12 6.99994H11.6463L12.9962 8.34994L11.9423 9.40369L8.7885 6.24994L11.9423 3.09619L12.9962 4.14994L11.6463 5.49994H12C14.0923 5.49994 15.8654 6.22686 17.3193 7.68069C18.7731 9.13452 19.5 10.9076 19.5 12.9999C19.5 14.8819 18.884 16.5243 17.652 17.9269C16.4198 19.3294 14.8692 20.1704 13 20.4499Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default BoldRetry;