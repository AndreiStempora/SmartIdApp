import { View } from 'react-native';
import HeaderComponent from '../../screenComponents/bars/headers/HeaderComponent.tsx';
import CustomScanner from '../CustomScanner.tsx';
import CustomTextTabBar from '../../screenComponents/bars/tabBars/CustomTextTabBar.tsx';
import React, { useState } from 'react';
import CustomHeaderIconButton from '../../buttons/buttonIcon/CustomHeaderIconButton.tsx';
import useText from '../../../services/hooks/textHook.tsx';

type Props = {
    onScan: (code: string) => void;
    handleOpenScanner: () => void;
};
const DefaultScannerComponent = ({ onScan, handleOpenScanner }: Props) => {
    const { t } = useText();
    const [scanErrorText, setScanErrorText] = useState(
        t('scanVin.scannerText')
    );

    const processCode = (code: string) => {
        if (code.length === 17) {
            return code;
        } else if (code.length === 18) {
            return code.slice(1);
        } else if (code.length === 19) {
            return code.slice(1, -1);
        } else if (code.length === 20) {
            return code.slice(2, -1);
        }
        return code;
    };

    const processNonBarCode = (code: string) => {
        const regex = /^[A-Za-z0-9]+$/;
        const newCode = regex.test(code);
        if (newCode) {
            return code;
        }
        return null;
    };
    const handleTypeQR = (codes: any) => {
        // console.log(codes[0].value, 'qr');
        return processNonBarCode(codes[0].value.split(',')[0]);
    };
    const handleTypeBarcode = (codes: any) => {
        // console.log(codes[0].value, 'barcode');
        return processCode(codes[0].value);
    };
    const handleTypeDataMatrix = (codes: any) => {
        // console.log(codes[0].value, 'data-matrix');
        return processNonBarCode(codes[0].value);
    };
    const handleScan = async (codes: any) => {
        let actualCode: string | null = '';
        if (codes[0].type === 'qr') {
            actualCode = handleTypeQR(codes);
        }
        if (codes[0].type === 'code-39') {
            actualCode = handleTypeBarcode(codes);
        }
        if (codes[0].type === 'data-matrix') {
            actualCode = handleTypeDataMatrix(codes);
        }
        if (actualCode === null || actualCode.length !== 17) {
            return;
        }
        onScan(actualCode);
        handleOpenScanner();
    };
    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <HeaderComponent
                backBtn={false}
                leftSide={
                    <CustomHeaderIconButton
                        icon={'arrowPrevious'}
                        onPress={handleOpenScanner}
                    />
                }
            />
            <CustomScanner
                onCodeScanned={handleScan}
                scanTypes={['code-39', 'data-matrix', 'qr']}
            />
            <CustomTextTabBar text={scanErrorText} />
        </View>
    );
};

export default DefaultScannerComponent;
