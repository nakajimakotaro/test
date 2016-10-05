
/**
 * 矩形
 */
class Rect{
    constructor(x = 0, y = 0, w = 0, h = 0){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    isEmpty(){
        return this.w <= 0 || this.h <= 0;
    }
    /**
     * objと衝突すればtrue
     * @param {Rect} obj
     * @return {bool}
     */
    isHit(obj){
        return !(this.hitRect(obj).isEmpty());

    }
    /**
     * 被っている矩形を返す
     * @return {Rect}
     */
    hitRect(obj){
        let resultRect = new Rect();
        let objMin = 0;
        let objMax = 0;
        let thisMin = 0;
        let thisMax = 0;
        
        objMin = obj.x - obj.w / 2;
        objMax = obj.x + obj.w / 2;
        thisMin = this.x - this.w / 2;
        thisMax = this.x + this.w / 2;
        resultRect.x = Math.max(objMin, thisMin);
        resultRect.w = (thisMax < objMax ? thisMax : objMax) - resultRect.x;


        objMin = obj.y - obj.h / 2;
        objMax = obj.y + obj.h / 2;
        thisMin = this.y - this.h / 2;
        thisMax = this.y + this.h / 2;
        resultRect.y = Math.max(objMin, thisMin);
        resultRect.h = (thisMax < objMax ? thisMax : objMax) - resultRect.y;

        return resultRect;
    }
}
