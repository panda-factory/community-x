// export default {
//     province: [{
//         "letter": "J",
//         "data": [
//             "江苏"
//         ]
//     }]
// };

export const getProvince = () : [{}] => {
    return [{
        "letter": "J",
        "data": [
            "江苏"
        ]
    }]
};

export const getCity = (province : string) : [{}] => {
    const citys: {[key: string]: any} = {
        "江苏": [{
            'letter': 'N',
            'data': ['南京']
        }]
    };

    return citys[province];
};

export const getRegion = (city : string) : [{}] => {
    const regions: {[key: string]: any} = {
        "南京": [{
            'letter': 'J',
            'data': ['江宁区']
        }]
    };

    return regions[city];
};

export const getStreet = (region : string) : [{}] => {
    const streets: {[key: string]: any} = {
        "江宁区": [{
            'letter': 'C',
            'data': ['淳化街道']
        }]
    };

    return streets[region];
};

export const getCommunity = (street : string) : [{}] => {
    const communities: {[key: string]: any} = {
        "淳化街道": [{
            'letter': 'Y',
            'data': ['云逸都荟花园']
        }]
    };

    return communities[street];
};