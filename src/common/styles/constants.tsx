import { f, h } from './PixelPerfect.tsx';

const Fonts = {
    // Med: 'Inter-Medium',
    // Semi: 'Inter-SemiBold',
    Reg: 'InterTight-Regular',
    Semi: 'InterTight-SemiBold',
};
const Colors = {
    lightBlack: '#0E1013',
    charcoal: '#181818',
    lightCharcoal: '#202124',
    darkGray: '#2E3134',
    gray: '#3C4043',
    metal: '#8E9297',
    skyBlue: '#54A6FF',
    white: '#FFFFFF',
    error: '#FF4646',
    lime: '#23D354',
    silver: '#BDC1C6',
    bg: '#161616',
    toastBg: '#121212',
    primary: '#E2406B',
    grey100: '#858585',
    black100: '#121212',
    black300: '#262626',
    black400: '#363636',
    yellow100: '#D19D36',
};

//bold = Fonts.Semi
//regular = Fonts.Med
//title = lineHeight 24
//text = lineHeight 21
//small = fontSize 14
// ...  = fontSize 16
const commonFonts = {
    boldTitle: {
        fontFamily: Fonts.Semi,
        fontSize: f(16),
        lineHeight: f(24),
        color: Colors.white,
    },
    boldText: {
        fontFamily: Fonts.Semi,
        fontSize: f(16),
        lineHeight: f(21),
        color: Colors.white,
    },
    regularText: {
        fontFamily: Fonts.Reg,
        fontSize: f(16),
        lineHeight: f(21),
        color: Colors.white,
    },
    regularTextSmall: {
        fontFamily: Fonts.Reg,
        fontSize: f(14),
        lineHeight: f(21),
        color: Colors.white,
    },
    regularTitle: {
        fontFamily: Fonts.Reg,
        fontSize: f(16),
        lineHeight: h(24),
        color: Colors.white,
    },
    label: {
        fontFamily: Fonts.Semi,
        fontSize: f(16),
        lineHeight: f(19.2),
        color: Colors.metal,
    },
};

const commonBorders = {
    borderTop: {
        borderTopWidth: h(2),
        borderTopColor: Colors.metal,
    },
    borderBottom: {
        borderBottomWidth: h(2),
        borderBottomColor: Colors.metal,
    },
};

export { Fonts, Colors, commonFonts, commonBorders };
