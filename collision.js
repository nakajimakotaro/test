
class Collision{
    constructor(gameManager){
        this.list = this.list.bind(this);
        this.tick = this.tick.bind(this);
        this.hitCheck = this.hitCheck.bind(this);

        this.gameManager = gameManager;

    }
    list(){
        return this.gameManager.map.objectList.filter((obj)=>{
            return obj.enableHit;
        });
    }
    /**
     * 衝突していたオブジェクトのコールバックを呼び出す。
     * 現在O(n^2)なので追加し過ぎないように気をつける
     */
    tick(){
        for(let obj of this.list()){
            obj.collisionList = [];
        }
        let count = 0;
        for(let a of this.list().slice(0, -1)){
            count++;
            for(let b of this.list().slice(count)){
                if(a.rect.isHit(b.rect)){
                    a.collisionList.push(b);
                    b.collisionList.push(a);
                }
            }
        }
    }

    /**
     * 現在登録されているオブジェクトとobjをチェックして衝突していたものを返す
     * @param {CanvasObject} obj チェックするオブジェクト
     * @return {array} 衝突していたオブジェクトのリスト
     */
    hitCheck(obj){
        let hitList = [];
        for(let a of this.list()){
            if(a.rect.isHit(obj)){
                hitList.push(a);
            }
        }
        return hitList;
    }

    /**
     * 現在登録されていて、(x,y)座標と被っているオブジェクトを返す
     * @param {number} x x座標
     * @param {number} y y座標
     * @return {array} 衝突していたオブジェクトのリスト
     */
    pointInList(x, y){
        let rect = new Rect(x, y, 1, 1);
        let hitList = [];
        for(let obj of this.list()){
            if(obj.rect.isHit(rect)){
                hitList.push(obj);
            }
        }
        return hitList;
    }
}
