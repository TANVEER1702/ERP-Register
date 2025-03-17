import Register from "../../components/Register/page";

async function getFormFields() {
  const res = await fetch(
    "https://erp-backend-kunxite.vercel.app/api/structure-table/screen/signup"
  );
  const data = await res.json();
  return data.data;
}

export default async function Registerpage() {
  const formFields = await getFormFields();

  return (
    <div className="">
      <Register formFields={formFields} />
    </div>
  );
}
