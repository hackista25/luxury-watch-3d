 "use client";
import {Canvas} from "@react-three/fiber";
import {PerformanceMonitor,ContactShadows,Environment} from "@react-three/drei";
import {useState} from "react";
import WatchScene from "./WatchScene";
export default function WatchViewport(){
 const [dpr,setDpr]=useState([1,2]),[degraded,setDegraded]=useState(false);
 return <div className="fixed inset-0 z-0 pointer-events-none">
  <Canvas dpr={dpr} gl={{powerPreference:"high-performance",antialias:true,alpha:true}} camera={{position:[0,0,8],fov:34,near:.1,far:100}}>
   <PerformanceMonitor flipflop onDecline={()=>{setDegraded(true);setDpr([.75,1])}} onIncline={()=>{setDegraded(false);setDpr([1,2])}} min={30} max={60}/>
   <ambientLight intensity={.55}/><directionalLight position={[4,6,8]} intensity={4} castShadow={!degraded} shadow-mapSize={[degraded?512:2048,degraded?512:2048]}/>
   <Environment preset="studio" environmentIntensity={.75}/>
   <WatchScene degraded={degraded}/>
   <ContactShadows position={[0,-3,0]} opacity={.28} scale={12} blur={2.5} frames={degraded?1:Infinity}/>
  </Canvas>
 </div>
}
