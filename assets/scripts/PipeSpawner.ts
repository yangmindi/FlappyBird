import { _decorator, Component, instantiate, Node, Prefab, math } from 'cc';
import { PipeComponent } from './PipeComponent';
const { ccclass, property } = _decorator;

@ccclass('PipeSpawner')
export class PipeSpawner extends Component {

    @property(Prefab)
    pipePrefab: Prefab = null;

    private _isSpawner: boolean = false; // 是否开启生成Pipe

    // 生成速率
    @property
    spawnRate: number = 0.5

    private timer : number = 0;

    update(deltaTime: number) {
        if (!this._isSpawner) {
            return;
        }
        this.timer += deltaTime;
        if (this.timer > this.spawnRate) {
            this.timer = 0;
            const pipeInst = instantiate(this.pipePrefab);
            this.node.addChild(pipeInst);
            const y = math.randomRangeInt(-100, 200) 
            const position = this.node.getWorldPosition();
            pipeInst.setWorldPosition(position.x, position.y + y, 0)
        }
    }

    public pause() {
        this._isSpawner = false;
        this.node.children.forEach(child => {
            const pipe = child.getComponent(PipeComponent)
            if (pipe) {
                pipe.pause();
            }
        });
    }

    public play() {
        this._isSpawner = true;
    }
}

