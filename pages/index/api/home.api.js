import Request from "../../../utils/request";
import regeneratorRuntime from '../../../libs/regeneratorRuntime';
export const getArticalList = async (before) => {
    let opts = {
        url: '/v1/get_entry_by_rank',
        params: {
            src: 'web',
            uid: '585cff60128fe1006de569a7',
            device_id: 1532341788938,
            token: 'eyJhY2Nlc3NfdG9rZW4iOiJ2S0k0bVJyMUs1YWRBeVhoIiwicmVmcmVzaF90b2tlbiI6InZRSUFqQmhoSmd6ek43RUciLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
            limit: 20,
            category: 'all'
        }
    };
    if (before) {
        opts.params.before = before;
    }
    return await Request(opts);
}

export const getWordExplain = async word => {
    let opts = {
        connectUrl: false, // 不需要拼接config里面的域名
        url: 'https://www.pwxcoo.com/dictionary',
        params: {
            type: 'idiom',
            word
        }
    };

    return await Request(opts);
}