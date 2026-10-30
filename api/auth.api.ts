import { APIRequestContext, APIResponse, expect } from '@playwright/test';

const API_URL = 'https://api.practicesoftwaretesting.com';

export async function loginRequest(
    request: APIRequestContext,
    email: string,
    password: string,
): Promise<APIResponse> {
    return await request.post(`${API_URL}/users/login`, {
        data: { email, password },
    });
}

export async function loginAndGetToken(
    request: APIRequestContext,
    email: string,
    password: string,
): Promise<string> {
    const response = await loginRequest(request, email, password);
    expect(response.ok(), `Login failed with status ${response.status()}`).toBeTruthy();
    const jsonData = await response.json();
    return jsonData.access_token;
}