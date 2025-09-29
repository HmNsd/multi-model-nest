import React, { useState } from 'react';
import { AI_MODELS } from './models/modelConfig';
import type { ModelConfig } from './models/modelConfig';
import { DynamicForm } from './components/DynamicForm';
import { DarkModeToggle } from './components/DarkModeToggle.tsx';

// Add your AI providers here
const AI_PROVIDERS = [
  { id: 'claude', name: 'Claude' },
  { id: 'chatgpt', name: 'ChatGPT' },
  { id: 'gemini', name: 'Gemini' },
  // Add more providers as needed
];

function App() {
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<ModelConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(e.target.value);
    setSelectedModel(null); // Reset model selection when provider changes
    setFormData({});
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = AI_MODELS.find(m => m.id === e.target.value) || null;
    setSelectedModel(model);
    setFormData({});
  };

  const handleSubmit = (data: Record<string, any>) => {
    setFormData(data);
    console.log('Submitted data:', data);
    alert('This is a Demo. Definetily will code backend integration for you.');
  };

  return (
    <div className={`mx-auto p-6 min-h-screen transition-colors
      bg-gradient-to-br from-purple-100 via-blue-100 to-white text-gray-900
      dark:bg-gradient-to-br dark:from-stone-600 dark:via-black dark:to-stone-600 dark:text-gray-100`}>
      <div className='flex justify-between items-center mb-6'>
        <h1 className="text-3xl font-bold mb-6">AI Model Dynamic Input Form</h1>
        <DarkModeToggle />
      </div>

      {/* AI Provider Selection */}
      <div className='max-w-1/2 mx-auto mb-4'>
        <label className="block mb-2 font-semibold" htmlFor="provider-select">
          Select AI Provider:
        </label>
        <select
          id="provider-select"
          onChange={handleProviderChange}
          className="border p-2 rounded w-full mb-4"
          value={selectedProvider}
        >
          <option value="" disabled>
            -- Select a Provider --
          </option>
          {AI_PROVIDERS.map(provider => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>
      </div>

      {/* AI Model Selection */}
      <div className='max-w-1/2 mx-auto'>
        <label className="block mb-2 font-semibold" htmlFor="model-select">
          Select AI Model:
        </label>
        <select
          id="model-select"
          onChange={handleModelChange}
          className="border p-2 rounded w-full mb-6"
          defaultValue=""
          disabled={!selectedProvider}
        >
          <option value="" disabled>
            -- Select a Model --
          </option>
          {AI_MODELS.map(model => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      {/* Show selected provider (optional) */}
      {selectedProvider && (
        <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          Selected Provider: <span className="font-semibold">{AI_PROVIDERS.find(p => p.id === selectedProvider)?.name}</span>
        </div>
      )}

      {selectedModel ? (
        <DynamicForm fields={selectedModel.fields} onSubmit={handleSubmit} />
      ) : (
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">Please select approprite AI model as per need.</p>
      )}

      {Object.keys(formData).length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Submitted Data:</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;