'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var createLoading = exports.createLoading = function createLoading(requestEvent, onShowMessage) {
    var loadingCount = 0;
    var _closeLoading = null;
    var timeHandler = null;
    var closeLoading = function closeLoading() {
        _closeLoading && _closeLoading();
        _closeLoading = null;
    };
    var addLoading = function addLoading() {
        if (loadingCount <= 0) {
            _closeLoading = onShowMessage();
        }
        loadingCount++;
        clearTimeout(timeHandler);
        timeHandler = setTimeout(closeLoading, 30 * 1000);
    };
    var subtractLoading = function subtractLoading() {
        loadingCount--;
        if (loadingCount <= 0) {
            loadingCount = 0;
            closeLoading();
        }
    };

    requestEvent.on('RequestSend', function () {
        addLoading();
    });
    requestEvent.on('RequestError', function () {
        subtractLoading();
    });
    requestEvent.on('RequestSuccess', function () {
        subtractLoading();
    });
};
exports.default = createLoading;