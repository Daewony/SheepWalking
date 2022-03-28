export class Hill {
    // 언덕의 색상, 속도, 언덕의 포인드 개수
    constructor(color, speed, total) {
        this.color = color;
        this.speed = speed;
        this.total = total; 
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.points = [];
        // 각 좌표의 X값을 this.total 개수만큼 띄어줄 것임, 스테이지보다 크게 잡기위한 -2
        // 화면 바깥으로부터 자연스럽게 들어오는 양의 모션을 위해 -2
        this.gap = Math.ceil(this.stageWidth / (this.total - 2));

        for (let i = 0; i < this.total; i++) {
            this.points[i] = {
                x: i * this.gap,
                y: this.getY() // Y값 랜덤으로 정의
            };
        }
    }
    // 언덕 그리기
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let prev = cur;
        // 양의 좌표를 찾기 위한 배열
        let dots = [];
        // 오른쪽으로 이동 및 스피드 추가
        cur.x += this.speed;

        // 끊김없이 언덕 나오기, 일정영역에서 사라지면 배열에서 빼주고 새로운것을 앞으로 등 관리하기
        // 멀리있는 물체보다 가까이 있는 물체가 빠르게 지나가 애니메이션 효과 발생
        if (cur.x > -this.gap) {
            // 앞에서 부터 추가
            this.points.unshift({
                x: -(this.gap * 2),
                y: this.getY()
            });
        } else if ( cur.x > this.stageWidth + this.gap) {
            this.points.splice(-1);
            console.log(this.points);
        }

        ctx.moveTo(cur.x, cur.y);

        let prevCx = cur.x;
        let prevCy = cur.y;

        for (let i=1; i<this.points.length;i++){
            // 포인트 배열 가져오기
            cur = this.points[i];
            cur.x += this.speed;
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            // 곡선 그리기
            ctx.quadraticCurveTo(prev.x,prev.y,cx,cy);
            // 리턴값
            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy,
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x,prev.y);
        ctx.lineTo(this.stageWidth,this.stageHeight);
        ctx.lineTo(this.points[0].x,this.stageHeight);
        ctx.fill();

        return dots;
    }
    // 언덕의 Y값 랜덤으로 주기
    getY() {
        const min = this.stageHeight / 8;
        const max = this.stageHeight - min;
        return min + Math.random() * max;
    }
}