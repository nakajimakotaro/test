

window.addEventListener('load', ()=>{
    let gameManager = new GameManager();
    gameManager.start();

    document.getElementById('mapEditToggle').addEventListener('click', ()=>{
        if(document.getElementById('mapEditToggle').checked){
            gameManager.startMapEdit();
        }else{
            gameManager.start();
        }
    });
});

