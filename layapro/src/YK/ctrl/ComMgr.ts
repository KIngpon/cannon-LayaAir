import { GameObjectInfo, ComInfo } from "../coms/GamObjectInfo";
import { Body } from "./../coms/physical/Body";
import { ICom } from "../coms/ICom";
var Reg = Laya.ClassUtils.regClass;
export class ComMgr {
    constructor() {
        this.Init();
    }
    private Init() {
        Reg("YK.Body", Body)
    }

    initComs(go: Laya.Sprite3D, info: GameObjectInfo) {
        this.addCom(go, info);
        this.initDatas(go, info);
    }

    private addCom(go: Laya.Sprite3D, info: GameObjectInfo) {
        if (go.name != info.name) {
            console.error("文件和游戏物体不相同");
        }
        else {
            this.initCom(go, info.coms)
            for (let index = 0; index < info.childs.length; index++) {
                const element = info.childs[index];
                let child = go.getChildByName(element.name) as Laya.Sprite3D;
                if (child != null) {
                    this.addCom(child, element);
                }
            }
        }
    }
    private initCom(go: Laya.Sprite3D, comInfos: Array<ComInfo>) {
        for (let index = 0; index < comInfos.length; index++) {
            let comInfo = comInfos[index]
            let com = go.addComponent(Laya.ClassUtils.getClass(comInfo.name)) as ICom
            com.userData = comInfo.data;
        }

    }

    private initDatas(go: Laya.Sprite3D, info: GameObjectInfo) {
        if (go.name != info.name) {
            console.error("文件和游戏物体不相同");
        }
        else {
            this.initData(go, info.coms)
            for (let index = 0; index < info.childs.length; index++) {
                const element = info.childs[index];
                let child = go.getChildByName(element.name) as Laya.Sprite3D;
                if (child != null) {
                    this.initDatas(child, element);
                }
            }
        }
    }

    private initData(go: Laya.Sprite3D, comInfos: Array<ComInfo>) {
        for (let index = 0; index < comInfos.length; index++) {
            let comInfo = comInfos[index]
            let com = go.getComponent(Laya.ClassUtils.getClass(comInfo.name)) as ICom
            com.OnInit();
        }

    }
}