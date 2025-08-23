import React, { useState, useEffect } from 'react';
import { getPlantCareTips } from '../services/geminiService';

const PlantCareAssistant = ({ plantName }) => {
  const [tips, setTips] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        setError(null);
        const careTips = await getPlantCareTips(plantName);
        setTips(careTips);
      } catch (err) {
        setError("Failed to get care tips. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantName]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Asking our expert botanist for advice...</p>
        </div>
      );
    }

    if (error) {
      return <p className="alert alert-danger">{error}</p>;
    }

    const formattedTips = tips.split('\n').map((line, index) => {
      if (line.startsWith('- **')) {
        const key = line.substring(4, line.indexOf('**:', 4));
        const value = line.substring(line.indexOf('**:') + 3);
        return (
          <p key={index} className="mb-2">
            <strong className="text-dark">{key}:</strong>
            <span className="text-muted">{value}</span>
          </p>
        );
      }
      if (line.trim() === "") return null;
      return <p key={index} className="mb-2">{line}</p>;
    }).filter(Boolean);

    return <div className="care-assistant-tips">{formattedTips}</div>;
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default PlantCareAssistant;
