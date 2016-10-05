/**
 * 電磁石
 */
class EMagnet extends Block{
    static imageSrc(){
        return "/data/object/emagnet.png";
    }
    static getObjectName(){
        return "EMagnet";
    }
    constructor(gameManager){
        super(gameManager);
        this.objectName = EMagnet.getObjectName();
        this.add_type("EMagnet");
        this.rect.w = 40;
        this.rect.h = 40;
        this.image.src = EMagnet.imageSrc();
        this.plusCode = null;
        this.minusCode = null;
        this.isForce = false;
        this.force = 10;
    }

    connect(code){
        if(code.connectBattery instanceof BatteryPlus){
            if(this.plusCode)this.plusCode.die();
            this.plusCode = code;
        }else if(code.connectBattery instanceof BatteryMinus){
            if(this.minusCode)this.minusCode.die();
            this.minusCode = code;
        }else{
            assert(0);
        }

        if(this.minusCode && this.plusCode){
            this.isForce = true;
        }
    }
    deconnect(){
        this.code = null;
    }
}

objectManager.add(EMagnet.getObjectName(), EMagnet);
