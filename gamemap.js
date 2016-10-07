
class GameMap{
    /**
     * @param {GameManager} gameManager ゲームマネージャー
     * @param {string} mapPath マップファイルのパス
     */
    constructor(gameManager){
        this.gameManager = gameManager;

        this.add = this.add.bind(this);
        this.requireFree = this.requireFree.bind(this);
        this.objectFree = this.objectFree.bind(this);
        this.process = this.process.bind(this);
        this.draw = this.draw.bind(this);

        this.MAP_WIDTH = 800;
        this.MAP_HEIGHT = 600;

        this.mapPath = "";
        this.isGoal = false;
        this.goalImage = new Image();
        this.goalImage.src = "data/object/goal-text.png";
        this.collision = new Collision(this.gameManager);
        this.objectList = [];
        this.freeList = [];
        this.frame = 0;
    }

    /**
     * マップにオブジェクトを追加する
     * @param {CanvasObject} obj 追加するオブジェクト
     */
    add(obj){
        this.objectList.push(obj);
    }

    /**
     * マップにオブジェクトの削除を要請する
     * @param {CanvasObject} obj 削除するオブジェクト
     */
    requireFree(obj){
        if(!obj)return;
        this.freeList.push(obj);
    }

    /**
     * requireFreeで渡されたオブジェクトを削除する
     */
    objectFree(){
        this.objectList = this.objectList.filter((element)=>{
            for(let freeObj of this.freeList){
                if(freeObj == element){
                    return false;
                }
            }
            return true;
        });
        this.freeList = [];
    }

    goal(){
        this.isGoal = true;
    }

    /**
     * マップに登録されているすべてのオブジェクトを1フレーム分動作させる
     * @param {number} delta 前フレームから経過した時間(ミリ秒)
     */
    process(delta){
        this.frame++;
        if(this.isGoal)return;
        if(this.gameManager.input.has_down("r")){
            this.gameManager.changeMap(this.mapPath);
        }
        this.collision.tick();
        for(let obj of this.objectList){
            obj.process(delta);
        }
        this.objectFree();
    }

    draw(context){
        context.beginPath();
        context.clearRect(0, 0, this.MAP_WIDTH, this.MAP_HEIGHT);


        //描画順に並び替える
        this.objectList.sort((a,b)=>{
            if(a.layer < b.layer){
                return -1;
            }else if(a.layer > b.layer){
                return 1;
            }else{
                return 0;
            }
        });
        for(let obj of this.objectList){
            obj.draw(context);
        }

        if(this.isGoal){
            context.drawImage(this.goalImage, 200, 200);
        }
        context.stroke();
    }

    loadMap(data, path){
        this.MAP_WIDTH = data.MAP_WIDTH;
        this.MAP_HEIGHT = data.MAP_HEIGHT;
        this.mapPath = path;
        this.frame = data.frame;

        this.objectList = [];
        for(let obj of data.objectList){
            let createFunc = objectManager.getCreateFunc(obj.objectName);
            this.objectList.push(new createFunc(this.gameManager).loadObject(obj));
        }
        return this;
    }

    saveObjectList(){
        let data = {};
        data.MAP_WIDTH = this.MAP_WIDTH;
        data.MAP_HEIGHT = this.MAP_HEIGHT;
        data.frame  = this.frame;

        data.objectList = [];
        for(let obj of this.objectList){
            data.objectList.push(obj.saveObjectList());
        }
        return data;
    }
}
