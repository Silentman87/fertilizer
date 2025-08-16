import React, { useState } from 'react';

const ProposalForm = () => {
  const [formData, setFormData] = useState({
    farmername: '',
    mobilenumber: '',
    society: '',
    village: '',
    fertilizertype: 'urea',
    fertilizerid: '',
    quantityrequired: '',
    deliverydate: '',
    kishancard: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.farmername.trim()) newErrors.farmername = 'Farmer name is required';
    if (!formData.mobilenumber.trim()) newErrors.mobilenumber = 'Contact number is required';
    if (!formData.village.trim()) newErrors.village = 'Village name is required';
    if (!formData.society.trim()) newErrors.society = 'Society is required';
    if (!formData.fertilizertype.trim()) newErrors.fertilizertype = 'Fertilizer type is required';
    if (!formData.fertilizerid.trim()) newErrors.fertilizerid = 'Fertilizer ID is required';
    if (!formData.quantityrequired.trim()) newErrors.quantityrequired = 'Quantity required is required';
    if (!formData.deliverydate.trim()) newErrors.deliverydate = 'Preferred delivery date is required';
    if (!formData.kishancard.trim()) newErrors.kishancard = 'Kisan card is required';

    
    if (formData.mobilenumber && !/^\d{10}$/.test(formData.mobilenumber)) {
      newErrors.mobilenumber = 'Please enter a valid 10-digit mobile number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Fertilizer demand request submitted successfully! You will receive confirmation within 24 hours.');
      
      setFormData({
         farmername: '',
         mobilenumber: '',
         society: '',
          village: '',
          fertilizertype: 'urea',
          fertilizerid: '',
         quantityrequired: '',
           deliverydate: '',
          kishancard: ''
      });
    } catch (error) {
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Fertilizer Demand Request</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Farmer Information */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
            <span className="mr-2">👨‍🌾</span>
            Farmer Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="farmername" className="block text-sm font-medium text-gray-700 mb-2">
                Farmer Name *
              </label>
              <input
                type="text"
                id="farmername"
                name="farmername"
                value={formData.farmername}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.farmername ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.farmername && <p className="mt-1 text-sm text-red-600">{errors.farmername}</p>}
            </div>

            <div>
              <label htmlFor="mobilenumber" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                id="mobilenumber"
                name="mobilenumber"
                value={formData.mobilenumber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.mobilenumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter 10-digit mobile number"
              />
              {errors.mobilenumber && <p className="mt-1 text-sm text-red-600">{errors.mobilenumber}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-2">
                Village *
              </label>
              <input
                type="text"
                id="village"
                name="village"
                value={formData.village}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.village ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter village name"
              />
              {errors.village && <p className="mt-1 text-sm text-red-600">{errors.village}</p>}
            </div>

            <div>
              <label htmlFor="society" className="block text-sm font-medium text-gray-700 mb-2">
                Society *
              </label>
              <input
                type="text"
                id="society"
                name="society"
                value={formData.society}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.society ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter society name"
              />
              {errors.society && <p className="mt-1 text-sm text-red-600">{errors.society}</p>}
            </div>
          </div>
        </div>

        {/* Fertilizer Requirements */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
            <span className="mr-2">🧪</span>
            Fertilizer Requirements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fertilizertype" className="block text-sm font-medium text-gray-700 mb-2">
                Fertilizer Type *
              </label>
              <input 
               type='text'
               id="fertilizertype"
                name="fertilizertype"
                value={formData.fertilizertype}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.fertilizertype ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Urea, DAP, Potash"
              />
              {errors.fertilizertype && <p className="mt-1 text-sm text-red-600">{errors.fertilizertype}</p>}
            </div>
             

             <div>
              <label htmlFor="fertilizerid" className="block text-sm font-medium text-gray-700 mb-2">
                Fertilizer ID *
              </label>
              <input
                type="text"
                id="fertilizerid"
                name="fertilizerid"
                value={formData.fertilizerid}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.fertilizerid ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter fertilizer ID" 
              />
              {errors.fertilizerid && <p className="mt-1 text-sm text-red-600">{errors.fertilizerid}</p>}
             </div>

            <div>
              <label htmlFor="quantityrequired" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity Required (Bags/Kg) *
              </label>
              <input
                type="text"
                id="quantityrequired"
                name="quantityrequired"
                value={formData.quantityrequired}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.quantityrequired ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 10 bags or 500 kg"
              />
              {errors.quantityrequired && <p className="mt-1 text-sm text-red-600">{errors.quantityrequired}</p>}
            </div>

            <div>
              <label htmlFor="deliverydate" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Delivery Date *
              </label>
              <input
                type="date"
                id="deliverydate"
                name="deliverydate"
                value={formData.deliverydate}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.deliverydate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.deliverydate && <p className="mt-1 text-sm text-red-600">{errors.deliverydate}</p>}
            </div>

            <div>
              <label htmlFor="kishancard" className="block text-sm font-medium text-gray-700 mb-2">
                Kisan Card Number *
              </label>
              <input 
              type='text'
              id="kishancard"
              name="kishancard"
              value={formData.kishancard}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.kishancard ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter Kisan card number"
                />
              {errors.kishancard && <p className="mt-1 text-sm text-red-600">{errors.kishancard}</p>}
            </div>
            </div>
        </div>
          
        
        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-md text-white font-medium text-lg transition-colors duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Request...
              </span>
            ) : (
              'Submit Fertilizer Demand Request'
            )}
          </button>
        </div>

        <div className="text-center text-sm text-gray-600 mt-4">
          <p>* Required fields | Your request will be processed within 24-48 hours</p>
          <p>For urgent requirements, please contact the society directly</p>
        </div>
      </form>
    </div>
  );
};

export default ProposalForm;