// "use client";
// import Select from "react-select";
// import { useEffect, useState } from "react";

// type CountryOption = {
//   value: string;
//   label: string;
// };
// interface departmentOptions {
//   label: string;
// }

// const departments = [
//   "Administraion",
//   "Administrative Board",
//   "Audit",
//   "Business Intellig",
//   "Business Planning",
//   "Consulting",
//   "Controlling",
//   "Corporate Services",
//   "Customer Service",
//   "E-Commerce",
//   "Editorial",
//   "Engineering/Degin",
//   "Environmental",
//   "Finance/Accounting",
//   "Health & Safety",
//   "Helathcare",
//   "Human Resources",
//   "Inform. Technology",
//   "Legal",
//   "Logistics",
//   "Management",
//   "Marketing",
//   "Material Managment",
//   "Operations/Manufact",
//   "Penson Fund Admin",
//   "Plant maintenance",
//   "Private Clients",
//   "Product Management",
//   "Production Planning",
//   "Purchasing",
//   "Quality Assurance",
//   "Real Estate Mgmt",
//   "Research / Deolop",
//   "Risk Management",
//   "Sales",
//   "Sap System Support",
//   "Service",
//   "Sustainability",
//   "Technical Area",
//   "Training",
//   "Treasury",
// ];
// const Selectcountry = () => {
//   const [selectedCountry, setSelectedCountry] = useState<CountryOption>(
//     {} as CountryOption
//   );
//   const [Selectdepartment, setSelectdepartment] = useState<departmentOptions>();
//   const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);

//   useEffect(() => {
//     import("countries-list").then((module) => {
//       const countries = module.countries;
//       const options = Object.entries(countries).map(([code, country]: any) => ({
//         value: code,
//         label: country.name,
//       }));
//       setCountryOptions(options);
//     });
//   }, []);

//   const departmentOptions = departments.map((dept) => ({
//     label: dept,
//   }));

//   return (
//     <div className="flex gap-5 items-center justify-center">
//       <Select
//         options={countryOptions}
//         value={selectedCountry}
//         onChange={(val) => {
//           console.log(val);
//         }}
//         placeholder="Select Country"
//         className="w-80 mt-2"
//         required
//       />
//       <Select
//         options={departmentOptions}
//         value={Selectdepartment}
//         // onChange={(e) => setSelectdepartment(e)}
//         placeholder="Select Country"
//         className="w-80 mt-2"
//       />
//     </div>
//   );
// };

// export default Selectcountry;
