import { Agent } from "../domain/Agent";
import { Solde } from "../domain/Solde";
import { AgentSaveData, GameSaveStat } from "../domain/types";

const SAVE_KEY = 'SAVE_BigBang';

export class SaveManager {

    static save(solde: Solde, agents: Agent[]) {

        const agentsJson: AgentSaveData[] = agents.map(agent => {
            return {
                "height": agent.height,
                'width': agent.width,
                'position_x': agent.position_x,
                'position_y': agent.position_y,
                'color': agent.color,
                'imgSrc': agent.imgSrc,
                'timeLeft': agent.timeLeft,
                'moneyProduction' : agent.moneyProduction
            }
        });
        const gameData: GameSaveStat = {
            "money": solde.money,
            "agents": agentsJson,
            "lastSaveTime": Date.now(),
        }

        const jsonString = JSON.stringify(gameData);

        localStorage.setItem(SAVE_KEY, jsonString)
        console.log("✅ Save done !");
    }



    static load(canvas: any) {
        let save = localStorage.getItem(SAVE_KEY);
        if (!save) {
            return null
        }
        const obj = JSON.parse(save);

        const loadAgents: Agent[] = obj.agents.map((objAgent: { height: number; width: number; position_x: number; position_y: number; color: string; imgSrc: string; timeLeft: number; moneyProduction: number | undefined; }) => {
            const minutesRestantes = (objAgent.timeLeft / 1000) / 60;
            return new Agent(canvas, objAgent.height, objAgent.width, objAgent.position_x, objAgent.position_y, objAgent.color,objAgent.imgSrc, minutesRestantes, objAgent.moneyProduction || 10);
        });

        return {
            money: obj.money,
            agents: loadAgents,
        };
    }
}