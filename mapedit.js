
class MapEdit extends GameMap{
    constructor(gameManager){
        super(gameManager);
        this.process = this.process.bind(this);
        this.draw = this.draw.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.setHoldObject = this.setHoldObject.bind(this);
        this.gridSnap = this.gridSnap.bind(this);
        this.selectObjectName = this.selectObjectName.bind(this);
        this.createObject = this.createObject.bind(this);
        this.save = this.save.bind(this);

        this.GRID_SIZE = 40;
        this.GRID_POS_X = this.gameManager.map.MAP_WIDTH  / this.GRID_SIZE;
        this.GRID_POS_Y = this.gameManager.map.MAP_HEIGHT / this.GRID_SIZE;

        this.holdObject; //半透明で表示するためのオブジェクト
        this.processMode = "edit";

        $("#canvas").mousedown(this.mouseDown);
        $("#canvas").mousemove(this.mouseMove);
        $("#saveButton").click(this.save);

        //追加できるオブジェクトを並べる
        $('.selectChara').remove();
        for(let chara of objectManager.getObjectList().values()){
            $('#selectCharaDiv').append($("<label>", {class: "selectChara"}));
            $('.selectChara:last').append($("<input>", {type: "radio", name: "selectChara", "data-objectname": chara.getObjectName()}));
            $('.selectChara:last').append($("<img>", {src: chara.imageSrc()}));
        }
        $('.selectChara:first input').attr("checked", true);

        $('.selectChara').click(()=>{this.setHoldObject(this.selectObjectName())});
        this.setHoldObject(this.selectObjectName());
    }


    process(delta){
        if(this.processMode == "process"){
            super.process(delta);
        }
    }

    draw(context){
        super.draw(context);
        context.beginPath();
        context.lineWidth = 1;
        //グリッドを描画
        for(let x of Array.from({length: this.GRID_POS_X + 1}, (v, k)=>k * this.GRID_SIZE)){
            context.moveTo(x, 0);
            context.lineTo(x, this.gameManager.map.MAP_WIDTH);
        }
        for(let y of Array.from({length: this.GRID_POS_Y + 1}, (v, k)=>k * this.GRID_SIZE)){
            context.moveTo(0,   y);
            context.lineTo(this.gameManager.map.MAP_HEIGHT, y);
        }
        context.closePath();
        context.stroke();

        this.holdObject.draw(context);
    }

    /**
     * マウスボタンが押された時にマップにオブジェクトを追加する
     */
    mouseDown(e){
        /**
         * 左クリックされるとオブジェクトをマップに追加する
         */
        let leftClick = function(e){
            let obj = this.createObject(this.selectObjectName());

            obj.rect.x = this.holdObject.rect.x;
            obj.rect.y = this.holdObject.rect.y;
            this.gameManager.map.add(obj);
        }.bind(this);
        let middleClick = function(e){
            let list = this.gameManager.map.collision.pointInList(
                        e.clientX - document.getElementById('canvas').offsetLeft,
                        e.clientY - document.getElementById('canvas').offsetTop
                        );

            if(list.length == 0)return;
            let freeObject = list.reduce((a,b)=>{
                        if(a.layer > b.layer)return a;
                        return b;
                    });

            this.gameManager.map.requireFree(freeObject);
            this.gameManager.map.objectFree();
        }.bind(this);

        if(!this.gameManager.mapEditMode)return;
        if(e.button == 0){
            leftClick(e);
        }else if(e.button == 1){
            middleClick(e);
        }
    }

    /**
     * マウスが移動した時にホールドオブジェクトも移動する
     */
    mouseMove(e){
        if(!this.gameManager.mapEditMode)return;
        this.holdObject.rect.x = e.clientX - document.getElementById('canvas').offsetLeft;
        this.holdObject.rect.y = e.clientY - document.getElementById('canvas').offsetTop;
        this.gridSnap(this.holdObject);
    }

    /**
     * ホールドオブジェクトをセットする
     *
     * @param {String} name セットするオブジェクトの名前
     */
    setHoldObject(name){
        this.holdObject = this.createObject(name);
        this.holdObject.alpha = 0.5;
        this.layer = 255;
    }

    /**
     * xとyをグリッドに合わせる
     * @param {CanvasObject} グリッドに合わせるキャンバスオブジェクト
     * @return {CanvasObject} グリッドに合わせ終わったキャンバスオブジェクト
     */
    gridSnap(obj){
        obj.rect.x = Math.floor(obj.rect.x / this.GRID_SIZE) * this.GRID_SIZE + this.GRID_SIZE / 2;
        obj.rect.y = Math.floor(obj.rect.y / this.GRID_SIZE) * this.GRID_SIZE + this.GRID_SIZE / 2;
        return obj;
    }

    /**
     * 現在選択されているオブジェクトの名前
     */
    selectObjectName(){
        for(let radio of document.getElementsByName("selectChara")){
            if(radio.checked){
                return radio.getAttribute("data-objectname");
            }
        }
        assert(0);
    }

    /**
     * オブジェクトの名前からオブジェクトを生成する
     */
    createObject(name){
        let createFunc = objectManager.getCreateFunc(name);
        return new createFunc(this.gameManager);
    }

    save(fileName){
        let data = JSON.stringify(this.saveObjectList(), null, "    ");
        let url = URL.createObjectURL(new Blob([data]));
        let a = document.createElement('a');
        a.download = 'map.json';
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
