export type ClientCode = {
    data: string;
} 

export type HostCode = {
    data: string;
}

export class Server {
    private url: string;
    constructor(url: string) {
        this.url = url;
    }

    setUrl(url: string) {

        if (!URL.canParse(url)) {
            throw new Error("Invalid URL");
        }

        this.url = url;

    }

    getUrl() {
        return this.url;
    }

}

