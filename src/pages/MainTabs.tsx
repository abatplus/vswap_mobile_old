import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { people, qrCode, scan, share } from 'ionicons/icons';
import VcardView from './VcardView';
import QrView from './QrView';
import ScanView from './ScanView';


interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/vcard" render={() => <VcardView />} exact={true} />
        <Route path="/tabs/qrcode" render={() => <QrView />} exact={true} />
        <Route path="/tabs/scan" render={() => <ScanView />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule" href="/tabs/vcard">
          <IonIcon icon={people} />
          <IonLabel>Card</IonLabel>
        </IonTabButton>
        <IonTabButton tab="qrcode" href="/tabs/qrcode">
          <IonIcon icon={qrCode} />
          <IonLabel>QR</IonLabel>
        </IonTabButton>
        <IonTabButton tab="scan" href="/tabs/scan">
          <IonIcon icon={scan} />
          <IonLabel>Scan</IonLabel>
        </IonTabButton>
        { <IonTabButton tab="about" href="/tabs/swap">
          <IonIcon icon={share} />
          <IonLabel>Swap</IonLabel>
        </IonTabButton> }
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;