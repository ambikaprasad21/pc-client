export const PAGE_SIZE = 5;

// Local environment
// export const API = "http://127.0.0.1:9000/pm/api/v1";
// export const ASSETAPI = "http://127.0.0.1:9000";

// Render API
export const API = "https://project-managment-api.onrender.com/pm/api/v1";
export const ASSETAPI = "https://project-managment-api.onrender.com";

// Vercel API
// export const API = "https://project-managment-api-gamma.vercel.app/pm/api/v1";
// export const ASSETAPI = "https://project-managment-api-gamma.vercel.app";

export const demoToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmJhNTJiMTdhNWMxNzZmMTQ2Y2VmNjUiLCJpYXQiOjE3MjM0ODY5MDJ9.dwP_Kg4YzlP07bs9Mf01nO57s8GM0OaprmDtiTUcM-Y";

export const EMAIL = "prozcollab.team@gmail.com";
export const APIHEADER = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const token = localStorage.getItem("prozverify");
