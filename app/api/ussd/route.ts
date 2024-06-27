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
        const textArray = text.split('*');
        const level = textArray.length;

        let response = '';

        if (text === '') {
            response = `CON Hi welcome. Your mental health is a priority, don't be afraid to seek help\n1. Enter 1 to continue`;
        } else if (text === '1') {
            response = `CON Why are you here today?\n1. Emergency Support\n2. Report a case`;
        } else if (text === '1*1') {
            response = `CON Please call our emergency line: 05555555555\n1. Call now\n2. Main menu`;
        } else if (text === '1*1*1') {
            response = `END Please dial 05555555555 from your phone to receive immediate help`;
        } else if (text === '1*1*2') {
            response = `CON Why are you here today?\n1. Emergency Support\n2. Report a case`;
        } else if (text.startsWith('1*2')) {
            if (level === 2) {
                response = `CON Enter name of victim:`;
            } else if (level === 3) {
                response = `CON Enter victim's phone number:`;
            } else if (level === 4) {
                response = `CON Enter victim's college:`;
            } else if (level === 5) {
                response = `CON Enter victim's department:`;
            } else if (level === 6) {
                response = `CON Enter victim's residence:`;
            } else if (level === 7) {
                response = `CON Describe the case:`;
            } else if (level === 8) {
                const name = textArray[1];
                const victimPhoneNumber = textArray[2];
                const college = textArray[3];
                const department = textArray[4];
                const residence = textArray[5];
                const description = textArray[6];

                // Here, you would typically save the data to a database, but since no database logic is included in your snippet, I'll skip it.

                
            
                response = `END Thank you for reporting. We will get back to you shortly.`;
            
        } else {
            response = `END Invalid Choice.`;
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
