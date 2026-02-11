
import { Preset } from './types';

export const PRESETS: Preset[] = [
  {
    id: 'remove-bg',
    name: 'Background Remover',
    icon: '🖼️',
    category: 'General',
    prompt: 'Remove the background of this image and replace it with a clean, professional studio white background.'
  },
  {
    id: 'remove-distractions',
    name: 'Remove Photobombers',
    icon: '👤',
    category: 'General',
    prompt: 'Identify and remove any people or distracting objects in the background of this image, seamlessly filling in the space.'
  },
  {
    id: 'change-clothes',
    name: 'Modern Outfit',
    icon: '👕',
    category: 'Clothing',
    prompt: 'Change the clothing of the person in the image to a stylish modern business-casual outfit.'
  },
  {
    id: 'sunglasses',
    name: 'Add Sunglasses',
    icon: '🕶️',
    category: 'Accessories',
    prompt: 'Add a pair of high-quality, stylish designer sunglasses to the person in the image.'
  },
  {
    id: 'hat',
    name: 'Add Trendy Hat',
    icon: '🧢',
    category: 'Accessories',
    prompt: 'Add a fashionable trendy baseball cap to the person in the image.'
  },
  {
    id: 'skin-tone',
    name: 'Warm Skin Tone',
    icon: '✨',
    category: 'Effects',
    prompt: 'Slightly adjust the lighting and skin tone of the person in the image to have a warm, sun-kissed glow.'
  },
  {
    id: 'retro',
    name: 'Retro 90s Filter',
    icon: '🎞️',
    category: 'Effects',
    prompt: 'Apply a nostalgic 90s retro film filter with subtle grain, chromatic aberration, and warm vintage colors.'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Aesthetic',
    icon: '🌃',
    category: 'Effects',
    prompt: 'Transform the lighting and atmosphere of the image into a cyberpunk neon aesthetic with blues and pinks.'
  }
];
