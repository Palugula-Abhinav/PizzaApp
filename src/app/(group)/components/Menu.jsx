"use client";
import React from "react";
import Image from "next/image";
import MenuItem from "./menuItem";
import SectionHeader from "@/components/SectionHeader";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Menu = () => {
  let session = useSession();
  let status = session.status;
  return (
    <div className="pt-20">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={"/sallad1.png"} width={109} height={189} alt={"sallad"} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={"/sallad2.png"} width={107} height={195} alt={"sallad"} />
        </div>
      </div>
      <div className="text-center">
        <SectionHeader subHeading={"Checkout"} mainHeading={"Menu"} />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-12">
        <MenuItem status={status} />
        <MenuItem status={status} />
        <MenuItem status={status} />
        <MenuItem status={status} />
        <MenuItem status={status} />
        <MenuItem status={status} />
        <MenuItem status={status} />
        <MenuItem status={status} />
        <MenuItem status={status} />
      </div>
    </div>
  );
};

export default Menu;
