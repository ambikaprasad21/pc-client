import { API } from "../../utility/constant";

export async function getMemberFn() {
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/member/get-all-members`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data.data;
}

export async function addMemberFn(formdata) {
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/member/add-member`, {
    method: "POST",
    body: JSON.stringify(formdata),
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

export async function editMemberFn(formdata) {
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/member/update-member/${formdata._id}`, {
    method: "PATCH",
    body: JSON.stringify(formdata),
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

export async function deleteMemberFn(formdata) {
  console.log(formdata);
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/member/delete-member/${formdata._id}`, {
    method: "DELETE",
    body: JSON.stringify(formdata),
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
