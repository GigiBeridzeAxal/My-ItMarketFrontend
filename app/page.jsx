import Image from "next/image";
import Header from "./components/Header";
import NavHeader from './components/NavHeader'
import { ToastContainer } from "react-toast";

export default function Home() {
  return (
  <>

   <div className="main w-[100%]  flex justify-center ">
    <div className="mainframe w-[80%]">
         <Header></Header>
         <NavHeader></NavHeader>
         
    </div>

   </div>
  </>
  );
}
