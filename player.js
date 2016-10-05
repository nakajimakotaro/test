/**
 * 操作プレイヤー
 */
class Player extends CanvasObject{
    static imageSrc(){
        return "/data/object/player.png";
    }
    static getObjectName(){
        return "player";
    }
    constructor(gameManager){
        super(gameManager);
        this.die = this.die.bind(this);

        this.objectName = Player.getObjectName();
        this.add_type("player");
        this.layer = 80;
        this.rect.w = 34;
        this.rect.h = 56;
        this.hp = 1;
        this.image.src = Player.imageSrc();

    }
    /** 
     * @override
     */
    process(delta){
        super.process(delta);

        this.move.y += 480;

        if(this.gameManager.input.has_down("a")){
            this.move.x -= 480;
        }
        if(this.gameManager.input.has_down("d")){
            this.move.x += 480;
        }
        if(this.gameManager.input.has_down(" ")){
            this.move.y -= 1000;
        }
        if(this.code){
            this.code.appendPath(this.rect.x, this.rect.y);
        }

        //ブロックにぶつかった時戻す
        this.rect.x += this.move.x * (delta / 1000);
        this.rect.y += this.move.y * (delta / 1000);
        for(let block of this.gameManager.map.collision.hitCheck(this.rect).filter((e)=>e instanceof Block)){
            this.collisionList.push(block);
            if(this.rect.hitRect(block.rect).w > this.rect.hitRect(block.rect).h){
                this.rect.y = block.rect.y + (block.rect.h / 2 + this.rect.h / 2) * (this.rect.y > block.rect.y ? 1 : -1) - 0.5;
            }else{
                this.rect.x = block.rect.x + (block.rect.w / 2 + this.rect.w / 2) * (this.rect.x > block.rect.x ? 1 : -1);
            }
        }
        //ぶつかった時の処理
        for(let obj of this.collisionList){
            //敵にぶつかったら死ぬ
            if(obj instanceof Spine){
                this.hp--;
                if(this.hp <= 0){
                    this.die();
                }
            }
            //バッテリーなら
            if((obj instanceof BatteryPlus) || (obj instanceof BatteryMinus)){
                if(this.code){
                    this.gameManager.map.requireFree(this.code);
                    this.code = null;
                }
                this.code = new Code(this.gameManager);
                this.gameManager.map.add(this.code);
                this.code.connect(obj);
            }
            if(obj instanceof EMagnet){
                if(!this.code){
                    continue;
                }
                this.code.connect(obj);
                this.code = null;
            }
            if(obj instanceof Goal){
                this.gameManager.map.goal();
            }
        }
        this.move.x = 0;
        this.move.y = 0;
    }

    die(){
        this.gameManager.map.requireFree(this);
        this.gameManager.map.requireFree(this.code);
    }
}

objectManager.add(Player.getObjectName(), Player);

