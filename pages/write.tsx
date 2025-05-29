import { useState } from 'react';
import { generateGrantProposal, GrantProposalInput } from '@/lib/gpt';
import ProposalPreview from '@/components/ProposalPreview';

export default function WritePage() {
  const [formData, setFormData] = useState<GrantProposalInput>({
    projectName: '',
    organizationType: 'startup',
    mission: '',
    fundingNeeds: '',
    desiredImpact: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [proposal, setProposal] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const generatedProposal = await generateGrantProposal(formData);
      setProposal(generatedProposal);
    } catch (err) {
      setError('Failed to generate proposal. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Grant Writer
          </h1>
          <p className="text-gray-600">
            Generate a professional grant proposal using AI
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-md p-6">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              required
              value={formData.projectName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700">
              Organization Type
            </label>
            <select
              id="organizationType"
              name="organizationType"
              required
              value={formData.organizationType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="nonprofit">Nonprofit</option>
              <option value="startup">Startup</option>
              <option value="small business">Small Business</option>
              <option value="individual">Individual</option>
            </select>
          </div>

          <div>
            <label htmlFor="mission" className="block text-sm font-medium text-gray-700">
              Mission / Purpose
            </label>
            <textarea
              id="mission"
              name="mission"
              required
              rows={4}
              value={formData.mission}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe your organization's mission and purpose..."
            />
          </div>

          <div>
            <label htmlFor="fundingNeeds" className="block text-sm font-medium text-gray-700">
              Funding Needs
            </label>
            <textarea
              id="fundingNeeds"
              name="fundingNeeds"
              required
              rows={4}
              value={formData.fundingNeeds}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe what you need funding for..."
            />
          </div>

          <div>
            <label htmlFor="desiredImpact" className="block text-sm font-medium text-gray-700">
              Desired Impact
            </label>
            <textarea
              id="desiredImpact"
              name="desiredImpact"
              required
              rows={4}
              value={formData.desiredImpact}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe the impact you hope to achieve..."
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Proposal'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {proposal && <ProposalPreview content={proposal} />}
      </div>
    </div>
  );
} 