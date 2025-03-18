"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/buttons";
import Link from "next/link";
import Image from "next/image";
import Loginimg from "../../../public/LoginSvg.jpg";
import { Eye, EyeOff } from "lucide-react";

interface Loginfield {
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
}

export default function Login({ Loginfield }: { Loginfield: Loginfield[] }) {
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    Loginfield.reduce((acc, field) => {
      acc[field.column_name] = "";
      return acc;
    }, {} as Record<string, string>)
  );

  const [errors, setErrors] = useState<string | null>(null);
  const [showPassword, setshowPassword] = useState<{ [key: number]: boolean }>(
    {}
  );
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = (index: number) => {
    setshowPassword((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      const res = await fetch(
        "https://erp-backend-kunxite.vercel.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        document.cookie = `Token=${data.token}; path=/; max-age=86400`;
        router.push("/dashboard");
      } else {
        setErrors(data.massage || "Invalid Email or Password");
      }
    } catch {
      setErrors("Somthing went wrong. Please try again letter");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-svh px-10 sm:px-5  bg-gray-100">
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 justify-center items-center">
        <Image
          src={Loginimg}
          alt="Login"
          className="w-3/4 h-auto mix-blend-multiply"
        />
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-lg  md:w-1/2 lg:w-2/5">
        <h1 className="text-2xl text-center font-semibold text-gray-700 mb-6 ">
          ERP Login
        </h1>
        {Loginfield.map((field, index) => (
          <div key={field.column_name} className="relative">
            <InputField
              name={field.column_name}
              label={field.column_label}
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
              errorMessage=""
              className="focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {errors && (
              <p className="text-red-500 text-sm text-center">{errors}</p>
            )}
          </div>
        ))}
        <div className="flex justify-center w-full mt-4">
          <Button
            label="Login"
            variant="primary"
            onClick={handleSubmit}
            className="w-full"
          />
        </div>
        <div className="flex justify-around gap-5 text-sm mt-3">
          <Link href="/" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
          <Link href="/" className="text-blue-500 hover:underline">
            Continue With SSO
          </Link>
          <Link href="/Register" className="text-blue-500 hover:underline">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
