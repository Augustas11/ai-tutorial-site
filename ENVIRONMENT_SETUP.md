# Environment Setup for AI Chat

## Required Environment Variables

Create a `.env.local` file in the root directory with the following:

```bash
# DeepSeek API Configuration
# Get your API key from: https://platform.deepseek.com/
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

## How to Get DeepSeek API Key

1. Visit [DeepSeek Platform](https://platform.deepseek.com/)
2. Sign up for an account
3. Go to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

## Cost Information

- **Input**: ~$0.14 per 1M tokens
- **Output**: ~$0.28 per 1M tokens
- **Free tier**: Available for testing

## Deployment

For Vercel deployment, add the environment variable in:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add `DEEPSEEK_API_KEY` with your API key

## Testing

The chat will work locally once you add the API key. For production, make sure to add the environment variable to your hosting platform.
