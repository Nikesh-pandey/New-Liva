import Image from "next/image";
import Card from "@/components/Card/Card";
import Register from "@/components/Register/Register"
import Newsection from "@/components/Newsection/Newsection";
import OTPInput from "@/components/OTP/OTP";
import Navbar from "@/components/Navbar/Navbar";
export default function Home() {
  return (
    <>
  <Navbar/>
<Newsection/>
  {/* <Card/> */}
<OTPInput/>
    </>
  );
}
