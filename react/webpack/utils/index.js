const fs = require('fs-extra');
const path = require('path');

const resolveCwd = (...args) => path.resolve(process.cwd(), ...args);

const getBranch = () => {
    let envBranch = process.env.CURRENT_BRANCH || process.env.DRONE_COMMIT_BRANCH;

    if (envBranch) {
        return envBranch;
    }

    const argBranch = process.argv.find(arg => arg.indexOf('branch') === 0);

    if (argBranch) {
        envBranch = argBranch.split('=').pop();

        if (envBranch) {
            return envBranch;
        }
    }

    try {
        envBranch = fs
            .readFileSync(resolveCwd('.git/HEAD'), 'utf-8')
            .trim()
            .split('/')
            .pop();

        return envBranch;
    } catch (e) {
        return '';
    }
};

const getPublishPath = (name, publishPathPrefix, port) => {
    const isDev = process.env.NODE_ENV !== 'production';
    const localPublishPath = '/';

    if (isDev) {
        return localPublishPath;
    }

    const branch = getBranch();

    return `${publishPathPrefix[branch]}/${name}-${branch}/` || '';
};

module.exports = {
    getPublishPath
};
