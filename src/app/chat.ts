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
        return res.status(500).json({
            error: 'HF_TOKEN is not configured'
        });
    }

    try {
        const { messages } = req.body;

        const response = await fetch(
            'https://router.huggingface.co/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'HuggingFaceH4/zephyr-7b-beta',
                    messages,
                    max_tokens: 500,
                    temperature: 0.7
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: 'Failed to communicate with Hugging Face'
        });
    }
}