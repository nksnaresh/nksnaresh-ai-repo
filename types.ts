
export interface ImageState {
  original: string | null;
  current: string | null;
  history: string[];
}

export enum EditAction {
  REMOVE_BG = "Remove Background",
  REMOVE_OBJECT = "Remove Object",
  CHANGE_CLOTHES = "Change Clothes",
  ADD_SUNGLASSES = "Add Sunglasses",
  ADD_HAT = "Add Hat",
  CHANGE_SKIN = "Adjust Skin Tone",
  CUSTOM = "Custom Prompt"
}

export interface Preset {
  id: string;
  name: string;
  icon: string;
  prompt: string;
  category: "General" | "Clothing" | "Accessories" | "Effects";
}
