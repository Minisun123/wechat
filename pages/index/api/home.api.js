import Request from "../../../utils/request";
import regeneratorRuntime from '../../../libs/regeneratorRuntime';
export const getList = async () => {
    const opts = {
        url: '/v1/get_entry_by_rank',
        params: {
            src: 'web',
            uid: '585cff60128fe1006de569a7',
            device_id: 1532341788938,
            token: 'eyJhY2Nlc3NfdG9rZW4iOiJ2S0k0bVJyMUs1YWRBeVhoIiwicmVmcmVzaF90b2tlbiI6InZRSUFqQmhoSmd6ek43RUciLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
            limit: 20,
            category: 'all',
            recomment: 1
        }
    };
    return await Request(opts);
}