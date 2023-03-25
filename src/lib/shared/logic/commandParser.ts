import { Action } from "../enums/action.enum";
import { Type } from "../enums/type.enum";

export interface Command {
  action: Action;
  type: Type;
  value: string;
}

export const process = (prompt: string): Command => {
  prompt = prompt.trim().toLowerCase();
  const [action, type, value] = prompt.split(" - ");
  if (
    Object.values(Action).includes(action as Action) &&
    Object.values(Type).includes(type as Type)
  ) {
    return { action: action as Action, type: type as Type, value };
  }
  throw new Error("Invalid command");
};
