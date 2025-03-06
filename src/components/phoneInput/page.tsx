import React, { useState } from 'react'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
interface PhoneInputsProps {
  label: string;
  country?: "in";
  value: string;
  onChange: (phone: string) => void;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonClass?: string;
}

export default function PhoneInputs({ label }: PhoneInputsProps) {
    const [phone, setPhone] = useState<string>("");
  return (
    <div>
       <div className="w-full mt-2 max-w-full">
       <label className="mb-1 mt-2 text-sm font-medium text-gray-700">
          {label}
        </label>
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              containerStyle={{ width: "100%" }}
              inputStyle={{
                width: "100%",
                height: "40px",
                borderRadius: "6px",
              }}
              buttonClass="w-12 h-10 flex items-center justify-center border rounded"
            />
          </div>
    </div>
  )
}
