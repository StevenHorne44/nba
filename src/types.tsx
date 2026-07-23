export interface Team {
  name: string; 
  logo: string;
  abbre:string;
}

export interface Player {
  id: string
  fullname: string
  faceimg: string
  height: string
  weight: string
  jersey: string
  position: string
  isPlayerSelected: boolean
  ppg: number
  rpg: number
  apg: number
}

export interface MadeTeam {
  Id?: number ,
  TeamName: string;
  Players: Player[];
}
