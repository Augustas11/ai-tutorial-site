import { NextRequest, NextResponse } from 'next/server'
import { UserStorage } from '@/lib/auth'

// In-memory storage for development
const userStorage = UserStorage.getInstance()

export async function POST(request: NextRequest) {
  try {
    const { email, language = 'en', userId } = await request.json()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    // Record subscription activity if userId is provided
    if (userId) {
      try {
        // Record this as an activity for points and streak tracking
        userStorage.recordActivity(userId, 'subscription', 30)
        console.log('Subscription activity recorded for user:', userId)
      } catch (activityError) {
        console.error('Failed to record subscription activity:', activityError)
        // Don't fail the subscription if activity recording fails
      }
    }
    
    // Here you would typically:
    // 1. Save to your database
    // 2. Add to your email marketing service (Mailchimp, ConvertKit, etc.)
    // 3. Send confirmation email
    
    // For now, we'll just log the email and return success
    console.log('New subscription:', { email, language, userId, timestamp: new Date().toISOString() })
    
    // In a real implementation, you might:
    // - Save to database: await db.subscribers.create({ email, language })
    // - Add to Mailchimp: await mailchimp.lists.addMember(listId, { email_address: email })
    // - Send to ConvertKit: await convertkit.addSubscriber(email, { language })
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        email,
        pointsEarned: userId ? 30 : 0
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
