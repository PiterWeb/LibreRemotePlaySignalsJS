import assert, { rejects } from "node:assert";
import test from "node:test";
import { SendClientCode, SendHostCode, ReceiveClientCode, server } from "..";

test("signaling", async () => {

    const url = "ws://localhost:8080/ws";

    const s = server(url);

    const client_code = {
        data: "client code",
    };

    const host_code = {
        data: "host code",
    };

    
    // Promise to wait in parallel
    const parallel = new Promise<void>((resolve, reject) => {
        setTimeout(async () => {
            try {
                console.log("Sending client code to server...");
                const host_code2 = await SendClientCode(s, client_code, 1);
                assert.deepEqual(host_code2, host_code);
                console.log("Received host code from server: ", host_code2);
                resolve();
            } catch (err) {
                reject(err);
                console.error("Error in sending client code: ", err);
            }
        }, 0);
    });

    try {

        
        const client_code2 = await ReceiveClientCode(s, 1);
        
        assert.deepEqual(client_code2, client_code);
        console.log("Received client code successfully: ", client_code2);
        console.log("Sending host code to server...");
        
        await SendHostCode(s, host_code, 1);
        
        console.log("Host code sent successfully: ", host_code);
        
        await parallel;
        
    } catch (err) {
        console.error("Error in receiving client code: ", err);
    }

})