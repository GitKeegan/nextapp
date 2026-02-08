"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);


export default function Home() {

  const lenisRef = useRef<any>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    function update(time : number){
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  useGSAP(()=>{
    const sections = document.querySelectorAll("section");
    sections.forEach((section,index) => {
      const container = section.querySelector(".container");

      gsap.to(container, {
        rotation:0,
        ease: "none",
        scrollTrigger:{
          trigger:section,
          start:"top bottom",
          end: "top 20%",
          scrub: true,
        },
      });
    });
  },{scope:containerRef});

  return (
    <>
    <main ref={containerRef}>
      <ReactLenis root options={{autoRaf:false}} ref={lenisRef} />
      <link rel="stylesheet" href="/css/homePage.css"/>
      <section className="section1 content-center">
        
        <div className="header">
          <h2 className="text-xl text-balance font-bold">Welcome to the Homepage!</h2>
        </div>

        <div className="header">
          <p className="text-l">This is my website. On this landing page you can find personal projects I have created, with descriptions and their github repository too.
          This site will also have different subpages for experiementing with different areas of web development.
          </p>
        </div>

        <div className="header">
          <Button 
            as={Link}
            href="https://github.com/gitkeegan"
            color="success"
            variant="solid"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
          >
            Keegan's Git
          </Button>
        </div>
      </section>

      <section className="section2">
        
        <div className="container">
          <div className="col flex flex-col items-start gap-4">
            <h1>Sort Visualiser</h1>
            <img src="/sortVisualiser.png"/>
          </div>

          <div className="col flex flex-col items-start gap-4">
            <p>I created a java application that takes a number of blocks to sort, and a selection of different sorting algorithms,
              and visually sorts them on screen. I added colouring and sounds to help show what the program was working on at any given
              moment.
            </p>
            <Button
              as={Link}
              href="https://github.com/GitKeegan/SortVisualiser"
              color="success"
              variant="solid"
              className="text-white font-medium shadown-sm bg-green-500 hover:bg-green-600 text-center" >
                Github Repo
            </Button>
          </div>
        </div>
      
      </section>

      <section className="section3">
        
        <div className="container">
          <div className="col">
            
            <div className="col flex flex-col items-start gap-4">
              <h1>ENG1 Project</h1>
              <img src="/ENG1.png"/>
            </div>

            <div className="col flex flex-col items-start gap-4">
              <p>For a module of my degree, I undertook a group project, creating a game for university students. I was mainly responsible for handling the website's creation, and risk management of the team.</p>
              <Button
                as={Link}
                href="https://github.com/yetti-eng/assessment2-game"
                color="success"
                variant="solid"
                className="text-white font-medium shadown-sm bg-green-500 hover:bg-green-600 text-center" >
                  Github Repo
              </Button>
            <Button
                as={Link}
                href="https://www-users.york.ac.uk/~xdm510"
                color="success"
                variant="solid"
                className="text-white font-medium shadown-sm bg-green-500 hover:bg-green-600 text-center" >
                  Team Website
            </Button>
            </div>
          
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
