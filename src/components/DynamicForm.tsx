import React, { useState } from 'react';
import type { ChangeEvent } from 'react';


import type { FieldConfig } from '../models/modelConfig';

interface DynamicFormProps {
  fields: FieldConfig[];
  onSubmit: (data: Record<string, any>) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);

  const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const target = e.target;

  if (target instanceof HTMLInputElement && target.type === 'file' && target.files) {
    const { name, files } = target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  } else {
    // For textarea or select or non-file input
    const { name, value } = target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};


  // Simple voice recorder example (start/stop buttons)
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);

  const startRecording = async () => {
    if (!navigator.mediaDevices) {
      alert('Media devices API not supported');
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      setVoiceBlob(blob);
      setFormData(prev => ({ ...prev, voiceRecording: blob }));
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      {fields.map(field => {
        if (field.type === 'text' || field.type === 'number') {
          return (
            <div key={field.name}>
              <label className="block mb-1 font-semibold" htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
          );
        }
        if (field.type === 'textarea') {
          return (
            <div key={field.name}>
              <label className="block mb-1 font-semibold" htmlFor={field.name}>{field.label}</label>
              <textarea
                id={field.name}
                name={field.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                rows={4}
              />
            </div>
          );
        }
        if (field.type === 'select' && field.options) {
          return (
            <div key={field.name}>
              <label className="block mb-1 font-semibold" htmlFor={field.name}>{field.label}</label>
              <select
                id={field.name}
                name={field.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select</option>
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          );
        }
        if (field.type === 'image') {
          return (
            <div key={field.name}>
              <label className="block mb-1 font-semibold" htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
          );
        }
        if (field.type === 'voice') {
          return (
            <div key={field.name}>
              <label className="block mb-1 font-semibold">{field.label}</label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={recording ? stopRecording : startRecording}
                  className={`px-4 py-2 rounded text-white ${recording ? 'bg-red-500' : 'bg-green-500'}`}
                >
                  {recording ? 'Stop Recording' : 'Start Recording'}
                </button>
                {voiceBlob && (
                  <audio controls src={URL.createObjectURL(voiceBlob)} className="ml-4" />
                )}
              </div>
            </div>
          );
        }
        return null;
      })}

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}