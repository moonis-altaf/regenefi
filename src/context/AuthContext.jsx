import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';

const GET_CUSTOMER = gql`
  query GetCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      defaultAddress {
        id
        address1
        address2
        city
        province
        zip
        country
        phone
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            province
            zip
            country
            phone
          }
        }
      }
      orders(first: 10) {
        edges {
          node {
            id
            orderNumber
            processedAt
            fulfillmentStatus
            totalPriceV2 {
              amount
              currencyCode
            }
            statusUrl
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('customerAccessToken'));
  const navigate = useNavigate();

  const { data: customerData, refetch } = useQuery(GET_CUSTOMER, {
    variables: { customerAccessToken: accessToken },
    skip: !accessToken,
    onCompleted: (data) => {
      if (data?.customer) {
        setCustomer(data.customer);
      }
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching customer:', error);
      setError(error.message);
      setLoading(false);
      if (error.message.includes('invalid token')) {
        localStorage.removeItem('customerAccessToken');
        setAccessToken(null);
      }
    }
  });

  const [createAccessToken] = useMutation(CUSTOMER_ACCESS_TOKEN_CREATE);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await createAccessToken({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate;

      if (customerUserErrors.length > 0) {
        throw new Error(customerUserErrors[0].message);
      }

      if (customerAccessToken) {
        localStorage.setItem('customerAccessToken', customerAccessToken.accessToken);
        setAccessToken(customerAccessToken.accessToken);
        await refetch();
        return true;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('customerAccessToken');
    setAccessToken(null);
    setCustomer(null);
    navigate('/');
  };

  const value = {
    customer,
    loading,
    error,
    isAuthenticated: !!accessToken && !!customer,
    login,
    logout,
    refreshCustomer: refetch,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
