import {
    Hill
} from './hill.js';

class App {
    constructor() {
        // 캔버스 생성 및 바디 추가
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.hills = [
            new Hill('#fd6bea', 0.2, 12),
            new Hill('#ff59c2', 0.5, 8),
            new Hill('#ff4674', 1.4, 6)
        ];

        // 스크린 사이즈를 가져오기 위한 리사이즈 이벤트 걸음
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        // 캔버스 사이즈 2배, 선명하게 보이기 위함
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);

        for (let i=0; i<this.hills.length; i++){
            this.hills[i].resize(this.stageWidth,this.stageHeight);
        }
    }

    animate(t) {
        requestAnimationFrame(this.animate,bind(this));

        // 잔재 남는거 없앰
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

        let dots;
        for(let i=0; i<this.hills.length;i++){
            dots = this.hills[i].draw(this.ctx);
        }
    }
}

window.onload = () => {
    new App();
}