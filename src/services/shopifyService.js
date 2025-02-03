const SHOPIFY_ACCESS_TOKEN = process.env.VITE_SHOPIFY_ACCESS_TOKEN;
const SHOPIFY_STORE_URL = process.env.VITE_SHOPIFY_STORE_URL;

const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
};

export const createWholesaleInquiry = async (formData) => {
  try {
    // Create a draft order
    const draftOrderResponse = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2024-01/draft_orders.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        draft_order: {
          note: 'Wholesale Inquiry',
          tags: ['wholesale-inquiry'],
          customer: {
            first_name: formData.contactName.split(' ')[0],
            last_name: formData.contactName.split(' ').slice(1).join(' '),
            email: formData.email,
            phone: formData.phone,
            tags: ['wholesale'],
            metafields: [
              {
                key: 'business_name',
                value: formData.businessName,
                type: 'single_line_text_field',
                namespace: 'wholesale'
              },
              {
                key: 'business_type',
                value: formData.businessType,
                type: 'single_line_text_field',
                namespace: 'wholesale'
              },
              {
                key: 'monthly_volume',
                value: formData.monthlyVolume,
                type: 'single_line_text_field',
                namespace: 'wholesale'
              }
            ]
          },
          note_attributes: [
            {
              name: 'Business Name',
              value: formData.businessName
            },
            {
              name: 'Business Type',
              value: formData.businessType
            },
            {
              name: 'Monthly Volume',
              value: formData.monthlyVolume
            },
            {
              name: 'Message',
              value: formData.message
            }
          ]
        }
      })
    });

    if (!draftOrderResponse.ok) {
      throw new Error('Failed to create draft order');
    }

    const draftOrderData = await draftOrderResponse.json();

    // Create a metaobject for the wholesale application
    const metaobjectResponse = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2024-01/metaobjects.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        metaobject: {
          type: 'wholesale_application',
          fields: [
            {
              key: 'business_name',
              value: formData.businessName
            },
            {
              key: 'contact_name',
              value: formData.contactName
            },
            {
              key: 'email',
              value: formData.email
            },
            {
              key: 'phone',
              value: formData.phone
            },
            {
              key: 'business_type',
              value: formData.businessType
            },
            {
              key: 'monthly_volume',
              value: formData.monthlyVolume
            },
            {
              key: 'message',
              value: formData.message
            },
            {
              key: 'status',
              value: 'pending'
            },
            {
              key: 'draft_order_id',
              value: draftOrderData.draft_order.id.toString()
            }
          ]
        }
      })
    });

    if (!metaobjectResponse.ok) {
      throw new Error('Failed to create metaobject');
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating wholesale inquiry:', error);
    throw error;
  }
};
