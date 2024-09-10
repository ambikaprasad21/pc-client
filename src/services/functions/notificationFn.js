import { API } from "../../utility/constant";

export async function getNotifications() {
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/notification`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await res.json();
  return data.data;
}

export async function markNotificationSeen(id) {
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/notification/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  if (res.status != 200) {
    throw new Error("Some error occured");
  }

  const data = await res.json();
  return data.data;
}

export async function deleteNotification(id) {
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/notification/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  if (res.status != 200) {
    throw new Error("Some error occured");
  }

  const data = await res.json();
  return data.data;
}
