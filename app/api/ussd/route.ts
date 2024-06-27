// pages/api/ussd.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        const { sessionId, serviceCode, phoneNumber, text } = await req.json();

        let response = '';

        if (text === '') {
            // This is the first request. Note how we start the response with CON
            response = `CON What would you like to check
1. My account
2. My phone number`;
        } else if (text === '1') {
            // Business logic for first level response
            response = `CON Choose account information you want to view
1. Account number`;
        } else if (text === '2') {
            // Business logic for first level response
            // This is a terminal request. Note how we start the response with END
            response = `END Your phone number is ${phoneNumber}`;
        } else if (text === '1*1') {
            // This is a second level response where the user selected 1 in the first instance
            const accountNumber = 'ACC100101';
            // This is a terminal request. Note how we start the response with END
            response = `END Your account number is ${accountNumber}`;
        }

        // Send the response back to the API
        return new NextResponse(response, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    } else {
        return new NextResponse(JSON.stringify({ message: 'Method Not Allowed' }), {
            status: 405,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
