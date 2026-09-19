 "use client";
import {createContext,useContext,useEffect,useMemo,useRef,useState} from "react";
const WatchContext=createContext(null);
export const MATERIALS={
  RoseGold:{metal:"#b88973",accent:"#e4b29a"},
  Platinum:{metal:"#c8d0d5",accent:"#f4f5f3"},
  MatteTitanium:{metal:"#626b70",accent:"#9aa4a8"}
};
export function WatchProvider({children}){
  const [material,setMaterial]=useState("RoseGold");
  const [velocity,setVelocity]=useState(0);
  const velocityRef=useRef(0),lastY=useRef(0),lastT=useRef(performance.now());
  useEffect(()=>{
    const onScroll=()=>{
      const now=performance.now(),dt=Math.max(8,now-lastT.current);
      const raw=(window.scrollY-lastY.current)/dt;
      velocityRef.current=velocityRef.current*.78+raw*.22;
      lastY.current=window.scrollY;lastT.current=now;
    };
    const tick=()=>{velocityRef.current*=.94;setVelocity(velocityRef.current);raf=requestAnimationFrame(tick)};
    window.addEventListener("scroll",onScroll,{passive:true});
    let raf=requestAnimationFrame(tick);
    return()=>{window.removeEventListener("scroll",onScroll);cancelAnimationFrame(raf)};
  },[]);
  const value=useMemo(()=>({material,setMaterial,velocity,materialPreset:MATERIALS[material]}),[material,velocity]);
  return <WatchContext.Provider value={value}>{children}</WatchContext.Provider>;
}
export const useWatch=()=>useContext(WatchContext);
