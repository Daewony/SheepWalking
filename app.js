import {Hill} from './hill.js';
import {SheepController} from './sheep-controller.js';
import {Sun} from './sun.js';

class App {
    constructor() {
        // 캔버스 생성 및 바디 추가
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.sun = new Sun();

        // 힐 추가하기
        // 3D 효과 = (속도 기능)앞의 언덕은 빠르게, 뒤 언덕은 느리게 
        // 촘촘한 언덕 = 좌표 추가하기
        this.hills = [
            new Hill('#fd6bea', 0.2, 12),
            new Hill('#ff59c2', 0.5, 8),
            new Hill('#ff4674', 1.4, 6)
        ];

        this.sheepController = new SheepController();
        // 스크린 사이즈를 가져오기 위한 리사이즈 이벤트
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        
        // 
        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        // 캔버스 사이즈 2배, 선명하게 보이기 위함
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.sun.resize(this.stageWidth, this.stageHeight);

        // 언덕 랜덤으로 그리기
        for (let i=0; i<this.hills.length; i++){
            this.hills[i].resize(this.stageWidth,this.stageHeight);
        }

        this.sheepController.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));

        // 애니메이션 잔재 남는거 지우기
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.sun.draw(this.ctx, t);

        let dots;
        for(let i=0; i<this.hills.length;i++){
            dots = this.hills[i].draw(this.ctx);
        }

        this.sheepController.draw(this.ctx, t, dots);
    }
}

window.onload = () => {
    new App();
};