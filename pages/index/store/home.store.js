import { extendObservable, computed, action, observer, autorun } from '../../../libs/mobx/index';
import * as Api from '../api/home.api';
import regeneratorRuntime from '../../../libs/regeneratorRuntime';

const Store = function () {
    extendObservable(this, {
        list: []
    });

    this.getList = async () => {
        let res;
        try {
            res = await Api.getList();
        } catch (error) {
            console.warn(error);
            return false;
        }

        this.list = res;
    }
}

export default new Store();