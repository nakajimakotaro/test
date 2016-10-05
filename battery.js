
/**
 * 電池
 */
class Battery extends Block{
    constructor(gameManager){
        super(gameManager);

        this.code = null;
    }
    connect(code){
        if(this.code){
            this.code.die();
        }
        this.code = code;
    }
    deconnect(){
        this.code = null;
    }
}
