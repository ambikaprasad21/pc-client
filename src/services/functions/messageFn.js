import { API } from "../../utility/constant";

export async function messageUserFn({ message, receiverId }) {
  const token = localStorage.getItem("prozverify");

  const res = await fetch(`${API}/message/${receiverId}`, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data.data;
}

export async function getAllMessageFn() {
  const token = localStorage.getItem("prozverify");

  const res = await fetch(`${API}/message`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data.data;
}

export async function markMessageReadFn({ messageId }) {
  const token = localStorage.getItem("prozverify");

  const res = await fetch(`${API}/message/${messageId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

export async function deleteMessageFn(messageId) {
  const token = localStorage.getItem("prozverify");

  const res = await fetch(`${API}/message/${messageId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

export async function deleteAllMessageFn() {
  const token = localStorage.getItem("prozverify");

  const res = await fetch(`${API}/message/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}
