import { _decorator, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {

    @property(Label)
    currentScoreLabel: Label = null;

    @property(Label)
    bestScoreLabel: Label = null;

    @property(Node)
    newSpire: Node = null;

    @property([Node])
    medalArray:Node[] = []

    public show(currentScore: number, bestScore: number) {
        this.node.active = true;
        this.currentScoreLabel.string = currentScore.toString();
        this.bestScoreLabel.string = bestScore.toString();
        this.newSpire.active = (currentScore > bestScore);

        // 奖牌显示
        var index = currentScore/10;
        index = Math.floor(index);
        index = Math.max(index, 3);
        this.medalArray[index].active = true;
    }

    public hide() {
        this.node.active = false;
    }

    onPlayButtonClick() {
        // 游戏重启
        director.loadScene(director.getScene().name);
    }
}

