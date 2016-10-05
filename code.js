/**
 * 紐
 */
class Code extends CanvasObject{
    static imageSrc(){
        return "/data/object/code.png";
    }
    static getObjectName(){
        return "code";
    }
    constructor(gameManager){
        super(gameManager);
        this.objectName = Code.getObjectName();

        this.add_type("code");
        this.connectBattery = null;
        this.connectEMagnet = null;
        this.rect.w = 1;
        this.rect.h = 1;
        this.layer = 70;
        this.pathList = [];
    }
    
    appendPath(x, y){
        this.pathList.push({"x": x, "y": y});

        if(this.pathList.length < 3){
            return;
        }
        if(this.gameManager.map.frame % 10 != 0){
            this.pathList[this.pathList.length - 2] = this.pathList[this.pathList.length - 1];
            this.pathList.pop();
        }
    }

    connect(obj){
        if(obj instanceof EMagnet){
            this.connectEMagnet = obj;
            this.connectEMagnet.connect(this);
        }else if((obj instanceof BatteryPlus) || (obj instanceof BatteryMinus)){
            this.connectBattery = obj;
            this.connectBattery.connect(this);
        }else{
            assert(0);
        }
        this.appendPath(obj.rect.x, obj.rect.y);
    }

    die(){
        if(this.connectBattery)this.connectBattery.deconnect();
        if(this.connectEMagnet)this.connectEMagnet.deconnect();
        this.gameManager.map.requireFree(this);
    }

    /** 
     * @override
     */
    process(delta){
    }
    /** 
     * @override
     */
    draw(context){
        if(this.pathList.length < 3){
            return;
        }
        context.beginPath();
        context.strokeStyle = "red";

        let prevPath = this.pathList[0];
        context.moveTo(this.pathList[0].x, this.pathList[0].y);
        for(let path of this.pathList.slice(1)){
            context.quadraticCurveTo(prevPath.x - Math.random() * 3 - 2, prevPath.y + Math.random() * 3 - 2, (prevPath.x + path.x) / 2 + Math.random() * 3 - 2, (prevPath.y + path.y) / 2 + Math.random() * 3 - 2);
            prevPath = path;
        }
        context.lineTo(this.pathList[this.pathList.length - 1].x, this.pathList[this.pathList.length - 1].y);
        context.stroke();
    }

}

