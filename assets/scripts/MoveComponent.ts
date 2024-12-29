import { _decorator, Component, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

const ContentSize = 725;

@ccclass('MoveComponent')
export class MoveComponent extends Component {

    @property(Node)
    target1ToMove: Node = null;

    @property(Node)
    target2ToMove: Node = null;

    private moveSpeed: number = 100; // 移动速度 

    private _canMove: boolean = false // 是否可以被控制

    start() {
        this.moveSpeed = GameManager.shared().moveSpeed;
    }

    update(deltaTime: number) {
        if (!this._canMove) {
            return;
        }
        // 设置移动坐标
        const moveDistance: number = deltaTime * this.moveSpeed;

        // target1 移动后坐标
        let p1 = this.target1ToMove.getPosition();
        this.target1ToMove.setPosition(p1.x - moveDistance, p1.y);

        // target2 移动后坐标
        let p2 = this.target2ToMove.getPosition();
        this.target2ToMove.setPosition(p2.x - moveDistance, p2.y);

        // 图片离开屏幕处理
        if (p1.x < -ContentSize) {
            p2 = this.target2ToMove.getPosition();
            this.target1ToMove.setPosition(p2.x + ContentSize, p2.y) 
        }
        if (p2.x < -ContentSize) {
            p1 = this.target1ToMove.getPosition();
            this.target2ToMove.setPosition(p1.x + ContentSize, p1.y) 
        }
    }

    public enableMove() {
        this._canMove = true;
    }

    public disableMove() {
        this._canMove = false;
    }
}

