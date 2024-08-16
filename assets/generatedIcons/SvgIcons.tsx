import React from 'react';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import BackBtnIcon from './BackBtnIcon';
import Camera from './Camera';
import DataCompleted from './DataCompleted';
import DataFail from './DataFail';
import DataHigh from './DataHigh';
import DataLoader from './DataLoader';
import DataLow from './DataLow';
import DataMed from './DataMed';
import DataSafe from './DataSafe';
import Gallery from './Gallery';
import LogOut from './LogOut';
import Menu from './Menu';
import Scan from './Scan';
import Search from './Search';
import Verified from './Verified';
import Warning from './Warning';
import Watch from './Watch';

type Props = {
    icon: 'ArrowLeft' | 'ArrowRight' | 'BackBtnIcon' | 'Camera' | 'DataCompleted' | 'DataFail' | 'DataHigh' | 'DataLoader' | 'DataLow' | 'DataMed' | 'DataSafe' | 'Gallery' | 'LogOut' | 'Menu' | 'Scan' | 'Search' | 'Verified' | 'Warning' | 'Watch' | string ;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
};

const SvgIcons = ({ icon, width, height, stroke, fill }: Props) => {

     if (icon === 'ArrowLeft') {
            return (
                <ArrowLeft
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'ArrowRight') {
            return (
                <ArrowRight
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'BackBtnIcon') {
            return (
                <BackBtnIcon
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'Camera') {
            return (
                <Camera
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'DataCompleted') {
            return (
                <DataCompleted
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'DataFail') {
            return (
                <DataFail
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'DataHigh') {
            return (
                <DataHigh
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'DataLoader') {
            return (
                <DataLoader
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'DataLow') {
            return (
                <DataLow
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'DataMed') {
            return (
                <DataMed
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'DataSafe') {
            return (
                <DataSafe
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'Gallery') {
            return (
                <Gallery
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'LogOut') {
            return (
                <LogOut
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'Menu') {
            return (
                <Menu
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'Scan') {
            return (
                <Scan
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'Search') {
            return (
                <Search
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'Verified') {
            return (
                <Verified
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'Warning') {
            return (
                <Warning
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'Watch') {
            return (
                <Watch
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
        
    
    return <></>;
};

export default SvgIcons;