import useText from '../../../common/services/hooks/textHook.tsx';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import { useEffect, useState } from 'react';
import LanguageSelect from '../../../common/components/forms/formComponents/select/LanguageSelect.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    getApp,
    getAppLanguage,
    updateAppInfo,
} from '../../../common/store/slices/appSlice.tsx';
import { AppDispatch } from '../../../common/store/store.tsx';
import {
    getTranslation,
    updateTranslation,
} from '../../../common/store/slices/translationSlice.tsx';

const LanguageScreen = ({ navigation }: any) => {
    const { getRequest, postRequest } = apiHeadersHook();
    const { t } = useText();
    const [languages, setLanguages] = useState([]);
    const language = useSelector(getAppLanguage);
    const app = useSelector(getApp);
    const translation = useSelector(getTranslation);
    const [indexOfCurrentLanguage, setIndexOfCurrentLanguage] = useState(-1);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (async () => {
            const response = await getRequest('/languages/list');
            if (response.status === 'ok') {
                setLanguages(response.languages);
            }
        })();
    }, []);

    useEffect(() => {
        //@ts-ignore
        const x = languages.findIndex(el => el.code == language);
        console.log(x, languages, language, 'dddd', app);
        setIndexOfCurrentLanguage(x);
    }, [languages]);

    useEffect(() => {
        console.log(translation, 'cc');
    }, [translation]);

    useEffect(() => {
        console.log('language +++++++++', language);
        (async () => {
            const response = await postRequest('/languages/details', {});
            if (response.status === 'ok') {
                dispatch(
                    updateTranslation(
                        response.language['novosteer-tradein-app']
                    )
                );
            }
        })();
    }, [language]);

    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent title={t('language.title')} backBtn={true} />
            }>
            {indexOfCurrentLanguage !== -1 && (
                <LanguageSelect
                    data={languages}
                    onChange={async e => {
                        //@ts-ignore
                        dispatch(updateAppInfo({ language: e.code }));
                    }}
                    label={t('language.button')}
                    selectedIndex={indexOfCurrentLanguage}
                />
            )}
        </ScreenContainer>
    );
};

export default LanguageScreen;
