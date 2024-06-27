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
        const contentType = req.headers.get('content-type');
        if (contentType !== 'application/x-www-form-urlencoded') {
            return new NextResponse(JSON.stringify({ message: 'Unsupported Media Type' }), {
                status: 415,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Parse the URL-encoded request body
        const formData = await req.formData();
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        const { sessionId, serviceCode, phoneNumber, text } = data;

        let response = '';

        if (text === '') {
            response = `CON What would you like to check\n1. My account\n2. My phone number`;
        } else if (text === '1') {
            response = `CON Choose account information you want to view\n1. Account number`;
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
        console.error('Error parsing form data:', error);
        return new NextResponse(JSON.stringify({ message: 'Invalid form data' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
