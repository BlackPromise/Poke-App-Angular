import { Routes } from './routes';

const KEY = '_Inf';

export class MyStorage extends Routes {

    get(): any[] {
        const res = sessionStorage.getItem(KEY);
        return res ? JSON.parse(res) : [];
    }

    post(data) {
        sessionStorage.setItem(KEY, JSON.stringify(data));
    }

    delete() {
        sessionStorage.removeItem(KEY);
    }

}
