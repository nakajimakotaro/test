/**
 * 電池
 */
class BatteryPlus extends Battery{
    static imageSrc(){
        return "/data/object/battery_plus.png";
    }
    static getObjectName(){
        return "battery_plus";
    }
    constructor(gameManager){
        super(gameManager);
        this.objectName = BatteryPlus.getObjectName();
        this.add_type("battery_plus");
        this.rect.w = 40;
        this.rect.h = 40;
        this.image.src = BatteryPlus.imageSrc();
    }
}

objectManager.add(BatteryPlus.getObjectName(), BatteryPlus);
