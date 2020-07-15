import * as signalR from "@microsoft/signalr";

export enum CardExchangeHubMethod {
  Subscribe = 'subscribe',
  Unsubcribe = 'unsubcribe',
  Update = 'update',
  RequestCardExchange = 'requestCardExchange',
  AcceptCardExchange = 'acceptCardExchange',
  SendCardData = 'sendCardData'
}

export class CardExchangeHub {
  connection: signalR.HubConnection;

  constructor(connection: signalR.HubConnection) {
    this.connection = connection;
  }

  public Subscribe = async (deviceId: string, longitude: number, latitude: number, displayName: string) => {
    return await this.connection.send(CardExchangeHubMethod.Subscribe, deviceId, longitude, latitude, displayName)
  };
  public Unsubcribe = async (deviceId: string) => {
    return await this.connection.send(CardExchangeHubMethod.Unsubcribe, deviceId)
  };
  public Update = async (deviceId: string, longitude: number, latitude: number, displayName: string) => {
    return await this.connection.send(CardExchangeHubMethod.Update, deviceId, longitude, latitude, displayName)
  };
  public RequestCardExchange = async (deviceId: string, peerDeviceId: string, displayName: string) => {
    return await this.connection.send(CardExchangeHubMethod.RequestCardExchange, deviceId, peerDeviceId, displayName)
  };
  public AcceptCardExchange = async (deviceId: string, peerDeviceId: string, displayName: string, cardData: string) => {
    return await this.connection.send(CardExchangeHubMethod.AcceptCardExchange, deviceId, peerDeviceId, displayName, cardData)
  };
  public SendCardData = async (deviceId: string, peerDeviceId: string, displayName: string, cardData: string) => {
    return await this.connection.send(CardExchangeHubMethod.SendCardData, deviceId, peerDeviceId, displayName, cardData)
  };
}