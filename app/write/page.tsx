'use client';

import { useState } from 'react';

interface FormData {
  projectName: string;
  description: string;
  fundingAmount: string;
  targetAudience: string;
  impact: string;
}

export default function WritePage() {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    description: '',
    fundingAmount: '',
    targetAudience: '',
    impact: ''
  });

  const [generatedProposal, setGeneratedProposal] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate proposal');
      }

      const data = await response.json();
      setGeneratedProposal(data.proposal || '');
    } catch (err) {
      console.error('Error generating proposal:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate proposal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Grant Writer</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.projectName}
                onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Description
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-md"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Funding Amount Needed
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.fundingAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, fundingAmount: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-md"
                rows={3}
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Impact
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-md"
                rows={3}
                value={formData.impact}
                onChange={(e) => setFormData(prev => ({ ...prev, impact: e.target.value }))}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Proposal'}
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Generated Proposal</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Generating your proposal...</p>
            </div>
          ) : error ? (
            <div className="text-red-600 p-4 bg-red-50 rounded-md">
              {error}
            </div>
          ) : generatedProposal ? (
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap">{generatedProposal}</pre>
              <button
                onClick={() => navigator.clipboard.writeText(generatedProposal)}
                className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Copy to Clipboard
              </button>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Fill out the form and click "Generate Proposal" to create your grant proposal.
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 