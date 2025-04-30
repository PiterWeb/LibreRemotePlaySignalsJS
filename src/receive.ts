import { ClientCode, Server } from "./types";

export default async function receiveClientCode(s: Server, ID: number) {

    const connUrl = `${s.getUrl()}?role=host&id=${ID}`;

    console.log("Connecting to server at: ", connUrl);

    const conn = new WebSocket(connUrl);

    const msg = await waitForOneMessage(conn)

    const client_code: ClientCode = JSON.parse(msg);

    return client_code;

}

export function waitForOneMessage(ws: WebSocket): Promise<string> {
    return new Promise((resolve, reject) => {
      const handler = async (event: MessageEvent<any>) => {
        ws.removeEventListener('message', handler); // Ensure it only runs once
        const data = event.data;
        if (data instanceof Blob) {
            resolve(await data.text());
          }
        reject("data is not a string");
      };
      ws.addEventListener('message', handler);
    });
}