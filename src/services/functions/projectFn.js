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
  console.log(formData);
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

export async function removeAssetProjectFn({ id: projectId, fileName }) {
  const token = localStorage.getItem("prozverify");
  console.log(projectId, fileName);
  const res = await fetch(
    `${API}/project/delete-project-asset/${projectId}/${fileName}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status !== 200) {
    const data = await res.json();
    throw new Error(data.message);
  }

  const data = await res.json();
  return data.message;
}

export async function getTrashedProjectsFn() {
  const token = localStorage.getItem("prozverify");

  const res = await fetch(`${API}/project/get-trashed-projects`, {
    method: "GET",
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

export async function moveProjectToTrashFn(projectId) {
  const token = localStorage.getItem("prozverify");
  // console.log(formData, projectId);
  const res = await fetch(`${API}/project/totrash/${projectId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    const data = await res.json();
    throw new Error(data.message);
  }

  const data = await res.json();
  return data.message;
}

export async function moveProjectOutFromTrashFn(projectId) {
  const token = localStorage.getItem("prozverify");
  // console.log(formData, projectId);
  const res = await fetch(`${API}/project/outtrash/${projectId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    const data = await res.json();
    throw new Error(data.message);
  }

  const data = await res.json();
  return data.message;
}

export async function deleteProjectFn(projectId) {
  const token = localStorage.getItem("prozverify");
  // console.log(formData, projectId);
  const res = await fetch(`${API}/project/delete/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    const data = await res.json();
    throw new Error(data.message);
  }

  const data = await res.json();
  return data.message;
}

export async function editProjectFn({ projectId, newData }) {
  const token = localStorage.getItem("prozverify");
  // console.log(formData, projectId);
  const res = await fetch(`${API}/project/update/${projectId}`, {
    method: "PATCH",
    body: JSON.stringify(newData),
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
