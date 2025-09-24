// Test script to verify DeepSeek API key
const DEEPSEEK_API_KEY = 'sk-889c2883c204409bbcc27448ec2a3622'

async function testDeepSeekAPI() {
  try {
    console.log('Testing DeepSeek API...')
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'user', content: 'Hello, can you help me learn about AI?' }
        ],
        max_tokens: 100
      }),
    })

    console.log('Response status:', response.status)
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ API is working!')
      console.log('Response:', data.choices[0].message.content)
    } else {
      const error = await response.json()
      console.log('❌ API Error:', error)
    }
  } catch (error) {
    console.log('❌ Network Error:', error.message)
  }
}

testDeepSeekAPI()
