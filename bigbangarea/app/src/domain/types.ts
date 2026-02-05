export interface AgentSaveData {
    height: number;
    width: number;
    position_x: number;
    position_y: number;
    color: string;
    imgSrc: string;
    timeLeft: number;
    moneyProduction : number;
}

export interface GameSaveStat {
    money: number;
    agents: AgentSaveData[];
    lastSaveTime: number;
}