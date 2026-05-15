const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function pulseFetch(endpoint: string, options: RequestInit = {}) {
  // Defensive URL construction to prevent double-slashes
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;
  
  console.log(`[Pulse API] Initiating fetch: ${url}`);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...options.headers,
      },
    });

    console.log(`[Pulse API] Response received: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`[Pulse API] Server returned error:`, errorData);
      throw new Error(errorData.details || errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[Pulse API] JSON parsed successfully.`);
    return data;
  } catch (error: any) {
    console.error(`[Pulse API] Request to ${endpoint} failed!`);
    console.error(`[Pulse API] Error Name: ${error.name}`);
    console.error(`[Pulse API] Error Message: ${error.message}`);
    
    // Check if it's a type error (usually CORS or Network)
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      console.error(`[Pulse API] HINT: This is likely a CORS issue or the server is down/unreachable.`);
    }
    
    throw error;
  }
}
