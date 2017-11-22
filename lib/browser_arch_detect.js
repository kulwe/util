'use strict';

module.exports = function arch() {
    var userAgent = navigator.userAgent;
    if (['x86_64', 'x86-64', 'Win64', 'x64;', 'amd64', 'AMD64', 'WOW64', 'x64_64'].some(function (str) {
        return userAgent.indexOf(str) > -1;
    })) {
        return 'x64';
    }

    var platform = navigator.platform;
    if (platform === 'MacIntel' || platform === 'Linux x86_64') {
        return 'x64';
    }

    if (navigator.cpuClass === 'x64') {
        return 'x64';
    }

    return 'x86';
};