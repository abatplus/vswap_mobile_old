import React from 'react';
import { withRouter, useLocation } from 'react-router';
import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonImg,
} from '@ionic/react';
import { peopleOutline, scan } from 'ionicons/icons';
import { useAppContext } from '../store/contexts/AppContext';
import './Menu.css';
import { useIntl } from 'react-intl';
import IvCardTranslations from '../i18n/IvCardTranslations';
import { nameof } from '../utils';

interface IPages {
    title: string;
    path: string;
    icon?: string;
    routerDirection?: string;
}

const Menu: React.FC = () => {
    const location = useLocation();
    const { appContext } = useAppContext();

    const i18n = useIntl();

    const routes = {
        tabsPages: [
            {
                title: i18n.formatMessage({ id: nameof<IvCardTranslations>('Profiles') }),
                path: '/profile',
                icon: peopleOutline,
            },
            { title: i18n.formatMessage({ id: nameof<IvCardTranslations>('Scan') }), path: '/scan', icon: scan },
        ],
        appPages: [
            {
                title: i18n.formatMessage({ id: nameof<IvCardTranslations>('Terms_and_conditions') }),
                path: '/termsAndConditions',
            },
            { title: i18n.formatMessage({ id: nameof<IvCardTranslations>('Privacy_Protection') }), path: '/privacy' },
            { title: i18n.formatMessage({ id: nameof<IvCardTranslations>('Legal_Information') }), path: '/legal' },
            { title: i18n.formatMessage({ id: nameof<IvCardTranslations>('About') }), path: '/about' },
        ],
    };

    const renderListItems = (list: IPages[]) => {
        return list
            .filter((route) => !!route.path)
            .map((p) => (
                <IonMenuToggle key={p.title} auto-hide='false'>
                    <IonItem
                        detail={false}
                        routerLink={p.path}
                        routerDirection='none'
                        className={location.pathname.startsWith(p.path) ? 'selected' : undefined}
                        disabled={appContext.isLoading}>
                        {p.icon && <IonIcon slot='start' icon={p.icon} />}
                        <IonLabel>{p.title}</IonLabel>
                    </IonItem>
                </IonMenuToggle>
            ));
    };

    return (
        <IonMenu type='overlay' disabled={!appContext.menuEnabled} contentId='main'>
            <IonContent forceOverscroll={false}>
                <IonItem lines='none'>
                    <IonImg className='app-icon' src='../../assets/icon/Logo_dummy.png'></IonImg>
                </IonItem>
                <IonItem lines='inset'>
                    <IonLabel className='app-name'>
                        {i18n.formatMessage({ id: nameof<IvCardTranslations>('appName') })}
                    </IonLabel>
                </IonItem>
                <IonItem lines='inset'>
                    <IonList lines='none'>{renderListItems(routes.tabsPages)}</IonList>
                </IonItem>
                <IonList lines='none'>{renderListItems(routes.appPages)}</IonList>
            </IonContent>
            <IonFooter className='footer'>
                <IonToolbar>
                    <IonTitle className='powerdBy' size='small'>
                        powered by abat+
                    </IonTitle>
                </IonToolbar>
            </IonFooter>
        </IonMenu>
    );
};

export default withRouter(Menu);
