import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const SteeringWheel = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM11 19.9V16.9C10 16.7 9.15 16.25 8.45 15.55C7.75 14.85 7.3 14 7.1 13H4.1C4.3 14.8167 5.04583 16.3583 6.3375 17.625C7.62917 18.8917 9.18333 19.65 11 19.9ZM13 19.9C14.8167 19.7 16.3708 18.9542 17.6625 17.6625C18.9542 16.3708 19.7 14.8167 19.9 13H16.9C16.7 14 16.25 14.85 15.55 15.55C14.85 16.25 14 16.7 13 16.9V19.9ZM4.1 11H7L10 8H14L17 11H19.9C19.65 8.98333 18.775 7.3125 17.275 5.9875C15.775 4.6625 14.0167 4 12 4C9.98333 4 8.225 4.6625 6.725 5.9875C5.225 7.3125 4.35 8.98333 4.1 11Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default SteeringWheel;