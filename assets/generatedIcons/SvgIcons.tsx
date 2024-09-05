import React from 'react';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import BackArrowNew from './BackArrowNew';
import BackBtnIcon from './BackBtnIcon';
import Camera from './Camera';
import Checked from './Checked';
import Close from './Close';
import DataCompleted from './DataCompleted';
import DataFail from './DataFail';
import DataHigh from './DataHigh';
import DataLoader from './DataLoader';
import DataLow from './DataLow';
import DataMed from './DataMed';
import DataSafe from './DataSafe';
import Fullscreen from './Fullscreen';
import Gallery from './Gallery';
import GuardEmblem from './GuardEmblem';
import LogOut from './LogOut';
import Menu from './Menu';
import Scan from './Scan';
import Search from './Search';
import Shuffle from './Shuffle';
import Unchecked from './Unchecked';
import Verified from './Verified';
import VerifiedCheck from './VerifiedCheck';
import Warning from './Warning';
import Watch from './Watch';

type Props = {
    icon: 'ArrowLeft' | 'ArrowRight' | 'BackArrowNew' | 'BackBtnIcon' | 'Camera' | 'Checked' | 'Close' | 'DataCompleted' | 'DataFail' | 'DataHigh' | 'DataLoader' | 'DataLow' | 'DataMed' | 'DataSafe' | 'Fullscreen' | 'Gallery' | 'GuardEmblem' | 'LogOut' | 'Menu' | 'Scan' | 'Search' | 'Shuffle' | 'Unchecked' | 'Verified' | 'VerifiedCheck' | 'Warning' | 'Watch' | string ;
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
         if (icon === 'BackArrowNew') {
            return (
                <BackArrowNew
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
         if (icon === 'Checked') {
            return (
                <Checked
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'Close') {
            return (
                <Close
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
         if (icon === 'Fullscreen') {
            return (
                <Fullscreen
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
         if (icon === 'GuardEmblem') {
            return (
                <GuardEmblem
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
         if (icon === 'Shuffle') {
            return (
                <Shuffle
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
         if (icon === 'Unchecked') {
            return (
                <Unchecked
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
         if (icon === 'VerifiedCheck') {
            return (
                <VerifiedCheck
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