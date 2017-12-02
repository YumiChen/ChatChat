import {env} from "../config";

window.debug = function (value){
    if(env=="development") console.log(value);
};