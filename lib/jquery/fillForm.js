'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inArray = require('../inArray');

var _inArray2 = _interopRequireDefault(_inArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fillForm = function fillForm(jqForm, data) {
    $('input', jqForm).each(function (index) {
        var type = this.type,
            name = this.name,
            value = this.value;

        if (!(name in data)) {
            return;
        }
        var newValue = data[name];
        var newValues = [];
        if (type == 'checkbox') {
            newValues = newValue ? newValue.split(',') : [];
            this.checked = (0, _inArray2.default)(value, newValues);
            return;
        }
        $(this).val(newValue);
    });
};
exports.default = fillForm;