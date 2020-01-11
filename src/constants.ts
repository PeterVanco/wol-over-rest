import * as config from 'config';

console.log('Using following configuration sources:');
console.log(config.util.getConfigSources().map(src => src.name));

export const PORT: number = config.get('port');
export const TOKEN: number = config.get('token');
export const DEBUG: boolean = Boolean(config.get('debug'));

if (DEBUG) {
    console.log('Using following configuration:');
    console.log(JSON.stringify(config.util.toObject(), null, 2));
}


