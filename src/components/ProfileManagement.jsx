import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CUSTOMER_UPDATE } from '../graphql/customerQueries';
import { useAuth } from '../context/AuthContext';
import { UserIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ProfileManagement = () => {
  const { customer, accessToken, refreshCustomer } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    phone: customer?.phone || '',
    acceptsMarketing: customer?.acceptsMarketing || false,
  });

  const [updateCustomer] = useMutation(CUSTOMER_UPDATE);

  const formatPhoneNumber = (phone) => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // If the number starts with '0', replace it with the UK country code
    if (cleaned.startsWith('0')) {
      return '+44' + cleaned.substring(1);
    }
    
    // If the number doesn't have a country code (less than 11 digits), assume UK
    if (cleaned.length <= 10) {
      return '+44' + cleaned;
    }
    
    // If number doesn't start with '+', add it
    if (!phone.startsWith('+')) {
      return '+' + cleaned;
    }
    
    return phone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!accessToken) {
      setError('You must be logged in to update your profile');
      return;
    }

    try {
      console.log('Updating profile with token:', accessToken);
      
      // Format phone number if provided
      const formattedPhone = formData.phone ? formatPhoneNumber(formData.phone) : null;
      
      const { data } = await updateCustomer({
        variables: {
          customerAccessToken: accessToken,
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formattedPhone,
            acceptsMarketing: formData.acceptsMarketing,
          },
        },
      });

      if (data.customerUpdate.customerUserErrors.length > 0) {
        throw new Error(data.customerUpdate.customerUserErrors[0].message);
      }

      await refreshCustomer();
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow only digits, spaces, dashes, plus sign, and parentheses
    if (/^[\d\s\-+()]*$/.test(value)) {
      setFormData({ ...formData, phone: value });
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      phone: customer?.phone || '',
      acceptsMarketing: customer?.acceptsMarketing || false,
    });
    setError(null);
    setSuccessMessage(null);
    setIsEditing(false);
  };

  if (!customer) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <UserIcon className="h-6 w-6 text-reginify-navy" />
          <h2 className="text-lg font-medium text-reginify-navy">Profile Information</h2>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 text-reginify-navy hover:text-reginify-navy/80"
          >
            <PencilIcon className="h-5 w-5" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-green-50 text-green-600 rounded-lg text-sm">
          {successMessage}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-reginify-navy">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1 block w-full rounded-md border border-reginify-gold/10 px-3 py-2 focus:border-reginify-gold focus:outline-none focus:ring-1 focus:ring-reginify-gold"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-reginify-navy">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1 block w-full rounded-md border border-reginify-gold/10 px-3 py-2 focus:border-reginify-gold focus:outline-none focus:ring-1 focus:ring-reginify-gold"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-reginify-navy">
              Phone Number (Optional)
              <span className="text-sm text-reginify-navy/60 ml-2">
                Include country code (e.g., +44 for UK)
              </span>
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="+44 123 456 7890"
              className="mt-1 block w-full rounded-md border border-reginify-gold/10 px-3 py-2 focus:border-reginify-gold focus:outline-none focus:ring-1 focus:ring-reginify-gold"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="acceptsMarketing"
              checked={formData.acceptsMarketing}
              onChange={(e) => setFormData({ ...formData, acceptsMarketing: e.target.checked })}
              className="h-4 w-4 rounded border-reginify-gold/10 text-reginify-gold focus:ring-reginify-gold"
            />
            <label htmlFor="acceptsMarketing" className="text-sm text-reginify-navy">
              Subscribe to marketing emails
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center space-x-1 px-4 py-2 text-reginify-navy hover:text-reginify-navy/80"
            >
              <XMarkIcon className="h-5 w-5" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1 px-4 py-2 bg-reginify-navy text-white rounded-lg hover:bg-reginify-navy/90"
            >
              <CheckIcon className="h-5 w-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-reginify-navy/70">Name</p>
            <p className="font-medium text-reginify-navy">
              {customer.firstName} {customer.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-reginify-navy/70">Email</p>
            <p className="font-medium text-reginify-navy">{customer.email}</p>
          </div>
          {customer.phone && (
            <div>
              <p className="text-sm text-reginify-navy/70">Phone</p>
              <p className="font-medium text-reginify-navy">{customer.phone}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-reginify-navy/70">Marketing Preferences</p>
            <p className="font-medium text-reginify-navy">
              {customer.acceptsMarketing ? 'Subscribed to marketing emails' : 'Not subscribed to marketing emails'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileManagement;
