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
      <section className="section1">
        <h3>Welcome to the Homepage!</h3>
        <Button 
          as={Link}
          href="https://github.com/gitkeegan"
          color="success"
          variant="solid"
          className="text-white font-medium shadow-sm bg-green-500 hover:bg-green-600"
        >
          Github
        </Button>
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
            <div className="img">
              <img src="/image.png"/>
            </div>
            <h1>This is now part of section 2</h1>
            <p>This section has had an image added. I really hope this looks okay?</p>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
