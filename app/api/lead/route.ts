import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, organizationName } = await request.json();

    // Validate required fields
    if (!name || !email || !organizationName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Processing lead for:', { name, email, organizationName });

    // For now, we'll simulate successful lead capture without external APIs
    // This allows the application to work without API keys during development
    
    // Simulate API calls (commented out for now)
    /*
    // Add to HubSpot
    if (process.env.HUBSPOT_API_KEY) {
      const hubspotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            firstname: name,
            email: email,
            company: organizationName,
            tags: ['early-access', 'ai-writer-user'],
          },
        }),
      });

      if (!hubspotResponse.ok) {
        console.error('HubSpot API error:', await hubspotResponse.text());
      } else {
        console.log('Contact added to HubSpot successfully');
      }
    }

    // Add to Brevo
    if (process.env.BREVO_API_KEY) {
      const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          attributes: {
            FIRSTNAME: name,
            COMPANY: organizationName,
            GRANT_TYPE: 'nonprofit',
            INTEREST: 'tech grants',
            SOURCE: 'GrantForge Lead Capture',
            SIGNUP_DATE: new Date().toISOString(),
          },
          listIds: [10],
          updateEnabled: true,
          tags: ['early-access', 'ai-writer-user'],
        }),
      });

      if (!brevoResponse.ok) {
        console.error('Brevo API error:', await brevoResponse.text());
      } else {
        console.log('Contact added to Brevo successfully');
      }
    }
    */

    // Log the lead for now (in production, this would go to a database)
    console.log('✅ Lead captured successfully:', {
      name,
      email,
      organizationName,
      timestamp: new Date().toISOString(),
      source: 'GrantForge Lead Capture'
    });

    return NextResponse.json({ 
      success: true,
      message: 'Thank you! We\'ll reach out soon to unlock your access.'
    });
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    );
  }
} 