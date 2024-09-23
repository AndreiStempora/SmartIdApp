import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BoldVisible = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M12.0022 15.577C13.1354 15.577 14.0978 15.1804 14.8895 14.3872C15.6811 13.5941 16.077 12.6309 16.077 11.4978C16.077 10.3646 15.6804 9.40217 14.8872 8.6105C14.094 7.81883 13.1309 7.423 11.9977 7.423C10.8645 7.423 9.90212 7.81958 9.11045 8.61275C8.31879 9.40592 7.92295 10.3691 7.92295 11.5023C7.92295 12.6354 8.31954 13.5978 9.1127 14.3895C9.90587 15.1812 10.869 15.577 12.0022 15.577ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.56245 12.8875 9.29995 12.25 9.29995 11.5C9.29995 10.75 9.56245 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12.0012 18.5C9.7017 18.5 7.60645 17.8657 5.71545 16.597C3.82445 15.3285 2.43212 13.6295 1.53845 11.5C2.43212 9.3705 3.82395 7.6715 5.71395 6.403C7.60412 5.13433 9.69904 4.5 11.9987 4.5C14.2982 4.5 16.3935 5.13433 18.2845 6.403C20.1755 7.6715 21.5678 9.3705 22.4615 11.5C21.5678 13.6295 20.176 15.3285 18.286 16.597C16.3958 17.8657 14.3009 18.5 12.0012 18.5ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9666 13.1833 20.8 11.5C19.9666 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1166 6 8.38745 6.49583 6.81245 7.4875C5.23745 8.47917 4.03329 9.81667 3.19995 11.5C4.03329 13.1833 5.23745 14.5208 6.81245 15.5125C8.38745 16.5042 10.1166 17 12 17Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default BoldVisible;