import ReactNativeBlobUtil from 'react-native-blob-util';
import { useSelector } from 'react-redux';
import { getApp, getAppDomain } from '../../store/slices/appSlice.tsx';
import { Vehicle } from '../../tsTypes/commonTypes.tsx';
import { Platform } from 'react-native';

export type Spot = {
    id: string;
    name: string;
    type: string;
    categoryName: string;
    categoryId: string;
    photo: string;
    uploaded: boolean;
};

export type carFile = {
    car: Vehicle;
    vehicleVin: string;
    name: string;
    spots: Spot[];
    date: string;
};

const useHandleImages = () => {
    const domain = useSelector(getAppDomain);
    const app = useSelector(getApp);
    const set2 = [
        {
            id: '1',
            name: 'Exterior',
            spots: [
                {
                    id: '1',
                    name: 'Front',
                    type: '1',
                },
                {
                    id: '2',
                    name: 'Front Left',
                    type: '1',
                },
                {
                    id: '3',
                    name: 'Left',
                    type: '1',
                },
                {
                    id: '4',
                    name: 'Rear Left',
                    type: '1',
                },
                {
                    id: '5',
                    name: 'Rear',
                    type: '1',
                },
                {
                    id: '6',
                    name: 'Rear Right',
                    type: '1',
                },
                {
                    id: '7',
                    name: 'Right',
                    type: '1',
                },
                {
                    id: '8',
                    name: 'Front Right',
                    type: '1',
                },
            ],
        },
        {
            id: '2',
            name: 'Interior',
            spots: [
                {
                    id: '9',
                    name: 'Driver Seat',
                    type: '1',
                },
                {
                    id: '10',
                    name: 'Driver Seat Controls',
                    type: '1',
                },
                {
                    id: '11',
                    name: 'Driver Door Controls',
                    type: '1',
                },
                {
                    id: '12',
                    name: 'Steering Wheel',
                    type: '1',
                },
                {
                    id: '13',
                    name: 'Odometer',
                    type: '1',
                },
                {
                    id: '14',
                    name: 'Radio',
                    type: '1',
                },
                {
                    id: '15',
                    name: 'Reverse Camera',
                    type: '1',
                },
                {
                    id: '16',
                    name: 'Navigation',
                    type: '1',
                },
                {
                    id: '17',
                    name: 'Climate Control',
                    type: '1',
                },
                {
                    id: '18',
                    name: 'Shifter',
                    type: '1',
                },
                {
                    id: '19',
                    name: 'Central Console',
                    type: '1',
                },
                {
                    id: '20',
                    name: 'Sunroof',
                    type: '1',
                },
                {
                    id: '21',
                    name: 'Rear Seat',
                    type: '1',
                },
                {
                    id: '22',
                    name: '3rd Row',
                    type: '1',
                },
                {
                    id: '23',
                    name: 'Passenger Seat',
                    type: '1',
                },
            ],
        },
        {
            id: '3',
            name: 'Hotspots',
            spots: [
                {
                    id: '245',
                    name: 'Wheel333',
                    type: '1',
                },
                {
                    id: '25',
                    name: 'Trunk',
                    type: '1',
                },
            ],
        },
    ];

    const extractDomain = () => {
        let str = '';
        if (domain.indexOf('://') > -1) {
            str = domain.split('/')[2];
            console.log(str, 'str1');
        } else {
            str = domain.split('/')[0];
            console.log(str, 'str2');
        }
        // find & remove port number
        str = str.split(':')[0];
        return str;
    };

    const generateDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Pad with leading zero if needed
        const day = currentDate.getDate().toString().padStart(2, '0'); // Pad with leading zero if needed
        return `${year}-${month}-${day}`;
    };

    const generateCarSpots = () => {
        const carInfo: Spot[] = [];
        if (app.settings.length) {
            //@ts-ignore
            [...app.settings].forEach((setting: any) => {
                setting.spots.forEach((spot: any) => {
                    carInfo.push({
                        id: spot.id,
                        name: spot.name,
                        type: setting.id,
                        categoryName: setting.name,
                        categoryId: setting.id,
                        photo: '',
                        uploaded: false,
                    });
                });
            });
        }
        return carInfo;
    };

    const createDomainFolder = async () => {
        try {
            if (
                await ReactNativeBlobUtil.fs.exists(
                    `${
                        ReactNativeBlobUtil.fs.dirs.DocumentDir
                    }/${extractDomain()}`
                )
            ) {
                console.log(
                    'domain folder already exists',
                    `${
                        ReactNativeBlobUtil.fs.dirs.DocumentDir
                    }/${extractDomain()}`
                );
                return true;
            } else {
                await ReactNativeBlobUtil.fs.mkdir(
                    `${
                        ReactNativeBlobUtil.fs.dirs.DocumentDir
                    }/${extractDomain()}`
                );
                console.log(
                    'domain folder created successfully',
                    `${
                        ReactNativeBlobUtil.fs.dirs.DocumentDir
                    }/${extractDomain()}`
                );
                return true;
            }
        } catch (e) {
            console.log('error', e);
        }
    };

    const createCarFolder = async (
        folderName: string,
        carName: string,
        car: Vehicle
    ) => {
        try {
            if (
                await ReactNativeBlobUtil.fs.exists(
                    `${
                        ReactNativeBlobUtil.fs.dirs.DocumentDir
                    }/${extractDomain()}/${folderName}`
                )
            ) {
                console.log(
                    'folder already exists',
                    `${
                        ReactNativeBlobUtil.fs.dirs.DocumentDir
                    }/${extractDomain()}/${folderName}`
                );
                return true;
            } else {
                console.log('creating folder');
                await ReactNativeBlobUtil.fs.mkdir(
                    `${
                        ReactNativeBlobUtil.fs.dirs.DocumentDir
                    }/${extractDomain()}/${folderName}`
                );
                console.log('creating file');
                await ReactNativeBlobUtil.fs.createFile(
                    `${
                        ReactNativeBlobUtil.fs.dirs.DocumentDir
                    }/${extractDomain()}/${folderName}/.txt`,
                    '',
                    'utf8'
                );
                console.log('editing file');
                await editFile(folderName, {
                    vehicleVin: folderName,
                    name: carName,
                    spots: generateCarSpots(),
                    date: generateDate(),
                    car: car,
                });
                console.log(
                    'file created in folde ' + folderName + ' successfull',
                    `${
                        ReactNativeBlobUtil.fs.dirs.DocumentDir
                    }/${extractDomain()}/${folderName}/.txt`
                );
                return true;
            }
        } catch (e) {
            console.log('error', e);
        }
    };

    const readDomainFolder = async () => {
        try {
            // console.log(await ReactNativeBlobUtil.fs.ls(`${ReactNativeBlobUtil.fs.dirs.PictureDir}/${domainFolder}/`),'ddddddd')
            return await ReactNativeBlobUtil.fs.ls(
                `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${extractDomain()}/`
            );
        } catch (e) {
            console.log('error', e);
        }
    };

    const readCarFolder = async (folderName: string) => {
        try {
            return await ReactNativeBlobUtil.fs.ls(
                `${
                    ReactNativeBlobUtil.fs.dirs.DocumentDir
                }/${extractDomain()}/${folderName}/`
            );
        } catch (e) {
            console.log('error', e);
        }
    };

    const readFile = async (folderName: string) => {
        try {
            const text = await ReactNativeBlobUtil.fs.readFile(
                `${
                    ReactNativeBlobUtil.fs.dirs.DocumentDir
                }/${extractDomain()}/${folderName}/.txt`,
                'utf8'
            );
            if (text.length !== 0) {
                return JSON.parse(text);
            } else {
                return {};
            }
        } catch (e) {
            console.log('error', e);
            return {};
        }
    };

    const copyPicture = async (
        oldPath: string,
        newPathFolder: string,
        spotId: string
    ) => {
        try {
            console.log(oldPath, newPathFolder, spotId, 'oldPath');
            if (oldPath.startsWith('/')) {
                oldPath = 'file://' + oldPath;
            }
            if (Platform.OS === 'ios') {
                oldPath = oldPath.replace('file://', '');
            }
            let newPath =
                `file://${
                    ReactNativeBlobUtil.fs.dirs.DocumentDir
                }/${extractDomain()}/${newPathFolder}/` +
                oldPath.split('/').pop();
            if (Platform.OS === 'ios') {
                newPath =
                    `${
                        ReactNativeBlobUtil.fs.dirs.DocumentDir
                    }/${extractDomain()}/${newPathFolder}/` +
                    oldPath.split('/').pop();
            }
            // console.log(oldPath, newPath, 'oldPath');
            await ReactNativeBlobUtil.fs.cp(oldPath, newPath).then(async () => {
                console.log('file copied successfully', oldPath, newPath);
                await readFile(newPathFolder).then(async (x: any) => {
                    console.log(x.spots, 'spots');
                    const spotPhoto = x.spots.find(
                        (spot: Spot) => spot.id === spotId
                    );
                    console.log(spotPhoto, 'we edit this spot');
                    if (spotPhoto.photo.length) {
                        console.log('deleting old photo', spotPhoto.photo);
                        await ReactNativeBlobUtil.fs.unlink(spotPhoto.photo);
                    } else {
                        console.log('no photo to delete');
                    }
                });
            });
            //from path string to file name
            const fileName = newPath.split('/').pop();
            await editFile(newPathFolder, { photo: fileName }, '', spotId);
            await editFile(newPathFolder, { uploaded: false }, '', spotId);
            await ReactNativeBlobUtil.fs.unlink(oldPath);
            return newPath;

            // return data;
        } catch (e) {
            console.log('error', e);
        }
    };

    const onlyInFirstArray = (arr1: Spot[], arr2: Spot[]) => {
        const arr2Ids = new Set(arr2.map(obj => obj.id));
        const notInArr2 = arr1.filter(obj => !arr2Ids.has(obj.id));
        return [...notInArr2];
    };

    // const generateTestCar = () => {
    //     const carInfo:spot[] = [];
    //     //@ts-ignore
    //     set2.forEach((setting: any) => {
    //         setting.spots.forEach((spot: any) => {
    //             carInfo.push({
    //                 id: spot.id,
    //                 name: spot.name,
    //                 type: setting.id,
    //                 categoryName: setting.name,
    //                 categoryId: setting.id,
    //                 photo: '',
    //                 uploaded: false,
    //             });
    //         });
    //     });
    //     return carInfo;
    // }
    //
    // const changeSpot = async (file:carFile,change:spot[], del?:spot|{}) => {
    //     // console.log(file.spots);
    //     console.log(change,'aaa');
    //     change.forEach((spot:spot) => {
    //         file.spots.push(spot);
    //         //find spot in file.spots and delete it
    //         // const index = file.spots.findIndex((obj:spot) => obj.id === spot.id);
    //         // console.log(index,"///");
    //         // if(index !== -1){
    //         //     file.spots.splice(index,1);
    //         // }
    //         console.log(file.spots,'file.spots');
    //     });
    // }

    // const generatePicturePath = (carVin: string, photoName: string) => {
    //     const newPath =
    //         `${
    //             ReactNativeBlobUtil.fs.dirs.DocumentDir
    //         }/${extractDomain()}/${carVin}/` + photoName;
    //     console.log(newPath, 'newPath');
    // };
    const editFile = async (
        folderName: string,
        data?: object,
        keyToDelete?: string,
        spotId?: string
    ) => {
        // only data, edit key in car or add new key
        // only keyToDelete, delete key in car
        // data + spotId - edit key in spot id in car
        // data + spotId = '++' - add spot to car
        // only spotId = '' - delete spot from car
        try {
            const oldData = await readFile(folderName);
            let newData = { ...oldData };

            if (!spotId?.length) {
                newData = { ...oldData, ...data };
            }

            if (keyToDelete && newData.hasOwnProperty(keyToDelete)) {
                delete newData[keyToDelete];
            }

            if (spotId && newData.spots) {
                const spotIndex = newData.spots.findIndex(
                    (spot: { id: string }) => spot.id === spotId
                );
                if (spotIndex !== -1) {
                    newData.spots[spotIndex] = {
                        ...newData.spots[spotIndex],
                        ...data,
                    };
                } else {
                    console.log(`Spot with id ${spotId} not found.`);
                }
            }

            const isEmptyObject = (obj: object | undefined) => {
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        return false;
                    }
                }
                return true;
            };

            if (isEmptyObject(data) && spotId) {
                const spotIndex = newData.spots.findIndex(
                    (spot: { id: string }) => spot.id === spotId
                );
                if (spotIndex !== -1) {
                    newData.spots.splice(spotIndex, 1);
                } else {
                    console.log(`Spot with id ${spotId} not found.`);
                }
                console.log('deleting spot', spotId, spotIndex);
            }

            if (!isEmptyObject(data) && spotId === '++') {
                newData.spots.push(data);
            }

            await ReactNativeBlobUtil.fs.writeFile(
                `${
                    ReactNativeBlobUtil.fs.dirs.DocumentDir
                }/${extractDomain()}/${folderName}/.txt`,
                JSON.stringify(newData),
                'utf8'
            );
        } catch (e) {
            console.log('error', e);
        }
    };

    const getElementsInCategory = async (folder: string, category: string) => {
        const elements = await readFile(folder);
        return elements.spots.filter(
            (spot: Spot) => spot.categoryId === category
        );
    };
    // const updateSpots = async () => {
    //     const dom = await readDomainFolder();
    //     // const file = await readFile(dom[0]);
    //     //
    //     //     dom.forEach(async (folderName: string) => {
    //     //         console.log(await readFile(folderName),'---')
    //     //     });
    //
    //     //only do stuff if car folders exist
    //
    //     if (dom?.length) {
    //         const newCarSpots = generateCarSpots();
    //         const oldCarSpots = (await readFile(dom[0])).spots;
    //         const changesExist = await detectAnyChange(oldCarSpots, newCarSpots);
    //         if (changesExist) {
    //             const addThese = onlyInFirstArray(newCarSpots, oldCarSpots);
    //             const deleteThese = onlyInFirstArray(oldCarSpots, newCarSpots);
    //             dom.map(async (folderName: string) => {
    //                 addThese?.map(async (spot: spot) => {
    //                     await editFile(folderName, spot, "",'++');
    //                 });
    //                 deleteThese?.map(async (spot: spot) => {
    //                     await editFile(folderName, {}, '', spot.id);
    //                 });
    //             });
    //
    //         } else {
    //             console.log('no changes');
    //         }
    //     }
    // }

    // const detectAnyChange = async(oldList:spot[],newList:spot[]) => {
    //     const notCommon1 = onlyInFirstArray(oldList,newList);
    //     const notCommon2 = onlyInFirstArray(newList,oldList);
    //     if(notCommon1.length || notCommon2.length){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    const deleteFolder = async (folderName: string) => {
        try {
            await ReactNativeBlobUtil.fs.unlink(
                `${
                    ReactNativeBlobUtil.fs.dirs.DocumentDir
                }/${extractDomain()}/${folderName}`
            );
            console.log('folder deleted successfully');
        } catch (e) {
            console.log('error', e);
        }
    };

    const generatePicturePath = (carVin: string, photoName: string) => {
        // if photoname is empty, return empty string
        if (!photoName) {
            return '';
        }
        const newPath =
            `${
                ReactNativeBlobUtil.fs.dirs.DocumentDir
            }/${extractDomain()}/${carVin}/` + photoName;
        return newPath;
    };

    return {
        createDomainFolder,
        createCarFolder,
        readDomainFolder,
        readCarFolder,
        readFile,
        editFile,
        copyPicture,
        deleteFolder,
        getElementsInCategory,
        generatePicturePath,
    };
};

export default useHandleImages;

const x = [
    {
        id: '1',
        name: 'Front',
        type: '1',
        categoryName: '',
        categoryId: '',
        photo: '',
        uploaded: false,
    },
];
