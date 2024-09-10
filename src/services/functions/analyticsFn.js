import { API } from "../../utility/constant";

export async function getAnalyticsData(projectId) {
  const token = localStorage.getItem("prozverify");
  const res = await fetch(`${API}/project/get-project-analytics/${projectId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await res.json();
  return data.data;
}
