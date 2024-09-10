import { API } from "../../utility/constant";

export async function getComments(taskId) {
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/comment/${taskId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await res.json();
  return data.data;
}

export async function createComment({ taskId, typeComment, email }) {
  const token = localStorage.getItem("prozverify");
  console.log(typeComment, email);
  const res = await fetch(`${API}/comment/${taskId}`, {
    method: "POST",
    body: JSON.stringify({ text: typeComment, email }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200) {
    const data = await res.json();
    throw new Error(data.message);
  }

  const data = await res.json();
  return data.data;
}
