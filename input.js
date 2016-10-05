
class Input{
    constructor(){
        this.down = this.down.bind(this);
        this.up = this.up.bind(this);

        this.inputList = new Map();
        window.addEventListener('keydown', this.down);
        window.addEventListener('keyup',   this.up);
    }
    /**
     * @param {KeyboardEvent} e キーボードが押されるとこれが呼ばれる
     */
    down(e){
        this.inputList.set(e.key, true);
    }
    /**
     * @param {KeyboardEvent} e キーボードが離されるとこれが呼ばれる
     */
    up(e){
        this.inputList.delete(e.key);
    }

    has_down(key){
        return this.inputList.get(key);
    }
}
