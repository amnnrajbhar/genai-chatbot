import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }

    const token = process.env['HF_TOKEN'];

    if (!token) {
        console.error('HF_TOKEN is missing');

        return res.status(500).json({
            error: 'HF_TOKEN is not configured'
        });
    }

    try {
        const { message, model } = req.body;

        if (!message) {
            return res.status(400).json({
                error: 'Message is required'
            });
        }

        const response = await fetch(
            'https://router.huggingface.co/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model || 'Qwen/Qwen3-32B:nscale',
                    messages: [
                        {
                            role: 'user',
                            content: message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log('Hugging Face status:', response.status);

        if (!response.ok) {
            console.error('Hugging Face error:', data);

            return res.status(response.status).json({
                error: data?.error || 'Hugging Face request failed'
            });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error('Hugging Face request failed:', error);

        return res.status(500).json({
            error: 'Failed to communicate with Hugging Face'
        });
    }
}