import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import './ScanView.css';
import QrReader from 'react-qr-reader';

const ScanView: React.FC = () => {
  const [encodedText, setEncodedText] = useState<string>();
  const [qrWidth, setQrWidth] = useState<number>();
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    // calculate size depending on screen orientation
    let size = windowSize[1] > windowSize[0] ? windowSize[0] - 100 : windowSize[1] - 100;
    // limit max size
    size = size > 400 ? 400 : size;
    setQrWidth(size);
  }, [windowSize]);

  function updateWindowSize() {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }

  // only fire resize event after 500ms due performance reason
  let resizeId: NodeJS.Timeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(updateWindowSize, 500);
  });

  return (
    <IonPage id="scan">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Scan QR code</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">qr</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="qrReaderContainer">
          <QrReader
            className="qrReader"
            delay={300}
            onError={(err) => {
              // alert(err);
            }}
            onScan={(data) => {
              if (data !== null) {
                alert(data);
                setEncodedText(data as string);
              }
            }}
            style={{ width: qrWidth }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ScanView;
