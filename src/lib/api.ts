function trimTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

const API_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_API_URL?.trim() || "https://tretrip-backend.vercel.app"
);

export async function fetcher(endpoint: string, options: RequestInit = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(errorBody || `API Error: ${res.status}`);
  }

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
