import { gql } from '@apollo/client';

export const CUSTOMER_ACCESS_TOKEN_CREATE = gql`
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

export const CUSTOMER_CREATE = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const GET_CUSTOMER = gql`
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      orders(first: 10) {
        edges {
          node {
            id
            name
            orderNumber
            processedAt
            statusUrl
            fulfillmentStatus
            financialStatus
            totalPriceV2 {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    id
                    title
                    priceV2 {
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
            shippingAddress {
              address1
              address2
              city
              province
              zip
              country
            }
          }
        }
      }
      addresses(first: 5) {
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
    }
  }
`;

export const CUSTOMER_ADDRESS_CREATE = gql`
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerAddress {
        id
        address1
        address2
        city
        province
        zip
        country
        phone
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ADDRESS_UPDATE = gql`
  mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      customerAddress {
        id
        address1
        address2
        city
        province
        zip
        country
        phone
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ADDRESS_DELETE = gql`
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      deletedCustomerAddressId
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_DEFAULT_ADDRESS_UPDATE = gql`
  mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
      customer {
        id
        defaultAddress {
          id
        }
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_UPDATE = gql`
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer {
        id
        firstName
        lastName
        email
        phone
        acceptsMarketing
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const GET_ORDER_DETAILS = gql`
  query getOrderDetails($id: ID!) {
    node(id: $id) {
      ... on Order {
        id
        name
        orderNumber
        processedAt
        statusUrl
        fulfillmentStatus
        financialStatus
        totalPriceV2 {
          amount
          currencyCode
        }
        subtotalPrice {
          amount
          currencyCode
        }
        totalShippingPrice {
          amount
          currencyCode
        }
        lineItems(first: 50) {
          edges {
            node {
              title
              quantity
              originalTotalPrice {
                amount
                currencyCode
              }
              variant {
                image {
                  url
                  altText
                }
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
        shippingAddress {
          address1
          address2
          city
          province
          zip
          country
        }
      }
    }
  }
`;

export const REQUEST_RETURN = gql`
  mutation orderReturnRequest($orderId: ID!, $reason: String!) {
    orderReturnRequest(input: {
      orderId: $orderId,
      reason: $reason
    }) {
      returnRequest {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CANCEL_ORDER = gql`
  mutation orderCancel($orderId: ID!) {
    orderCancel(input: { id: $orderId }) {
      order {
        id
        cancelReason
        canceledAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;
