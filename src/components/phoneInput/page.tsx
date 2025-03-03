import React, { useState } from 'react'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


export default function page() {
    const [phone, setPhone] = useState<any>();
  return (
    <div>
       <div className="w-full max-w-full">
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
