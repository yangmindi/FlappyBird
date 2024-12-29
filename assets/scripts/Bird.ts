import { _decorator, Component, Input, input, Node, RigidBody2D, Vec2, Vec3, math, Collider2D, Contact2DType, IPhysics2DContact, Animation } from 'cc';
import { Tags } from './Tags';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    // 物理引擎（刚体组件）
    private rgd2D: RigidBody2D = null;

    // 当前是否可以被控制
    private _canControl: boolean = false;

    // 旋转角度
    @property
    rotateSpeed: number = 30;

    onLoad() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        this.rgd2D = this.getComponent(RigidBody2D);
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart() {
        if (!this._canControl) {
            return;
        }
        // 向上移动速度
        this.rgd2D.linearVelocity = new Vec2(0, 10); // 数值代表xx像素/s
        // 向上旋转角度
        this.node.angle = 30;
    }

    protected update(dt: number): void {
        if (!this._canControl) {
            return;
        }
        if (this.node.angle > -60) {
            this.node.angle -= dt * this.rotateSpeed;
        }
    }

    enableControl() {
        this.getComponent(Animation).enabled = true;
        this.rgd2D.enabled = true;
        this._canControl = true;
    }

    disableControl() {
        this.getComponent(Animation).enabled = false;
        this.rgd2D.enabled = false;
        this._canControl = false;
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log(otherCollider.tag);
    }

    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == Tags.PIPE_MIDDLE) {
            GameManager.shared().addScore();
        }    
    }
}

