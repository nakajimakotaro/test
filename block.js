/**
 * ブロック
 */
class Block extends CanvasObject{
    static imageSrc(){
        return "/data/object/block.png";
    }
    static getObjectName(){
        return "block";
    }
    constructor(gameManager){
        super(gameManager);
        this.objectName = Block.getObjectName();
        this.add_type("block");
        this.rect.w = 40;
        this.rect.h = 40;
        this.image.src = Block.imageSrc();
    }
}

objectManager.add(Block.getObjectName(), Block);
