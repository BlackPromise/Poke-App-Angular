import { MyData } from './myData';
import { MyStorage } from './myStorage';

export class Global extends MyStorage {

    Params = {};

    constructor(public myData: MyData) {
        super();
        this.loadParameters();
        this.myData.loadData();
    }

    loadParameters() {
        this.Params = this.parametersByUrl(window.location.href);
    }

    unLock() {

    }

    lock() {

    }

    Pages(Obj, pagina, cantidad) {
        return Obj.slice((pagina - 1) * cantidad, (pagina - 1) * cantidad + cantidad);
    }

    parametersByUrl(url) {
        // tslint:disable-next-line: prefer-const
        let Parameters = {};
        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
            Parameters[key] = value;
            return '';
        });
        url.replace(/[;&]+([^=&]+)=([^;]*)/gi, (m, key, value) => {
            Parameters[key] = value;
            return '';
        });
        return Parameters;
    }

    objectToArray(item: any, includeNullValues = false) {
        // tslint:disable-next-line: prefer-const
        let Result = [];
        Object.keys(item).forEach(key => {
            if (item[key] != null || includeNullValues) {
                Result.push({
                    key,
                    value: item[key]
                });
            }
        });
        return Result;
    }
}
