# Production Deployment Guide

## Environment Variables Setup

For production deployment, API keys should be injected via environment variables:

### Method 1: Server-side injection (Recommended)
1. Set environment variables on your server:
   ```bash
   export GOOGLE_AI_API_KEY="your-actual-google-api-key"
   export GROQ_API_KEY="your-actual-groq-api-key"
   ```

2. Use a server-side script to replace placeholders in `assets/env.js`:
   ```bash
   # Replace placeholders with actual environment variables
   sed -i "s/\${GOOGLE_AI_API_KEY}/$GOOGLE_AI_API_KEY/g" dist/assets/env.js
   sed -i "s/\${GROQ_API_KEY}/$GROQ_API_KEY/g" dist/assets/env.js
   ```

### Method 2: Build-time injection
1. Set environment variables before building:
   ```bash
   export GOOGLE_AI_API_KEY="your-actual-google-api-key"
   export GROQ_API_KEY="your-actual-groq-api-key"
   ng build --prod
   ```

### Method 3: Container deployment (Docker)
```dockerfile
ENV GOOGLE_AI_API_KEY=your-actual-google-api-key
ENV GROQ_API_KEY=your-actual-groq-api-key

# Replace placeholders at runtime
RUN sed -i "s/\${GOOGLE_AI_API_KEY}/$GOOGLE_AI_API_KEY/g" /app/assets/env.js && \
    sed -i "s/\${GROQ_API_KEY}/$GROQ_API_KEY/g" /app/assets/env.js
```

## Vercel/Netlify Deployment
Set environment variables in your deployment platform:
- `GOOGLE_AI_API_KEY`: Your Google AI API key
- `GROQ_API_KEY`: Your Groq API key

The build process will automatically inject these into the application.