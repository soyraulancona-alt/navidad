
export enum ChristmasStyle {
  CLASSIC = 'CLASSIC',
  SNOWY = 'SNOWY',
  FUNNY = 'FUNNY',
  ELVES = 'ELVES'
}

export interface StyleOption {
  id: ChristmasStyle;
  title: string;
  description: string;
  promptModifier: string;
  icon: string;
}

export enum DecorationPosition {
  LEFT = 'on the left side',
  RIGHT = 'on the right side',
  BACKGROUND = 'in the background',
  FOREGROUND = 'in the foreground'
}

export interface Decoration {
  id: string;
  label: string;
  icon: string;
  defaultPosition: DecorationPosition;
}

export interface SelectedDecoration {
  id: string;
  position: DecorationPosition;
}

export interface PoseOption {
  id: string;
  label: string;
  promptDescription: string;
}

export interface TextStyleOption {
  id: string;
  label: string;
  promptDescription: string;
  previewClass: string; // CSS class for UI preview
}

export interface TextConfiguration {
  content: string;
  styleId: string;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  resultImage: string | null;
}
