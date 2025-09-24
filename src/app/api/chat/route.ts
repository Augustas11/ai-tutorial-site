import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, language = 'en', conversationHistory = [] } = await request.json()
    
    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // DeepSeek API configuration
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
    console.log('Environment check:', {
      hasApiKey: !!DEEPSEEK_API_KEY,
      keyLength: DEEPSEEK_API_KEY?.length,
      nodeEnv: process.env.NODE_ENV,
      allEnvKeys: Object.keys(process.env).filter(key => key.includes('DEEPSEEK'))
    })
    
    if (!DEEPSEEK_API_KEY) {
      console.error('DEEPSEEK_API_KEY is not set')
      return NextResponse.json(
        { error: 'AI service is not configured. Please check your API key.' },
        { status: 500 }
      )
    }

    console.log('API Key found:', DEEPSEEK_API_KEY.substring(0, 10) + '...')

    // Create system prompt based on language
    const systemPrompt = language === 'vn' 
      ? `Bạn là một trợ lý AI thông minh cho Trường Sáng Tạo AI. Bạn giúp người dùng học về trí tuệ nhân tạo, lập trình, và công nghệ. Hãy trả lời một cách hữu ích, chính xác và thân thiện bằng tiếng Việt.`
      : `You are an intelligent AI assistant for AI Creator School. You help users learn about artificial intelligence, programming, and technology. Provide helpful, accurate, and friendly responses in English.`

    // Prepare messages for DeepSeek
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ]

    // Call DeepSeek API
    console.log('Sending request to DeepSeek API...')
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      }),
    })

    console.log('DeepSeek API response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('DeepSeek API error:', errorData)
      return NextResponse.json(
        { 
          error: `AI service error: ${response.status} - ${errorData.error?.message || 'Unknown error'}` 
        },
        { status: 500 }
      )
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'

    return NextResponse.json({
      success: true,
      response: aiResponse,
      usage: data.usage
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
