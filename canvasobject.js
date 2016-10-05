/**
 * canvasに描画されるオブジェクト
 * @abstract 
 */
class CanvasObject{
    constructor(gameManager){
        this.draw = this.draw.bind(this);
        this.process = this.process.bind(this);
        this.add_type = this.add_type.bind(this);
        this.remove_type = this.remove_type.bind(this);
        this.has_type = this.has_type.bind(this);
        this.saveObjectList = this.saveObjectList.bind(this);

        this.gameManager = gameManager;
        this.objectName = "canvasObject";
        //描画順(小さい方が先に描画する)
        this.layer = 50;
        //透明度
        this.alpha = 1;
        this.enableHit = true;
        //現在衝突しているオブジェクト
        this.collisionList = [];
        this.rect = new Rect();
        this.move = {"x": 0, "y": 0};
        this.image = new Image();
        this.typeList = [];
    }


    /**
     * 描画するときに呼ばれる
     * @param {Object} context canvasのコンテキスト
     */
    draw(context){
        if(!this.image.complete)return;
        let prevAlpha = context.globalAlpha;
        context.globalAlpha = this.alpha;
        context.drawImage(this.image, this.rect.x - this.rect.w / 2, this.rect.y - this.rect.h / 2);
        context.globalAlpha = prevAlpha;
    }

    /**
     * 毎フレーム呼び出す
     * @param {number} delta 前回呼ばれた時からのからのミリ秒 初回は0
     */
    process(delta){
    }

    /**
     * タイプを追加する 例: enemyやblockなど
     * @param {string} type タイプの名前
     */
    add_type(type){
        this.typeList.push(type);
    }
    /**
     * タイプを削除する
     * @param {string} type タイプの名前
     */
    remove_type(type){
        this.typeList.filter((e)=>{
            return !(type == e);
        });
    }
    /**
     * 引数のタイプがあればtrueを返す
     * @param {string} type タイプの名前
     * @return {bool} typeが存在すればtrue
     */
    has_type(type){
        return this.typeList.find((e)=>{
            return type == e;
        }) != undefined;
    }

    saveObjectList(){

        let data = {};

        /*オブジェクトをロードするときに必要*/
        data.objectName = this.objectName;

        data.layer = this.layer;
        data.alpha = this.alpha;
        data.enableHit = this.enableHit;
        data.collisionList = this.collisionList;
        data.rect = this.rect;
        data.move = this.move;
        data.imageSrc = new URI(this.image.src).resource();
        data.typeList = this.typeList;
        console.log(data.objectName);
        return data;
    }

    loadObject(data){
        this.layer = data.layer;
        this.alpha = data.alpha;
        this.enableHit = data.enableHit;
        this.collisionList = data.collisionList;
        this.rect = data.rect;
        this.rect = new Rect(data.rect.x, data.rect.y, data.rect.w, data.rect.h);
        this.move = data.move;
        this.image.src = data.imageSrc;
        this.typeList = data.typeList;
        return this;
    }
}
