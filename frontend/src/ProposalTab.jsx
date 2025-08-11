import React from 'react'

// Proposals Tab Component
const ProposalsTab = () => {
  const [proposals, setProposals] = useState([]);
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [proposalsData, fertilizersData] = await Promise.all([
        apiService.fetchProposals(),
        apiService.fetchFertilizers()
      ]);
      setProposals(proposalsData);
      setFertilizers(fertilizersData);
      setError(null);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProposal = async (formData) => {
    try {
      const result = await apiService.submitProposal(formData);
      if (result.success) {
        loadData(); // Reload proposals
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <ProposalForm onSubmit={handleSubmitProposal} fertilizers={fertilizers} />
      </div>
      <div className="lg:col-span-2">
        <ProposalsTable 
          proposals={proposals} 
          loading={loading} 
          error={error} 
          onRetry={loadData} 
        />
      </div>
    </div>
  );
};
