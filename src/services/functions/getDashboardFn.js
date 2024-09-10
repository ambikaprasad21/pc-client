import { API } from "./../../utility/constant";

export async function getDashboardFn() {
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/user/get-dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await res.json();
  return data.data;
}
