'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function getError(option, xhr) {
    var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
    var err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = option.action;
    return err;
}

function getBody(xhr) {
    var text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

var upload = exports.upload = function upload(option) {
    var xhr = new XMLHttpRequest();

    if (option.onProgress && xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = e.loaded / e.total * 100;
            }
            option.onProgress(e);
        };
    }

    var formData = new FormData();

    if (option.data) {
        Object.keys(option.data).map(function (key) {
            formData.append(key, option.data[key]);
        });
    }

    formData.append(option.filename, option.file, option.file.name);

    xhr.onerror = function error(e) {
        option.onError(e);
    };

    xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(option, xhr), getBody(xhr));
        }

        option.onSuccess(getBody(xhr), xhr);
    };

    xhr.open('post', option.action, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    var headers = option.headers || {};

    if (headers['X-Requested-With'] !== null) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }

    for (var h in headers) {
        if (headers.hasOwnProperty(h) && headers[h] !== null) {
            xhr.setRequestHeader(h, headers[h]);
        }
    }
    xhr.send(formData);

    return {
        abort: function abort() {
            xhr.abort();
        }
    };
};
exports.default = upload;