export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'image' | 'voice' | 'textarea';
  options?: string[]; // for select fields
}

export interface ModelConfig {
  id: string;
  name: string;
  fields: FieldConfig[];
}

export const AI_MODELS: ModelConfig[] = [
  {
    id: 'image-classifier',
    name: 'Image Classification',
    fields: [
      { name: 'image', label: 'Upload Image', type: 'image' },
      { name: 'label', label: 'Label', type: 'text' },
    ],
  },
  {
    id: 'speech-recognition',
    name: 'Speech Recognition',
    fields: [
      { name: 'voiceRecording', label: 'Record Voice', type: 'voice' },
      { name: 'transcript', label: 'Transcript', type: 'textarea' },
    ],
  },
  {
    id: 'text-generation',
    name: 'Text Generation',
    fields: [
      { name: 'prompt', label: 'Text Prompt', type: 'textarea' },
      { name: 'maxTokens', label: 'Max Tokens', type: 'number' },
    ],
  },
  {
    id: 'text-to-image',
    name: 'Text-to-Image Generation',
    fields: [
      { name: 'prompt', label: 'Text Prompt', type: 'textarea' },
      { name: 'label', label: 'Label', type: 'text' },
    ],
  },
  {
    id: 'emotion-detection',
    name: 'Emotion Detection',
    fields: [
      { name: 'prompt', label: 'Text Prompt', type: 'textarea' },
      { name: 'label', label: 'Label', type: 'text' },
    ],
  },
];
