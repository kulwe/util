'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var injectScript = exports.injectScript = function injectScript(src) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = ('https:' == location.protocol ? 'https://' : 'http://') + src;
    document.body.appendChild(script);
};

exports.default = injectScript;