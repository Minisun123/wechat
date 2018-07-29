import { extendObservable, computed, action, observer, autorun } from '../../../libs/mobx/index';
import * as Api from '../api/home.api';
import regeneratorRuntime from '../../../libs/regeneratorRuntime';

const Store = function () {
    extendObservable(this, {
        articalList: [],
        wordExplian: null,
        rankIndex: 0,
        get articalListLength() {
            return this.articalList.length ? this.articalList.length : 0;
        },
        get lastRankIndex() {
            if (!this.articalListLength) {
                return 0;
            }

            return this.articalList[this.articalList.length - 1].rankIndex;
        }
    });

    this.getArticalList = async (before) => {
        let res;
        try {
            res = await Api.getArticalList(before);
        } catch (error) {
            console.warn(error);
            return false;
        }

        this.articalList = res.data.m === 'ok' ? [...this.articalList, ...res.data.d.entrylist] : [];
    }

    this.getWordExplain = async word => {
        let res;
        try {
            res = await Api.getWordExplain(word);
        } catch (error) {
            console.warn(error);
            return false;
        }

        this.wordExplian = res;
    }

    this.clearAll = async () => {
        this.articalList = [];
        this.rankIndex = 0;
        this.getArticalList();
    }

    autorun(() => {
        if (this.rankIndex !== 0) {
            this.getArticalList(this.rankIndex);
        }
    })
}

export default new Store();