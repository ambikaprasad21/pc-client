import { API } from "../../utility/constant";

export async function getAllTasks(projectId) {
  const token = localStorage.getItem("prozverify");

  const res = await fetch(`${API}/task/${projectId}/get-all-task`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await res.json();
  return data.data;
}

export async function getTaskById(taskId) {
  const token = localStorage.getItem("prozverify");

  const res = await fetch(`${API}/task/${taskId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await res.json();
  return data.data;
}

export async function createTaskFn({ id: projectId, formData }) {
  const token = localStorage.getItem("prozverify");
  console.log(formData);
  const res = await fetch(`${API}/task/${projectId}/new/task`, {
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

export async function deleteTaskFn(taskId) {
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/task/${taskId}`, {
    method: "DELETE",
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
  return data;
}

export async function addAssetToTaskFn({ id: taskId, formData }) {
  const token = localStorage.getItem("prozverify");
  // console.log(formData, taskId);
  const res = await fetch(`${API}/task/${taskId}/add-asset`, {
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

export async function removeAssetTaskFn({ id: taskId, fileName }) {
  const token = localStorage.getItem("prozverify");
  // console.log(formData, taskId);
  const res = await fetch(
    `${API}/task/delete-task-asset/${taskId}/${fileName}`,
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

export async function editTaskFn({ taskId, newData }) {
  const token = localStorage.getItem("prozverify");
  // console.log(formData, projectId);
  const res = await fetch(`${API}/task/update-task/${taskId}`, {
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

export async function markTaskCompletedFn(taskId) {
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/task/toggle-marked/${taskId}`, {
    method: "PATCH",
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
