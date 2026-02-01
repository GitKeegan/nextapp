"use client";

import Image from "next/image";
import React from "react";
import * as UI from "./components/index";
import { Button } from "@nextui-org/react";
import Link from "next/link";


export default function Home() {

  return (
    <>
      <h3>Welcome to the Homepage!</h3>
    <Button 
      as={Link}
      href="https://github.com/gitkeegan"
      color="success"
      variant="solid"
      className="text-white font-medium shadow-sm bg-green-500 hover:bg-green-600"
    >
  Github
</Button>    </>    
  );
}
