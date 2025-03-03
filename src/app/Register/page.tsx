import Register from "../../components/Register/page";

async function getFormFields() {
  const res = await fetch(
    "https://erp-backend-kunxite.vercel.app/api/screen/users"
  );
  const data = await res.json();
  return data.data;
}

export default async function Registerpage() {
  const formFields = await getFormFields();

  return (
    <div className="flex flex-col items-center justify-center my-10 px-10">
      <Register formFields={formFields} />
    </div>
  );
}
