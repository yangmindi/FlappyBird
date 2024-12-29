import { _decorator, Component, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('PipeComponent')
export class PipeComponent extends Component {

    private moveSpeed: number = 100;
    private enableUpdate: boolean = true;

    start() {
        this.moveSpeed = GameManager.shared().moveSpeed;
    }

    update(deltaTime: number) {
        if (!this.enableUpdate) {
            return;
        }
        // 管道位置更新
        const pipe = this.node.getPosition();
        const moveDistance = deltaTime * this.moveSpeed;
        this.node.setPosition(pipe.x - moveDistance, pipe.y);
        // 销毁 Pipe
        if (pipe.x < -900) {
            this.node.destroy();
        }
    }

    pause() {
        this.enableUpdate = false;
    }
}

