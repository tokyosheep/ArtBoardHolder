import {csInterface,extensionRoot} from "./init.js";

interface HostObj{
    jsx:string,
    arg?:object,
}

type Return = string|false;

export type ArgObject<T> = {
    type:string,
    args:T
}

export class SendHostScript implements HostObj{
    constructor(public jsx:string = "hostScript",public arg?:object){

    }

    callJsx():Promise<string|false>{
        return new Promise((resolve,reject)=>{
            csInterface.evalScript(`$.evalFile("${extensionRoot}/singleProcess/${this.jsx}")`,(o:Return)=>{
                if(!o||o==="false")resolve(false);
                resolve(o);
            });
        })
    }

    callHostScript(obj:ArgObject<Object>):Promise<string|boolean>{
        return new Promise((resolve,reject)=>{
            csInterface.evalScript(`${this.jsx}(${JSON.stringify(obj)})`,(o:Return)=>{
                if(!o||o === "false"){
                    resolve(false);
                }                
                resolve(o);
            });
        });
    }
}