// pages/api/ussd.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return new NextResponse(JSON.stringify({ message: 'Method Not Allowed' }), {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const body = await req.json();
        const { sessionId, serviceCode, phoneNumber, text } = body;

        let response = '';

        if (text === '') {
            response = `CON What would you like to check
1. My account
2. My phone number`;
        } else if (text === '1') {
            response = `CON Choose account information you want to view
1. Account number`;
        } else if (text === '2') {
            response = `END Your phone number is ${phoneNumber}`;
        } else if (text === '1*1') {
            const accountNumber = 'ACC100101';
            response = `END Your account number is ${accountNumber}`;
        }

        return new NextResponse(response, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Invalid JSON' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
