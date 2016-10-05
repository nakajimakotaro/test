
/**
 * ゲームをまとめる
 */
class GameManager{
    constructor(){
        this.start = this.start.bind(this);
        this.changeMap = this.changeMap.bind(this);
        this.gameLoop = this.gameLoop.bind(this);

        this.mapEditMode = false;
        this.prev_time = 0;
    }
    start(){
        this.changeMap("/data/map/map.json");
    }
    changeMap(mapPath){
        this.mapEditMode = false;
        this.input = new Input();
        this.map = new GameMap(this);
        $.getJSON(mapPath)
            .done((json)=>{
                this.map.loadMap(json, mapPath);
                requestAnimationFrame(this.gameLoop);
            });
    }
    /**
     * この関数を呼び出してゲームを始める
     * この関数を呼び出しても制御は戻る
     */
    gameLoop(){
        if(!this.map)return false;
        //キャラがぶっ飛んでいかないように前フレームから1秒以上立っていた場合prev_timeを現在時間にする
        if(performance.now() - this.prev_time > 1000){
            this.prev_time = performance.now();
        }
        let delta = performance.now() - this.prev_time;
        this.prev_time = performance.now();
        this.map.process(delta);
        this.map.draw(document.getElementById('canvas').getContext('2d'));
        requestAnimationFrame(this.gameLoop);
    }
    startMapEdit(){
        this.mapEditMode = true;
        this.input = new Input();
        this.map = new MapEdit(this);
    }
}
