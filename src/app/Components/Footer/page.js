'use client'
import { FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import colorSharp from "../../../../public/img/color-sharp.png";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bg-[#131315] py-10"
    style={{
            backgroundImage: `url(${colorSharp.src}) `,
            backgroundSize: "cover",
            backgroundPosition: "end",
            backgroundRepeat: "no-repeat",
          }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="w-full md:w-1/3">
            
          </div>


          <div className="w-full md:w-1/3 text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-4 mb-2">
               <div className="flex md:space-x-4 gap-1">
                          <Link href="https://github.com/janhavibandhane"><div className=" w-8 h-8 md:w-10 md:h-10 bg-[#1e1e1e] opacity-35 rounded-full border-2 border-white flex justify-center items-center">
                            <FaGithub className="text-4xl bg-white rounded-full" />
                          </div>
                          </Link>
                          <div className=" w-8 h-8 md:w-10 md:h-10 bg-[#1e1e1e] opacity-25 rounded-full border-2 border-white flex justify-center items-center">
                            <BsLinkedin className="md:text-4xl text-3xl rounded-full bg-white" />
                          </div>
                        </div>
            </div>
            <p className="text-sm text-gray-500">
              © All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
