import { Check } from "lucide-react"; // Import Check icon from react-icons

const steps = ["Register", "Verify your e-mail", "Access all resources"];

export default function ProgressBar({ currentStep }:{currentStep:number}) {
  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div
              className={`relative flex items-center justify-center w-5  h-5 sm:w-9 sm:h-9 rounded-full text-white font-semibold transition-all duration-1000
              ${index + 1 <= currentStep ? "bg-blue-500 " : "bg-gray-400"}`}
            >
              {index + 1 < currentStep ? (
                <Check
                  size={37}
                  className="text-white bg-green-500 sm:p-2 w-5 h-5 sm:w-auto sm:h-auto  rounded-full "
                />
              ) : (
                index + 1
              )}
            </div>

            {/* Step Name Below */}
            <div className="mt-2 text-sm hidden md:flex text-center">
              {step}
            </div>
          </div>

          {/* Only display the line between steps */}
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-3 md:mb-5  sm:w-24 md:w-36 transition-all duration-1000 mx-3 md:mx-0
                ${index + 1 < currentStep ? "bg-green-500" : "bg-gray-400"}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}

// "use client";
// import React from "react";
// import { Check } from "lucide-react";

// interface ProgressBarProps {
//   step: number;
//   totalSteps: number;
// }

// const stepNames: { [key: number]: string } = {
//   1: "Register",
//   2: "Verify your e-mail",
//   3: "Access all resources",
// };

// const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
//   return (
//     <div className="relative flex items-center  w-full mb-8 px-5">
//       {/* Connecting Progress Line */}
//       <div className="absolute top-3 sm:top-4 flex items-center justify-center w-3/5">
//       <div className="relative left-14 w-full  h-1 bg-gray-400 rounded-full ">
//       <div
//         className=" absolute h-1 bg-green-500 rounded-full"
//         style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
//       >
//       </div>
//       </div>
//       </div>
//       {/* Steps */}
//       {Array.from({ length: totalSteps }, (_, index) => {
//         const isCompleted = index < step - 1;
//         const isActive = index === step - 1;

//         return (
//           <div
//             key={index}
//             className="relative flex left-0 flex-col items-center  justify-around w-full"
//           >
//             {/* Circular Step */}
//             <div
//               className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border-2 text-lg font-bold transition-all duration-2000
//               ${
//                 isCompleted
//                   ? "bg-green-600 border-green-600 text-white"
//                   : isActive
//                   ? "border-blue-500 text-white bg-blue-500"
//                   : "border-gray-600 text-gray-600 bg-white"
//               }`}

//             >
//               {isCompleted ? <Check size={22} /> : index + 1}
//             </div>

//             {/* Step Name */}
//             <span
//               className="md:text-sm  text-xs flex text-center   mt-2 text-gray-800"

//             >
//               {stepNames[index + 1]}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProgressBar;
