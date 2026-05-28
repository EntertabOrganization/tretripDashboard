const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tretrip-backend.vercel.app";

export async function fetcher(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(errorBody || `API Error: ${res.status}`);
  }

  // Handle empty responses (like 204 No Content for DELETE)
  if (res.status === 204) {
    return null;
  }

  return res.json();
}

export const api = {
  get: (endpoint: string) => fetcher(endpoint),
  post: (endpoint: string, data: any) =>
    fetcher(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  put: (endpoint: string, data: any) =>
    fetcher(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (endpoint: string) =>
    fetcher(endpoint, {
      method: "DELETE",
    }),
};
