"use client";
import Select, { SingleValue } from "react-select";
import { useEffect, useState } from "react";
import { countries } from "countries-list"; 

type CountryOption = {
  value: string;
  label: string;
};

type DepartmentOption = {
  label: string;
};

const departments = [
  "Administraion",
  "Administrative Board",
  "Audit",
  "Business Intellig",
  "Business Planning",
  "Consulting",
  "Controlling",
  "Corporate Services",
  "Customer Service",
  "E-Commerce",
  "Editorial",
  "Engineering/Design",
  "Environmental",
  "Finance/Accounting",
  "Health & Safety",
  "Healthcare",
  "Human Resources",
  "Inform. Technology",
  "Legal",
  "Logistics",
  "Management",
  "Marketing",
  "Material Management",
  "Operations/Manufacturing",
  "Pension Fund Admin",
  "Plant Maintenance",
  "Private Clients",
  "Product Management",
  "Production Planning",
  "Purchasing",
  "Quality Assurance",
  "Real Estate Mgmt",
  "Research/Development",
  "Risk Management",
  "Sales",
  "SAP System Support",
  "Service",
  "Sustainability",
  "Technical Area",
  "Training",
  "Treasury",
];

const SelectCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentOption | null>(null);
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);

  useEffect(() => {
      const options: CountryOption[] = Object.entries(countries).map(([code, country]: any) => ({
        value: code,
        label: country.name,
      }));

      setCountryOptions(options);
   
  }, []);

  const departmentOptions: DepartmentOption[] = departments.map((dept) => ({
    label: dept,
  }));

  return (
    <div className="flex gap-5 items-center justify-center">
  
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={(e: SingleValue<CountryOption>) => setSelectedCountry(e)}
        placeholder="Select Country"
        className="w-80 mt-2"
        isClearable
      />

      
      <Select
        options={departmentOptions}
        value={selectedDepartment}
        onChange={(e: SingleValue<DepartmentOption>) => setSelectedDepartment(e)}
        placeholder="Select Department"
        className="w-80 mt-2"
        isClearable
      />
    </div>
  );
};

export default SelectCountry;
