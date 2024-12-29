import { _decorator, Component, Label, Node } from 'cc';
import { Bird } from './Bird';
import { MoveComponent } from './MoveComponent'
import { PipeSpawner } from './PipeSpawner';
import { GameReadyUI } from './UI/GameReadyUI';
import { GameData } from './GameData';
const { ccclass, property } = _decorator;

enum GameState {
    READY,
    GAMING,
    GAMEOVER
}

@ccclass('GameManager')
export class GameManager extends Component {

    private static _shared: GameManager = null;

    currentGS: GameState = GameState.READY;

    public static shared() {
        return this._shared
    }

    @property
    moveSpeed: number = 100;

    @property(Bird)
    bird: Bird = null; // 小鸟

    @property(MoveComponent)
    bgMoving: MoveComponent = null; // 背景

    @property(MoveComponent)
    landMoving: MoveComponent = null; // 地板

    @property(PipeSpawner)
    pipeSpawner: PipeSpawner = null; // 管道生成器

    @property(GameReadyUI)
    gameReadyUI: GameReadyUI = null;

    @property(Node)
    gamingUI: Node = null;

    @property(Label)
    scoreLabel: Label = null

    onLoad() {
        GameManager._shared = this;
    }

    protected start(): void {
        this.transitionToReadyState();
    }

    transitionToReadyState() {
        this.currentGS = GameState.READY;
        this.bird.disableControl();
        this.bgMoving.disableMove();
        this.landMoving.disableMove();
        this.pipeSpawner.pause();
        this.gamingUI.active = false;
    }

    transitionToGamingState() {
        this.currentGS = GameState.GAMING;
        this.bird.enableControl();
        this.bgMoving.enableMove();
        this.landMoving.enableMove();
        this.pipeSpawner.play();
        this.gameReadyUI.node.active = false;
        this.gamingUI.active = true;
    }

    transitionToGameOverState() {
        this.currentGS = GameState.GAMEOVER;
    }

    addScore(score:number=1) {
        GameData.addScore(score);
        this.scoreLabel.string = GameData.getScore().toString();
    }

    
}

