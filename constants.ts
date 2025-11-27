
import { ChristmasStyle, StyleOption, Decoration, DecorationPosition, PoseOption, TextStyleOption } from './types';

export const STYLES: StyleOption[] = [
  {
    id: ChristmasStyle.CLASSIC,
    title: 'Clásico',
    description: 'Elegante y cálido.',
    promptModifier: 'in a cozy living room with a fireplace. The lighting is warm and magical. Photorealistic style.',
    icon: 'Home'
  },
  {
    id: ChristmasStyle.SNOWY,
    title: 'Invernal',
    description: 'Bajo la nieve.',
    promptModifier: 'outdoors in a snowy winter wonderland landscape with falling snow. Background has snowy pine trees. Photorealistic style.',
    icon: 'Snowflake'
  },
  {
    id: ChristmasStyle.FUNNY,
    title: 'Divertido',
    description: 'Fiesta colorida.',
    promptModifier: 'bright festive party context. The mood is joyful, funny and exaggerated. Photorealistic style.',
    icon: 'Smile'
  },
  {
    id: ChristmasStyle.ELVES,
    title: 'Fantasía',
    description: 'Taller mágico.',
    promptModifier: 'inside Santa\'s magical workshop full of wooden toys. Magical fantasy art style.',
    icon: 'Wand2'
  }
];

export const DECORATIONS: Decoration[] = [
  { id: 'tree', label: 'Árbol Navidad', icon: 'Tree', defaultPosition: DecorationPosition.BACKGROUND },
  { id: 'gifts', label: 'Montaña Regalos', icon: 'Gift', defaultPosition: DecorationPosition.FOREGROUND },
  { id: 'lights', label: 'Luces Colgantes', icon: 'Lightbulb', defaultPosition: DecorationPosition.BACKGROUND },
  { id: 'stockings', label: 'Calcetines', icon: 'Sock', defaultPosition: DecorationPosition.BACKGROUND },
  { id: 'wreath', label: 'Corona', icon: 'Circle', defaultPosition: DecorationPosition.BACKGROUND },
];

export const POSES: PoseOption[] = [
  { id: 'original', label: 'Original', promptDescription: 'Keep the people in exactly the same pose and position as the original image.' },
  { id: 'sitting', label: 'Sentados', promptDescription: 'The people should be sitting comfortably together on the floor or a sofa.' },
  { id: 'opening', label: 'Regalos', promptDescription: 'The people should be interacting with wrapped gift boxes, appearing to open them.' },
  { id: 'toasting', label: 'Brindando', promptDescription: 'The people should be holding mugs of hot cocoa or glasses, making a toast.' }
];

export const TEXT_STYLES: TextStyleOption[] = [
  { 
    id: 'gold_elegant', 
    label: 'Dorado Elegante', 
    promptDescription: 'elegant, cursive gold typography floating magically or on a fancy card',
    previewClass: 'font-serif text-yellow-600 italic'
  },
  { 
    id: 'wood_sign', 
    label: 'Cartel Madera', 
    promptDescription: 'carved into a rustic wooden sign placed in the background',
    previewClass: 'font-sans font-bold text-amber-800'
  },
  { 
    id: 'neon', 
    label: 'Luces Neón', 
    promptDescription: 'bright glowing red or green neon sign on the wall',
    previewClass: 'font-mono text-red-500 drop-shadow-md'
  },
  { 
    id: 'snowy', 
    label: 'Nieve', 
    promptDescription: 'written in the snow or made of snow letters',
    previewClass: 'font-black text-blue-200'
  }
];

export const MAX_FILE_SIZE_MB = 4;
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
