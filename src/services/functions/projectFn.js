import { API } from "../../utility/constant";

export async function getAllProjects() {
  const token = localStorage.getItem("prozverify");

  const res = await fetch(`${API}/project/get-all-project`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await res.json();
  return data.data;
}

export async function getAllAssignedProjects() {
  const token = localStorage.getItem("prozverify");

  const res = await fetch(`${API}/project/get-all-assigned-project`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await res.json();
  return data.data;
}

export async function getProjectById(id) {
  const token = localStorage.getItem("prozverify");

  const res = await fetch(`${API}/project/get/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await res.json();
  return data.data;
}

export async function createProjectFn(formData) {
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/project/create/new`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    const data = await res.json();
    throw new Error(data.message);
  }

  const data = await res.json();
  return data.data;
}

export async function addAssetToProjectFn({ id: projectId, formData }) {
  const token = localStorage.getItem("prozverify");
  console.log(formData, projectId);
  const res = await fetch(`${API}/project/${projectId}/add-asset`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    const data = await res.json();
    throw new Error(data.message);
  }

  const data = await res.json();
  return data.data;
}
