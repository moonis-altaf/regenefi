import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  CUSTOMER_ADDRESS_CREATE,
  CUSTOMER_ADDRESS_UPDATE,
  CUSTOMER_ADDRESS_DELETE,
  CUSTOMER_DEFAULT_ADDRESS_UPDATE,
} from '../graphql/customerQueries';
import { useAuth } from '../context/AuthContext';
import { MapPinIcon, PlusIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const AddressForm = ({ address, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    address1: address?.address1 || '',
    address2: address?.address2 || '',
    city: address?.city || '',
    province: address?.province || '',
    zip: address?.zip || '',
    country: address?.country || 'United States',
    phone: address?.phone || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="address1" className="block text-sm font-medium text-reginify-navy">
          Address Line 1
        </label>
        <input
          type="text"
          id="address1"
          required
          value={formData.address1}
          onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
          className="mt-1 block w-full rounded-md border border-reginify-gold/10 px-3 py-2 focus:border-reginify-gold focus:outline-none focus:ring-1 focus:ring-reginify-gold"
        />
      </div>

      <div>
        <label htmlFor="address2" className="block text-sm font-medium text-reginify-navy">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          id="address2"
          value={formData.address2}
          onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
          className="mt-1 block w-full rounded-md border border-reginify-gold/10 px-3 py-2 focus:border-reginify-gold focus:outline-none focus:ring-1 focus:ring-reginify-gold"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-reginify-navy">
            City
          </label>
          <input
            type="text"
            id="city"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="mt-1 block w-full rounded-md border border-reginify-gold/10 px-3 py-2 focus:border-reginify-gold focus:outline-none focus:ring-1 focus:ring-reginify-gold"
          />
        </div>

        <div>
          <label htmlFor="province" className="block text-sm font-medium text-reginify-navy">
            State/Province
          </label>
          <input
            type="text"
            id="province"
            required
            value={formData.province}
            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
            className="mt-1 block w-full rounded-md border border-reginify-gold/10 px-3 py-2 focus:border-reginify-gold focus:outline-none focus:ring-1 focus:ring-reginify-gold"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-reginify-navy">
            ZIP/Postal Code
          </label>
          <input
            type="text"
            id="zip"
            required
            value={formData.zip}
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            className="mt-1 block w-full rounded-md border border-reginify-gold/10 px-3 py-2 focus:border-reginify-gold focus:outline-none focus:ring-1 focus:ring-reginify-gold"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-reginify-navy">
            Country
          </label>
          <input
            type="text"
            id="country"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="mt-1 block w-full rounded-md border border-reginify-gold/10 px-3 py-2 focus:border-reginify-gold focus:outline-none focus:ring-1 focus:ring-reginify-gold"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-reginify-navy">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border border-reginify-gold/10 px-3 py-2 focus:border-reginify-gold focus:outline-none focus:ring-1 focus:ring-reginify-gold"
        />
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-reginify-navy hover:text-reginify-navy/80"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-reginify-navy text-white rounded-lg hover:bg-reginify-navy/90"
        >
          Save Address
        </button>
      </div>
    </form>
  );
};

const AddressManagement = () => {
  const { customer, accessToken } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [error, setError] = useState(null);

  const [createAddress] = useMutation(CUSTOMER_ADDRESS_CREATE);
  const [updateAddress] = useMutation(CUSTOMER_ADDRESS_UPDATE);
  const [deleteAddress] = useMutation(CUSTOMER_ADDRESS_DELETE);
  const [updateDefaultAddress] = useMutation(CUSTOMER_DEFAULT_ADDRESS_UPDATE);

  const handleAddAddress = async (addressData) => {
    try {
      const { data } = await createAddress({
        variables: {
          customerAccessToken: accessToken,
          address: addressData,
        },
      });

      if (data.customerAddressCreate.customerUserErrors.length > 0) {
        throw new Error(data.customerAddressCreate.customerUserErrors[0].message);
      }

      setShowForm(false);
      // Refetch customer data to update the addresses list
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateAddress = async (addressData) => {
    try {
      const { data } = await updateAddress({
        variables: {
          customerAccessToken: accessToken,
          id: editingAddress.id,
          address: addressData,
        },
      });

      if (data.customerAddressUpdate.customerUserErrors.length > 0) {
        throw new Error(data.customerAddressUpdate.customerUserErrors[0].message);
      }

      setEditingAddress(null);
      // Refetch customer data to update the addresses list
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    try {
      const { data } = await deleteAddress({
        variables: {
          customerAccessToken: accessToken,
          id: addressId,
        },
      });

      if (data.customerAddressDelete.customerUserErrors.length > 0) {
        throw new Error(data.customerAddressDelete.customerUserErrors[0].message);
      }

      // Refetch customer data to update the addresses list
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      const { data } = await updateDefaultAddress({
        variables: {
          customerAccessToken: accessToken,
          addressId,
        },
      });

      if (data.customerDefaultAddressUpdate.customerUserErrors.length > 0) {
        throw new Error(data.customerDefaultAddressUpdate.customerUserErrors[0].message);
      }

      // Refetch customer data to update the addresses list
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!customer) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MapPinIcon className="h-6 w-6 text-reginify-navy" />
          <h2 className="text-lg font-medium text-reginify-navy">Shipping Addresses</h2>
        </div>
        {!showForm && !editingAddress && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 text-reginify-navy hover:text-reginify-navy/80"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Address</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {(showForm || editingAddress) ? (
        <AddressForm
          address={editingAddress}
          onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}
          onCancel={() => {
            setShowForm(false);
            setEditingAddress(null);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customer.addresses.edges.map(({ node: address }) => (
            <div
              key={address.id}
              className="p-4 border border-reginify-gold/10 rounded-lg space-y-2"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-reginify-navy">{address.address1}</p>
                  {address.address2 && (
                    <p className="text-reginify-navy">{address.address2}</p>
                  )}
                  <p className="text-reginify-navy">
                    {address.city}, {address.province} {address.zip}
                  </p>
                  <p className="text-reginify-navy">{address.country}</p>
                  {address.phone && (
                    <p className="text-reginify-navy/70 text-sm">{address.phone}</p>
                  )}
                </div>
                <button
                  onClick={() => handleSetDefaultAddress(address.id)}
                  className="text-reginify-gold hover:text-reginify-gold/80"
                  title={address.id === customer.defaultAddress?.id ? 'Default Address' : 'Set as Default'}
                >
                  {address.id === customer.defaultAddress?.id ? (
                    <StarIconSolid className="h-5 w-5" />
                  ) : (
                    <StarIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={() => setEditingAddress(address)}
                  className="text-sm text-reginify-navy hover:text-reginify-navy/80"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressManagement;
