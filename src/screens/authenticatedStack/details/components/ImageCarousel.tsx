import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { h, w } from '../../../../common/styles/PixelPerfect';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import CustomImageComponent from './CustomImageComponent.tsx';

type Props = {
    images: [{ url: string; slot: string }];
};
const ImageCarousel = ({ images }: Props) => {
    const ref1 = useRef(null);
    const [screenWidth, setScreenWidth] = React.useState(0);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    useEffect(() => {
        console.log('images', images);
    }, []);
    return (
        <View
            style={styles.mainContainer}
            onLayout={e => {
                console.log('layout', e.nativeEvent.layout);
                setScreenWidth(e.nativeEvent.layout.width);
            }}>
            <FlatList
                ref={ref1}
                data={images}
                horizontal
                pagingEnabled
                // scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={[
                                styles.imageContainer,
                                { width: screenWidth },
                            ]}>
                            {/*<Image style={styles.img} source={{ uri: item }} />*/}
                            <CustomImageComponent image={item} />
                        </View>
                    );
                }}
                onTouchMove={e => {
                    // console.log('move', e.nativeEvent);
                }}
                onScroll={e => {
                    const scrollOffset = e.nativeEvent.contentOffset.x;
                    setCurrentIndex(Math.round(scrollOffset / screenWidth));
                }}
            />
            <View style={styles.imageCounterContainer}>
                <View style={styles.smallCounterContainer}>
                    <Text style={styles.counter}>{currentIndex + 1}</Text>
                    <Text style={styles.counter}>/</Text>
                    <Text style={styles.counter}>{images.length}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        flex: 1,
        height: '100%',
        width: 200,
        position: 'relative',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageCounterContainer: {
        position: 'absolute',
        bottom: h(8),
        width: '100%',
        zIndex: 30,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',

        padding: 10,
        height: h(65),
        pointerEvents: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: w(4),
    },
    counter: {
        ...commonFonts.regularText,
        color: Colors.primary,
    },
    smallCounterContainer: {
        flexDirection: 'row',
        gap: w(4),
        // paddingVertical: h(12),
        // paddingHorizontal: w(16),
        justifyContent: 'center',
        alignItems: 'center',
        width: w(65),
        height: h(43),
        backgroundColor: Colors.black300,
        borderRadius: w(50),
    },
});

export default ImageCarousel;
