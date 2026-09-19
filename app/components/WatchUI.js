 "use client";
import {useEffect,useState} from "react";
import {useWatch} from "../context/WatchContext";
export default function WatchUI(){
 const {material,setMaterial,velocity}=useWatch(),[progress,setProgress]=useState(0);
 useEffect(()=>{const f=()=>{const h=document.documentElement.scrollHeight-innerHeight;setProgress(h?scrollY/h:0)};addEventListener("scroll",f,{passive:true});f();return()=>removeEventListener("scroll",f)},[]);
 const mail=`mailto:concierge@aurelius.example?subject=Aurelius%20Pre-Order%20Inquiry%20—%20${material}`;
 return <main className="relative z-10 min-h-[320vh]">
  <div className="fixed top-0 left-0 h-[2px] bg-[#d6b77a] z-50 origin-left" style={{width:`${progress*100}%`}}/>
  <header className="fixed top-0 inset-x-0 z-40 px-6 md:px-12 py-6 flex justify-between items-center">
   <div className="tracking-[.35em] text-xs">AURELIUS / 01</div><div className="text-xs tracking-[.2em] opacity-60">ATELIER HOROLOGY</div>
  </header>
  <section className="h-screen flex items-end px-6 md:px-16 pb-20">
   <div className="max-w-3xl"><p className="uppercase tracking-[.45em] text-xs text-[#d6b77a] mb-5">The Kinetic No. 01</p><h1 className="font-display text-[clamp(4rem,11vw,10rem)] leading-[.78] text-balance">Time,<br/><i>engineered.</i></h1><p className="mt-8 max-w-lg text-sm leading-7 opacity-65">A cinematic study of mechanical precision, sapphire optics and architectural metalwork.</p></div>
  </section>
  <section className="min-h-screen px-6 md:px-16 flex items-center justify-end"><div className="glass rounded-2xl p-7 w-full max-w-sm"><p className="text-xs tracking-[.3em] opacity-50">MATERIAL ARCHIVE</p><div className="mt-5 space-y-2">{Object.keys({RoseGold:1,Platinum:1,MatteTitanium:1}).map(x=><button key={x} onClick={()=>setMaterial(x)} className={`w-full text-left px-4 py-4 rounded-xl border ${material===x?"border-[#d6b77a] bg-white/10":"border-white/10"}`}>{x}<span className="float-right opacity-40">01</span></button>)}</div><div className="mt-7 pt-5 border-t border-white/10 text-xs opacity-50">SCROLL VELOCITY · {velocity.toFixed(3)}</div></div></section>
  <section className="min-h-screen flex items-end px-6 md:px-16 pb-20"><div className="glass rounded-2xl p-8 max-w-md"><p className="text-xs tracking-[.3em] text-[#d6b77a]">PRIVATE ALLOCATION</p><h2 className="font-display text-4xl mt-3">Request a pre-order.</h2><p className="opacity-60 text-sm leading-6 mt-4">Contact the atelier concierge for availability, material specifications and private acquisition details.</p><a href={mail} className="inline-block mt-6 px-6 py-3 rounded-full bg-[#eee9dc] text-black text-sm">Email Concierge</a></div></section>
 </main>
}
