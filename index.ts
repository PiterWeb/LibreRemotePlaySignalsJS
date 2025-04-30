import { ClientCode, HostCode, Server } from "./src/types";
import {sendClientCode, sendHostCode} from "./src/send";
import receiveClientCode from "./src/receive";

export function server(url: string) {
    return new Server(url);
}

export function SendClientCode(s: Server, client_code: ClientCode, ID: number) {
    return sendClientCode(s, client_code, ID);
}

export function SendHostCode(s: Server, host_code: HostCode, ID: number) {
    return sendHostCode(s, host_code, ID);
}

export function ReceiveClientCode(s: Server, ID: number) {
    return receiveClientCode(s, ID);
}
