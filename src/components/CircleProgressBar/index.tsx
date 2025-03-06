import { Check } from "lucide-react"; // Import Check icon from react-icons

const steps = ["Register", "E-mail Verify", "Access all"];

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
            <div className="mt-2 text-sm hidden md:flex text-center w-fit">
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
