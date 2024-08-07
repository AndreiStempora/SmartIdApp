import {getApp} from "../../store/slices/appSlice.tsx";
import {useSelector} from "react-redux";
import {getCurrentSelection} from "../../store/slices/selectedVehiclesSlice.tsx";
import {useEffect} from "react";
import handleImagesHook from "./handleImagesHook.tsx";

const useUtility = () => {
    const settings = useSelector(getApp).settings;
    const currentSelection = useSelector(getCurrentSelection);
    const { readFile } = handleImagesHook();
    const c = async (elem:any,string:string) =>{
        console.log(await elem,string);
    }

    const getCategory = (id: string) => {
        return settings.filter((setting)=> setting.id === id)[0];
    }

    const getSpot = (id: string) => {
        let arr:any = [];
        settings.forEach((setting)=> {
            const a = setting.spots.filter((spot:any)=> spot.id === id);
            arr = [...arr, ...a];
        })
        return arr[0];
    }

    const numberOfSpots = () =>{
        let count = 0;
        settings.forEach((setting)=> {
            count += setting.spots.length;
        })
        return count;
    }

    const usedSpots = async(vin:string) =>{
        const file = await readFile(vin);
        let counter = 0;
        file.spots.forEach((spot:any)=> {
            if(spot.photo !== ''){
                counter += 1;
            }
        });
        return counter;
    }

    const usedSpotsInCategory = async(vin:string,category:string) =>{
        const file = await readFile(vin);
        let counter = 0;
        const cat = file.spots.filter((spot:any)=> spot.categoryId === category);
        cat.forEach((spot:any)=> {
            if(spot.photo !== ''){
                counter += 1;
            }
        });
        return counter;
    }

    return {c, settings, currentSelection, getCategory, getSpot, numberOfSpots, usedSpots, usedSpotsInCategory}
};

export default useUtility;
