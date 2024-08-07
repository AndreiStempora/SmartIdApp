import {
    Camera,
    CameraDevice,
    useCameraDevice,
    useCameraPermission,
} from 'react-native-vision-camera';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

type Props = {
    photo: boolean;
    // cam:(Camera | null)=>void;
    cam: (el: Camera | null) => void;
    ultraWideExists?: (e: boolean) => void;
    wideScreen?: boolean;
};
const CustomCamera = ({ photo, cam, wideScreen, ultraWideExists }: Props) => {
    const [isActive, setIsActive] = useState(false);
    const device = useCameraDevice('back');
    const { hasPermission, requestPermission } = useCameraPermission();
    const camera = useRef<Camera>(null);
    const devs = Camera.getAvailableCameraDevices();
    const [ultraWideDevice, setUltraWideDevice] = useState<CameraDevice[]>([]);

    useEffect(() => {
        cam(camera.current);
        const wideDev = devs.filter((el: any) => {
            // el.physicalDevices.contains('ultra-wide-angle-camera');

            return el.physicalDevices.includes('ultra-wide-angle-camera');
        });
        if (wideDev.length > 0) {
            setUltraWideDevice([...wideDev]);
            ultraWideExists && ultraWideExists(true);
        }
    }, []);

    useEffect(() => {
        (async () => {
            if (device) {
                console.log('device', device);
                if (!hasPermission) {
                    await requestPermission().then(permission => {
                        if (permission) {
                            setIsActive(true);
                        }
                    });
                } else {
                    setIsActive(true);
                }
            }
        })();
        return () => {
            setIsActive(false);
        };
    }, []);

    useEffect(() => {
        console.log('wideScreen cam', wideScreen, ultraWideDevice.length > 0);
    }, [wideScreen]);

    if (!device) return null;

    return (
        <>
            <Camera
                enableZoomGesture={true}
                //@ts-ignore
                orientation={
                    Platform.OS === 'android'
                        ? 'landscape-left'
                        : 'landscape-right'
                }
                // maxZoom={3}
                photoQualityBalance={'balanced'}
                ref={camera}
                device={
                    wideScreen && ultraWideDevice.length > 0
                        ? ultraWideDevice[0]
                        : device
                }
                isActive={isActive}
                style={{
                    width: 'auto',
                    height: 'auto',
                    // aspectRatio:0.75,
                    flex: 1,
                }}
                photo={photo}
            />
        </>
    );
};
export default CustomCamera;
