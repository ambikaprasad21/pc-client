import axios from "axios";
import { API } from "./../../utility/constant";

const base_url = axios.create({ baseURL: API });

//profile
export const editBioApi = async (bio, token) =>
  await base_url.patch(
    `/user/edit-bio`,
    { bio },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const editSkillApi = async (skill, token) =>
  await base_url.patch(
    `/user/edit-skills`,
    { skill },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const visibilityApi = async (token) => {
  await base_url.patch(
    `/user/visibility`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const changePasswordApi = async (data, token) => {
  return await base_url.patch(`/user/updatePassword`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const uploadPPApi = async (data, token) => {
  console.log(data, token);
  return await base_url.post(`/user/upload/profile-picture`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
