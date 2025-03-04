"use client";

import type React from "react";
import { useState } from "react";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/buttons";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Loginimg from "../../../public/Register.webp";
interface FormField {
  column_name: string;
  column_label: string;
  interface_type?: "text" | "password" | "number" | "email" | "tel" | "checkbox" | "radio" | "select";
}


export default function Form({ formFields }: { formFields: FormField[]}) {
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    formFields.reduce((acc, field) => {
      acc[field.column_name] = "";
      return acc;
    }, {} as Record<string, string>)
  );

  const [showPassword, setshowPassword] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return ({
        ...prev,
        [name]: value,
      });
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
            users_number: String(formData?.users_number),
          }),
        }
      );
      const resultData = await res.json();
      if (res.ok) {
        localStorage.setItem("token", resultData.token);
        setMessage("Registration successful! Redirecting...");

        setTimeout(() => {
          router.push("/login");
        }, 2000);
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

  return (
    <div className="flex items-center justify-center min-h-svh px-10 sm:px-5  bg-gray-100">
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 justify-center items-center">
        <Image src={Loginimg} alt="Login" className="w-3/4 h-auto" />
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-lg  md:w-1/2 lg:w-2/5">
      <h1 className="text-center text-2xl font-bold">Register Form</h1>

      <div className="grid grid-cols-1 gap-5">
        {formFields.map((field, index) => (
          <div key={field.column_name} className="relative">
            <InputField
              name={field.column_name}
              type={
                field.interface_type === "password"
                  ? showPassword[index]
                    ? "text"
                    : "password"
                  : field.interface_type
              }
              placeholder={field.column_label}
              value={formData[field.column_name] || ""}
              onChange={handleChange}
              required
              label={field.column_label}
              errorMessage=""
            />
            {field.interface_type === "password" && (
              <button
                type="button"
                onClick={() => togglePassword(index)}
                className="absolute right-3 top-11 text-gray-600"
              >
                {showPassword[index] ? <EyeOff size={20} /> : <Eye size={20} />}
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
      </div>

      {message && typeof message === "string" && (
        <div
          className={`mt-3 p-2 rounded text-white flex text-center justify-center ${
            message.includes("successful") ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p>{message}</p>
        </div>
      )}

      <div className="mt-3 flex items-center justify-center">
        <Button label="Submit" variant="primary" onClick={handleSubmit} />
      </div>
      </div>
    </div>
    
  );
}
