"use client";

import Image from "next/image";
import React, {useState} from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

interface DropdownButtons {
  dropdownLabel : string;
  buttons : {buttonLabel : string, link : string}[];
}


export default function DropdownElement({dropdownLabel, buttons}:DropdownButtons) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative inline-block" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <Dropdown isOpen={isOpen} className="bg-sky-100">
      <DropdownTrigger>
        <Button variant="bordered" >
          {dropdownLabel}
        </Button>
      </DropdownTrigger>
      <DropdownMenu className="justify-center text-center flex-col text-black" aria-label="Static Actions">
        {buttons.map((button) => (
          <DropdownItem key={button.link} href={button.link}>{button.buttonLabel}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
    </div>    
  );
}
