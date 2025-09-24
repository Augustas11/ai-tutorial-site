import { NextRequest, NextResponse } from 'next/server'
import { UserStorage } from '@/lib/auth'

// In-memory storage for development (replace with database in production)
const userStorage = UserStorage.getInstance()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    // Get user data to check subscription status
    const user = userStorage.getUser(userId)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user has subscribed (this is a simple check for now)
    // In production, you'd query your newsletter database
    const isSubscribed = user.email && user.email.includes('@') // Simple check for now
    
    return NextResponse.json({
      success: true,
      data: {
        isSubscribed,
        subscriptionCount: isSubscribed ? 1 : 0,
        email: user.email,
        subscribedAt: user.createdAt // Using user creation as subscription time for now
      }
    })

  } catch (error) {
    console.error('Subscriptions API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, email } = await request.json()
    
    if (!userId || !email) {
      return NextResponse.json(
        { error: 'userId and email are required' },
        { status: 400 }
      )
    }

    // Update user subscription status
    const user = userStorage.getUser(userId)
    if (user) {
      // In production, you'd update your newsletter database here
      // For now, we'll just log the subscription
      console.log(`User ${userId} subscribed with email: ${email}`)
      
      // Record this as an activity for points
      userStorage.recordActivity(userId, 'subscription', 30)
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription recorded successfully'
    })

  } catch (error) {
    console.error('Subscriptions API error:', error)
    return NextResponse.json(
      { error: 'Failed to record subscription' },
      { status: 500 }
    )
  }
}
