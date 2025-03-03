import Login from "@/components/Login";
import React from "react";

async function getloginField() {
  const Response = await fetch(
    "https://erp-backend-kunxite.vercel.app/api/screen/user_login",
    { method: "get" }
  );
  const data = await Response.json();
  return data.data;
}

const page = async() => {
  const Loginfield = await getloginField()
  return (
    <div>
      <Login Loginfield={Loginfield} />
    </div>
  );
};

export default page;
