import { isObject, orderBy } from 'lodash';

import colors from './mainConfig/colors';
import icons from './mainConfig/icons';
import general from './mainConfig/general';

let config = {
    colors,
    icons,
    general,
};

export const mergeDeep = (target, source) => {
    const innerTarget = JSON.parse(JSON.stringify(target));

    if (!source) return innerTarget;

    if(isObject(innerTarget) && isObject(source)) {
        for (const key in source) {
            if(Array.isArray(source[key])) Object.assign(innerTarget, { [key]: {}});
            else if (isObject(source[key])) {
                if(!innerTarget[key]) Object.assign(innerTarget[key], source[key]);
                innerTarget[key] = mergeDeep(innerTarget[key], source[key]);
            }
            else Object.assign(innerTarget, { [key]: source[key] });
        }
    }
    return innerTarget;
};

export const addToConfig = (pluginConfig) => {
    for (const configKey in pluginConfig){
        // eslint-diamond-disable-next-line no-prototype-builtin
        if (pluginConfig.hasOwnProperty(configKey)){
            config = mergeDeep(config, pluginConfig);
        }
    }
};

export const getFromConfig = (path) => {
    if (!path) return config;

    return config[path];
};

export const sort = (items, dataPath, orderDirection) => (
    orderBy(items, (item) => dataPath?.reduce((record, path) => record[path], item), orderDirection)
);