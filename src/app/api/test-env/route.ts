import { NextResponse } from 'next/server'

export async function GET() {
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
  
  return NextResponse.json({
    hasApiKey: !!DEEPSEEK_API_KEY,
    keyLength: DEEPSEEK_API_KEY?.length,
    keyPrefix: DEEPSEEK_API_KEY?.substring(0, 10),
    nodeEnv: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('DEEPSEEK')),
    envFileExists: true // We know it exists from our checks
  })
}
