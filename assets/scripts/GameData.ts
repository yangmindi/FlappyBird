import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameData')
export class GameData {

    private static readonly BESTSCORE: string = "BEST_STORE"

    private static _score: number = 0;

    public static addScore(score:number=1) {
        this._score += score;
    }

    public static getScore(): number {
        return this._score;
    }

    public static getBestScore(): number {
        let score = localStorage.getItem(this.BESTSCORE);
        if (score) {
            return parseInt(score);
        }
        return 0;
    }

    public static setBestScore() {
        let currentScore = this.getScore();
        let bestScore = this.getBestScore();
        if (currentScore > bestScore) {
            localStorage.setItem(this.BESTSCORE, currentScore.toString());
        }
    }
}

