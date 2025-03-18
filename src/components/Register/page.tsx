"use client";

import type React from "react";
import { useState } from "react";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/buttons";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import ProgressBar from "../CircleProgressBar";
import PhoneInput, { CountryData } from "react-phone-input-2";
import Link from "next/link";
import { AjaxSearchDropdown } from "../ajaxSearchDropDown";

interface FormField {
  column_name: string;
  column_label: string;
  interface_type?:
    | "text"
    | "password"
    | "number"
    | "email"
    | "tel"
    | "checkbox"
    | "radio"
    | "select";
  ordering_number?: number;
  active?: boolean;
}

export default function Form({ formFields }: { formFields: FormField[] }) {
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    formFields.reduce((acc, field) => {
      acc[field.column_name] = "";
      return acc;
    }, {} as Record<string, string>)
  );

  const [showPassword, setshowPassword] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [step, setStep] = useState(1);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
  const [message, setMessage] = useState("");
  const router = useRouter();

  const fetchCountries = async (query: string) => {
    const res = await fetch(`/api/countries?query=${query}`);
    return res.json();
  };



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setFormErrors((prev) => ({
      ...prev,
      [name]: [],
    }));
  };
  const togglePassword = (index: number) => {
    setshowPassword((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const handleSelect = (selectedItem: {
    id: string | number;
    name: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      country_name: selectedItem.name, // Storing selected country name in formData
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "https://erp-backend-kunxite.vercel.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            users_phone: String(formData?.users_phone),
            country_name: formData?.country_name || "",
          }),
        }
      );
      const resultData = await res.json();
      console.log("Response from Backend:", resultData);
      if (res.ok) {
        localStorage.setItem("token", resultData.token);
        setMessage("Registration successful! Redirecting...");

        setTimeout(() => {
          router.push("/login");
        });
      } else {
        if (
          typeof resultData.message === "object" &&
          resultData.message !== null
        ) {
          const inputErrors = Object.entries(resultData.message).reduce(
            (acc: { [key: string]: string[] }, [key, value]) => {
              acc[key] = Array.isArray(value) ? value : [String(value)];
              return acc;
            },
            {}
          );
          setFormErrors(inputErrors);
          setMessage("");
        } else {
          setMessage(
            typeof resultData.message === "string"
              ? resultData.message
              : "Registration failed!"
          );
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Something went wrong!");
    }
  };
  function nextStep(): void {
    const errors: { [key: string]: string[] } = {};

    fieldsForStep1.forEach((field) => {
      if (!formData[field.column_name]) {
        errors[field.column_name] = [`${field.column_label} is required`];
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    if (step < totalSteps) setStep(step + 1);
  }
  console.log("hello", message);

//   function nextStep1(): void {
//     const errors: { [key: string]: string[] } = {};

//     fieldsForStep2.forEach((field) => {
//       if (!formData[field.column_name]) {
//         formErrors;
//       }
//     });
//     const passwordField = fieldsForStep2.find(
//       (f) =>
//         f.interface_type === "password" && f.column_name === "users_password"
//     );
//     const confirmPasswordField = fieldsForStep2.find(
//       (f) =>
//         f.interface_type === "password" && f.column_name === "custom_column_10"
//     );

//     if (passwordField && confirmPasswordField) {
//       if (formData["users_password"] !== formData["custom_column_12"]) {
//         errors["custom_column_12"] = ["Passwords do not match"];
//       }
//     }
// console.log(formData);

//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }
//     if (step < totalSteps) setStep(step + 1);
//   }
  const totalSteps = 2;

  function prevStep(): void {
    if (step > 1) setStep(step - 1);
  }

  const fieldsForStep1 = formFields.filter(
    (field) => field.interface_type !== "password" && field.active === true
  );

  const fieldsForStep2 = formFields.filter(
    (field) => field.interface_type === "password" && field.active === true
  );

  return (
    <div className="flex flex-col items-center justify-center  my-2 px-10">
      <div className="w-full max-w-4xl p-6 bg-gray-50 rounded-2xl">
        <div className="w-full max-w-4xl p-6 bg-gray-50 rounded-2xl ">
          <h1 className="text-center text-2xl font-bold">Register Form</h1>

          <ProgressBar currentStep={step} />
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fieldsForStep1.map((field) => (
                  <div key={field.column_name} className="relative ">
                    {field.column_name === "users_phone" ? (
                      <>
                        <label className="text-sm">{field.column_label}</label>
                        <PhoneInput
                          country={"in"}
                          value={formData["users_phone"] || ""}
                          onChange={(phone, CountryData) => {
                            const country = CountryData as CountryData;
                            setFormData((prev) => ({
                              ...prev,
                              users_phone: phone,
                              users_phone_code: country?.dialCode || "",
                            }));
                          }}
                          containerStyle={{ width: "100%", marginTop: "8px" }}
                          inputStyle={{
                            width: "100%",
                            height: "40px",
                            borderRadius: "6px",
                          }}
                          inputClass=" focus:outline-none focus:ring-2 focus:ring-blue-500"
                          buttonClass="w-12 h-10  flex items-center justify-center border rounded  "
                        />
                      </>
                    ) : field.column_name === "country_name" ? (
                      <AjaxSearchDropdown
                        label={field.column_label}
                        fetchData={fetchCountries}
                        onSelect={handleSelect}
                        placeholder={field.column_label}
                        className="mt-2 "
                      />
                    ) : (
                      <InputField
                        name={field.column_name}
                        type={field.interface_type}
                        placeholder={field.column_label}
                        value={formData[field.column_name] || ""}
                        onChange={handleChange}
                        required
                        label={field.column_label}
                        errorMessage=""
                        className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}

                    {formErrors[field.column_name] &&
                      formErrors[field.column_name].map((errMsg, index) => (
                        <p key={index} className="text-red-500 text-sm mt-1">
                          {errMsg}
                        </p>
                      ))}
                  </div>
                ))}
              </div>

              {message && typeof message === "string" && (
                <div
                  className={`mt-3 p-2 rounded text-white flex text-center justify-center ${
                    message.includes("successful")
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  <p>{message}</p>
                </div>
              )}
              <div className="mt-5 text-xs md:text-sm">
                <h1>
                  SAP will use the data provided hereunder in accordance with
                  the{" "}
                  <Link href={""} className="underline text-blue-900">
                    Privacy Statement.
                  </Link>
                </h1>

                <h1>
                  I have read and understood the Terms and Conditions of{" "}
                  <Link href={""} className="underline text-blue-500">
                    SAP.com
                  </Link>{" "}
                  *
                </h1>

                <h1>
                  This site is protected by reCAPTCHA and the Google{" "}
                  <Link href={""} className="underline text-blue-500">
                    {" "}
                    Privacy Policy{" "}
                  </Link>{" "}
                  and{" "}
                  <Link href={""} className="underline text-blue-500">
                    {" "}
                    Terms of Service
                  </Link>{" "}
                  apply.
                </h1>
              </div>

              <div className="flex justify-center mt-4 w-full">
                <Button
                  label="Next"
                  onClick={nextStep}
                  size="medium"
                  variant="primary"
                  className="rounded-md"
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fieldsForStep2.map((field, index) => (
                  <div key={field.column_name} className="relative">
                    <InputField
                      name={field.column_name}
                      type={showPassword[index] ? "text" : "password"}
                      placeholder={field.column_label}
                      value={formData[field.column_name] || ""}
                      onChange={handleChange}
                      required
                      label={field.column_label}
                      errorMessage=""
                      className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {field.interface_type === "password" && (
                      <button
                        type="button"
                        onClick={() => togglePassword(index)}
                        className="absolute right-3 top-11 text-gray-600"
                      >
                        {showPassword[index] ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    )}
                    {formErrors[field.column_name] &&
                      formErrors[field.column_name].map((errMsg, index) => (
                        <p key={index} className="text-red-500 text-xl mt-1 ">
                          {errMsg}
                        </p>
                      ))}
                  </div>
                ))}
                {/* </div> */}
                {message && typeof message === "string" && (
                  <div
                    className={`mt-3 p-2 rounded text-white flex text-center justify-center ${
                      message.includes("successful")
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    <p>{message}</p>
                  </div>
                )}
              </div>{" "}
              {message && typeof message === "string" && (
                <div
                  className={`mt-3 p-2 rounded  flex text-center justify-center ${
                    message.includes("successful")
                      ? "text-green-500"
                      : "text-red-600"
                  }`}
                >
                  <p>{message}</p>
                </div>
              )}
              <div className="flex justify-between mt-4">
                <Button label="Back" onClick={prevStep} variant="secondary" />
                <Button
                  label="Submit"
                  onClick={handleSubmit}
                  size="medium"
                  variant="primary"
                  className="rounded-md"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
