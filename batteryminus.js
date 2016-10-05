/**
 * 電池
 */
class BatteryMinus extends Battery{
    static imageSrc(){
        return "/data/object/battery_minus.png";
    }
    static getObjectName(){
        return "battery_minus";
    }
    constructor(gameManager){
        super(gameManager);
        this.objectName = BatteryMinus.getObjectName();
        this.add_type("battery_minus");
        this.rect.w = 40;
        this.rect.h = 40;
        this.image.src = BatteryMinus.imageSrc();
    }
}

objectManager.add(BatteryMinus.getObjectName(), BatteryMinus);
