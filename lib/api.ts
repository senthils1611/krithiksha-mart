import axios from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001/api";

function authHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ---------- Products ----------

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function createProduct(data: Record<string, unknown>) {
  const res = await axios.post(`${API_URL}/products`, data, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function updateProduct(id: string, data: Record<string, unknown>) {
  const res = await axios.put(`${API_URL}/products/${id}`, data, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function deleteProduct(id: string) {
  const res = await axios.delete(`${API_URL}/products/${id}`, {
    headers: authHeaders(),
  });
  return res.data;
}

// ---------- Auth ----------

export async function login(email: string, password: string) {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
}

export async function register(data: {
  name: string;
  phone: string;
  email: string;
  password: string;
}) {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  return res.data;
}

// ---------- Users ----------

export async function getMe() {
  const res = await axios.get(`${API_URL}/users/me`, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function updateMe(data: Record<string, unknown>) {
  const res = await axios.put(`${API_URL}/users/me`, data, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function getAllUsers() {
  const res = await axios.get(`${API_URL}/users`, {
    headers: authHeaders(),
  });
  return res.data;
}

// ---------- Wishlist ----------

export async function getWishlist() {
  const res = await axios.get(`${API_URL}/users/wishlist`, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function addToWishlistApi(productId: string) {
  const res = await axios.post(
    `${API_URL}/users/wishlist/${productId}`,
    {},
    { headers: authHeaders() }
  );
  return res.data;
}

export async function removeFromWishlistApi(productId: string) {
  const res = await axios.delete(`${API_URL}/users/wishlist/${productId}`, {
    headers: authHeaders(),
  });
  return res.data;
}

// ---------- Addresses ----------

export async function getAddresses() {
  const res = await axios.get(`${API_URL}/users/addresses`, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function addAddress(data: Record<string, unknown>) {
  const res = await axios.post(`${API_URL}/users/addresses`, data, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function updateAddress(id: string, data: Record<string, unknown>) {
  const res = await axios.put(`${API_URL}/users/addresses/${id}`, data, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function deleteAddress(id: string) {
  const res = await axios.delete(`${API_URL}/users/addresses/${id}`, {
    headers: authHeaders(),
  });
  return res.data;
}

// ---------- Orders ----------

export async function createOrder(data: Record<string, unknown>) {
  const res = await axios.post(`${API_URL}/orders`, data, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function getMyOrders() {
  const res = await axios.get(`${API_URL}/orders/my`, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function getAllOrders() {
  const res = await axios.get(`${API_URL}/orders`, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function updateOrderStatus(id: string, orderStatus: string) {
  const res = await axios.put(
    `${API_URL}/orders/${id}`,
    { orderStatus },
    { headers: authHeaders() }
  );
  return res.data;
}

export async function deleteOrder(id: string) {
  const res = await axios.delete(`${API_URL}/orders/${id}`, {
    headers: authHeaders(),
  });
  return res.data;
}
