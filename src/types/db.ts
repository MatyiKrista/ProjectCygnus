import { UUID } from './game';

export type User = {
  createdAt: Date;
  email: string;
  name: string | null;
  photoUrl: string | null;
  updatedAt: Date;
  friends: string[];
};

export type ActionType = 'move' | 'attack' | 'defend';

export interface BaseAction<T extends ActionType> {
  type: T;
  unit: UUID;
}

export interface MoveAction extends BaseAction<'move'> {
  from: UUID;
  to: UUID;
}

export interface AttackAction extends BaseAction<'attack'> {
  target: UUID;
}

export interface DefendAction extends BaseAction<'defend'> {}

export type Action = MoveAction | AttackAction | DefendAction;

export type Turn = {
  number: number;
  player: string;
  actions: Action[];
};

export type Game = {
  createdAt: Date;
  createdBy: string;
  players: string[];
  updatedAt: Date;
  updatedBy: string;
  turns: Turn[];
  currentTurn: number;
};
