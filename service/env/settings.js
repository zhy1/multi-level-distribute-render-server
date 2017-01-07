/**
 * Created by gtbzh on 2016/8/8.
 */

import cfg from '../config'
import dev from './dev'
import prd from './prd'

const setDev = ()=> {
    cfg.appEncoding = dev.appEncoding;
}
const setPrd = ()=> {
    cfg.appEncoding = prd.appEncoding;
}
export default  {
    setDev,
    setPrd
}