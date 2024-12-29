import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameData')
export class GameData {

    private static _score: number = 0;

    public static addScore(score:number=1) {
        this._score += score;
    }

    public static getScore(): number {
        return this._score;
    }
}

