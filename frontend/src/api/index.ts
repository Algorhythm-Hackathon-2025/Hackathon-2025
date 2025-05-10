export async function apiFetch<T>(url: string, init?: RequestInit) {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return (await response.json()) as T;
}
export function apiGET<T>(url: string, init?: RequestInit) {
  return apiFetch<T>(url, { method: "GET", ...(init || {}) });
}
export function apiPOST<T>(url: string, body: any, additional?: RequestInit) {
  return apiFetch<T>(url, {
    method: "POST",
    body: body && JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    ...(additional || {}),
  });
}
export function apiPUT<T>(url: string, body: any, additional?: RequestInit) {
  return apiFetch<T>(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    ...(additional || {}),
  });
}
export function apiDELETE<T>(url: string, additional?: RequestInit) {
  return apiFetch<T>(url, {
    method: "DELETE",
    ...(additional || {}),
  });
}
