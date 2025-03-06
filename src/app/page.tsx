import Link from "next/link";
import Navbar from "../layout/Navbar";

export default function Home() {
  return (
    <>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex justify-around font-bold text-2xl items-center text-center mt-8">
<Link href={"./login"}>Login</Link>
<Link href={"./Register"}>Register</Link>
</div>
 <div className="flex justify-center text-center items-center mt-32">
<h1 className=" text-4xl font-bold">This is main page</h1>
 </div>
 <footer className="text-center p-4 bg-gray-200 text-gray-700 mt-56">
      Developed by <span className="font-bold">Tanveer Ali</span>
    </footer>
    </>
  );
}
