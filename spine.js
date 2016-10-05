/**
 * トゲ
 */
class Spine extends CanvasObject{
    static imageSrc(){
        return "/data/object/spine.png";
    }
    static getObjectName(){
        return "spine";
    }
    constructor(gameManager){
        super(gameManager);
        this.objectName = Spine.getObjectName();
        this.add_type("enemy");
        this.rect.w = 40;
        this.rect.h = 40;
        this.image.src = Spine.imageSrc();
    }
}

objectManager.add(Spine.getObjectName(), Spine);
