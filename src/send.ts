import { console } from "inspector";
import { ClientCode, HostCode, Server } from "./types";
import { waitForOneMessage } from "./receive";

export async function sendClientCode(s: Server, client_code: ClientCode, ID: number) {

    const connUrl = `${s.getUrl()}?role=client&id=${ID}`;

    console.log("Connecting to server at: ", connUrl);

    const conn = new WebSocket(connUrl);

    conn.onopen = () => {
        conn.send(JSON.stringify(client_code));
    };

    const msg = await waitForOneMessage(conn)

    const host_code: HostCode = JSON.parse(msg);

    return host_code;

}

export async function sendHostCode(s: Server, host_code: HostCode, ID: number) {

    const connUrl = `${s.getUrl()}?role=host&id=${ID}`;

    console.log("Connecting to server at: ", connUrl);

    const conn = new WebSocket(connUrl);

    return new Promise<void>((resolve) => {
        conn.onopen = () => {
            conn.send(JSON.stringify(host_code));
            resolve()
        }
    })

}