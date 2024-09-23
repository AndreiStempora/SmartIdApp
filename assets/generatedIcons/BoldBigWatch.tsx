import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ColorValue } from 'react-native';
type Props = {
    width?: number | undefined;
    height?: number | undefined;
    stroke?: ColorValue | undefined;
    fill?: ColorValue | undefined;
};

const BoldBigWatch = ({ width, height, stroke, fill }: Props) => {
    return (
        <Svg
            width={width ? width : '40'}
            height={height ? height : '40'}
            viewBox="0 0 40 40"
            fill="none"
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M16.6838 35L14.9058 28.5771C13.45 27.7835 12.2685 26.6242 11.3613 25.0992C10.4538 23.5744 10 21.8747 10 20C10 18.1253 10.4538 16.4244 11.3613 14.8975C12.2685 13.3703 13.45 12.2121 14.9058 11.4229L16.6838 5H23.3163L25.0942 11.4229C26.55 12.2121 27.7315 13.3703 28.6388 14.8975C29.5463 16.4244 30 18.1253 30 20C30 21.8747 29.5463 23.5744 28.6388 25.0992C27.7315 26.6242 26.55 27.7835 25.0942 28.5771L23.3163 35H16.6838ZM19.9971 28.5896C22.3857 28.5896 24.415 27.7557 26.085 26.0879C27.7547 24.4199 28.5896 22.3915 28.5896 20.0029C28.5896 17.6143 27.7557 15.585 26.0879 13.915C24.4199 12.2453 22.3915 11.4104 20.0029 11.4104C17.6143 11.4104 15.585 12.2443 13.915 13.9121C12.2453 15.5801 11.4104 17.6085 11.4104 19.9971C11.4104 22.3857 12.2443 24.415 13.9121 26.085C15.5801 27.7547 17.6085 28.5896 19.9971 28.5896ZM16.6346 10.6263C17.2385 10.436 17.8128 10.2892 18.3575 10.1858C18.9019 10.0825 19.4494 10.0308 20 10.0308C20.5506 10.0308 21.0981 10.0825 21.6425 10.1858C22.1872 10.2892 22.7615 10.436 23.3654 10.6263L22.2296 6.41042H17.7629L16.6346 10.6263ZM17.7704 33.5896H22.2371L23.3654 29.3737C22.7679 29.5599 22.1953 29.6986 21.6475 29.79C21.0997 29.8817 20.5506 29.9275 20 29.9275C19.4494 29.9275 18.9003 29.8817 18.3525 29.79C17.8047 29.6986 17.2321 29.5599 16.6346 29.3737L17.7704 33.5896Z"
                fill={fill ? fill : 'white'}
            />
        </Svg>
    );
};
export default BoldBigWatch;