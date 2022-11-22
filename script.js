const videoCanvas = document.getElementById('videoCanvas');
const ctx = videoCanvas.getContext('2d');
const video = document.getElementById('video');
const effects = ['none', 'blur(10px)', 'grayscale(100%)', 'hue-rotate(90deg)', 'invert(100%)', 'sepia(100%)', 'opacity(15%)', 'saturate(60%)'];
const list = document.getElementById('listEffects');
var i_effects;

function init() {
    video.load();
    video.play();

    effects.forEach(effect => {
        const listNode = document.createTextNode(effect.toString());
        const node = document.createElement('li');
        node.appendChild(listNode);
        list.appendChild(node);
    });

    i_effects = 0;

    window.onclick = () => {
        if(i_effects === effects.length - 1) {
            i_effects = 0;
        } else {
            i_effects++;
        }
        console.log(`filter: ${effects[i_effects]}`);
    };

    document.oncontextmenu = (e) => {
        e.preventDefault();
        if(video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };

    document.onkeydown = (e) => {
        let key = Number.parseInt(String.fromCharCode(e.keyCode));
        if(key <= effects.length && key > 0) {
            i_effects = key - 1;
            console.log(`filter: ${effects[i_effects]}`);
        }
    }
    window.requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0, 0, videoCanvas.clientWidth, videoCanvas.clientHeight);
    ctx.filter = effects[i_effects].toString();
    ctx.drawImage(video, 0, 0);
    window.requestAnimationFrame(draw);
}
