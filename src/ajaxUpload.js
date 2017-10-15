/**
 * Created by kule on 2017/9/12.
 */
import upload from './upload';
export const ajaxUpload=upload;
export const ajaxUploadWhenTaskDone = (task) => {
    let _abort = false;
    let abortHandle = false;
    const abort = () => {
        if (abortHandle) {
            return abortHandle();
        }
        if (!_abort) {
            _abort = true;
        }
    };
    task.then((...args) => {
        if (_abort) {
            return;
        }
        abortHandle = upload(...args);
    });
    return {
        abort
    }
};
export default ajaxUpload;