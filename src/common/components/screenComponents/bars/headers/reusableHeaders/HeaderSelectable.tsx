import HeaderComponent from "../HeaderComponent.tsx";
import CustomHeaderIconButton from "../../../../buttons/buttonIcon/CustomHeaderIconButton.tsx";
import {AppDispatch} from "../../../../../store/store.tsx";
import {useDispatch, useSelector} from "react-redux";
import {getSelectAll, updateIsSelectable, updateSelectAll} from "../../../../../store/slices/selectedVehiclesSlice.tsx";

type Props = {
    title: string;
}
const HeaderSelectable = ({title}:Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const selectAll = useSelector(getSelectAll);
    const handleSelectAll = () => {
        dispatch(updateSelectAll(!selectAll));
        console.log('xxxx')
    }
    const handleClose = () => {
        dispatch(updateIsSelectable(false));
    }
    return (
        <HeaderComponent
            title={title}
            leftSide={
                <CustomHeaderIconButton
                    icon={'closeIcon'}
                    onPress={handleClose}
                />
            }
            rightSide={
                <CustomHeaderIconButton
                    icon={'selectMultipleIcon'}
                    onPress={handleSelectAll}/>
            }
        />
    )
}

export default HeaderSelectable;
