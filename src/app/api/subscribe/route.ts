import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, language = 'en' } = await request.json()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    // Here you would typically:
    // 1. Save to your database
    // 2. Add to your email marketing service (Mailchimp, ConvertKit, etc.)
    // 3. Send confirmation email
    
    // For now, we'll just log the email and return success
    console.log('New subscription:', { email, language, timestamp: new Date().toISOString() })
    
    // In a real implementation, you might:
    // - Save to database: await db.subscribers.create({ email, language })
    // - Add to Mailchimp: await mailchimp.lists.addMember(listId, { email_address: email })
    // - Send to ConvertKit: await convertkit.addSubscriber(email, { language })
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        email 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
