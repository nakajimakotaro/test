class ObjectManager{
    constructor(){
        this.list = new Map();
    }
    add(name, func){
        this.list.set(name, func);
    }
    getCreateFunc(name){
        return this.list.get(name);
    }
    getObjectList(){
        return this.list;
    }
}

window.objectManager = new ObjectManager();
