/**
 * 鉄
 */
class Iron extends Block{
    static imageSrc(){
        return "/data/object/iron.png";
    }
    static getObjectName(){
        return "iron";
    }
    constructor(gameManager){
        super(gameManager);
        this.objectName = Iron.getObjectName();
        this.add_type("iron");
        this.rect.w = 40;
        this.rect.h = 40;
        this.move = {"x": 0, "y": 0};
        this.image.src = Iron.imageSrc();
    }

    process(delta){
        for(let eMagnet of this.gameManager.map.objectList.filter((e)=>e.isForce)){
            if(eMagnet.rect.x - this.rect.x > 9){
                this.move.x += 300;
            }else if(eMagnet.rect.x - this.rect.x < -9){
                this.move.x -= 300;
            }
            if(eMagnet.rect.y - this.rect.y > 9){
                this.move.y += 300;
            }else if(eMagnet.rect.y - this.rect.y < -9){
                this.move.y -= 300;
            }
        }

        this.rect.x += this.move.x * (delta / 1000);
        this.rect.y += this.move.y * (delta / 1000);
        for(let block of this.gameManager.map.collision.hitCheck(this.rect).filter((e)=>{if(e instanceof Block && e != this)return true})){
            if(this.rect.hitRect(block.rect).w > this.rect.hitRect(block.rect).h){
                this.rect.y = block.rect.y + (block.rect.h / 2 + this.rect.h / 2) * (this.rect.y > block.rect.y ? 1 : -1) - 0.5;
            }else{
                this.rect.x = block.rect.x + (block.rect.w / 2 + this.rect.w / 2) * (this.rect.x > block.rect.x ? 1 : -1);
            }
        }
        this.move.x = 0;
        this.move.y = 0;
    }
}

objectManager.add(Iron.getObjectName(), Iron);
