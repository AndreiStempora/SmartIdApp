import {useFocusEffect, useRoute} from "@react-navigation/native";

const useRefreshPage = (nav:any) => {
    const route = useRoute();
    useFocusEffect(()=>{
        console.log('page focused')
        // nav.replace(route.name)
    })
};

export default useRefreshPage;
