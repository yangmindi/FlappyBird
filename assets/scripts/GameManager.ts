import { _decorator, AudioClip, Component, Game, Label, Node } from 'cc';
import { Bird } from './Bird';
import { MoveComponent } from './MoveComponent'
import { PipeSpawner } from './PipeSpawner';
import { GameReadyUI } from './UI/GameReadyUI';
import { GameData } from './GameData';
import { GameOverUI } from './UI/GameOverUI';
import { AudioMgr } from './AudioMgr';
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

    @property(GameOverUI)
    gameOverUI: GameOverUI = null;

    @property(AudioClip)
    bgAudio:AudioClip = null; 

    @property(AudioClip)
    gameOverAudio:AudioClip = null; 

    onLoad() {
        GameManager._shared = this;
    }

    protected start(): void {
        this.transitionToReadyState();
        AudioMgr.inst.play(this.bgAudio, 0.1); 
    }

    transitionToReadyState() {
        this.currentGS = GameState.READY;
        this.bird.disableControl();
        this.bgMoving.disableMove();
        this.landMoving.disableMove();
        this.pipeSpawner.pause();
        this.gamingUI.active = false;
        this.gameOverUI.hide();
        this.gameReadyUI.node.active = true;
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
        if (this.currentGS == GameState.GAMEOVER) {
            return;
        }
        this.currentGS = GameState.GAMEOVER;
        this.bird.disableControlNotRGD();
        this.bgMoving.disableMove();
        this.landMoving.disableMove();
        this.pipeSpawner.pause();
        this.gamingUI.active = false;
        this.gameOverUI.show(GameData.getScore(),GameData.getBestScore()); 
        GameData.setBestScore();   
        AudioMgr.inst.stop();
        AudioMgr.inst.playOneShot(this.gameOverAudio);
    }

    addScore(score:number=1) {
        GameData.addScore(score);
        this.scoreLabel.string = GameData.getScore().toString();
    }
}

