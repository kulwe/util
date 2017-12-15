/**
 * Created by kule on 2017/10/30.
 */
import _fs from 'fs-extra';
import Promise from 'bluebird';
export const fs=Promise.promisifyAll(_fs);
export default fs;