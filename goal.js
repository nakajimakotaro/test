/**
 * ゴール
 */
class Goal extends CanvasObject{
    static imageSrc(){
        return "/data/object/goal.png";
    }
    static getObjectName(){
        return "goal";
    }
    constructor(gameManager){
        super(gameManager);
        this.objectName = Goal.getObjectName();
        this.add_type("goal");
        this.rect.w = 40;
        this.rect.h = 40;
        this.image.src = Goal.imageSrc();
    }
}

objectManager.add(Goal.getObjectName(), Goal);
