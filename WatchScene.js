 "use client";
import {useFrame,useThree} from "@react-three/fiber";
import {useWatch} from "../context/WatchContext";
import * as THREE from "three";
import {useEffect,useMemo,useRef} from "react";

function Gear({radius=1,teeth=18,thickness=.12,material,offset=0}){
 const ref=useRef();
 const shape=useMemo(()=>{const s=new THREE.Shape(),n=teeth*2;for(let i=0;i<n;i++){const a=i/n*Math.PI*2,r=i%2?radius:radius*1.12,x=Math.cos(a)*r,y=Math.sin(a)*r;i?s.lineTo(x,y):s.moveTo(x,y)}s.closePath();return s},[radius,teeth]);
 const geo=useMemo(()=>new THREE.ExtrudeGeometry(shape,{depth:thickness,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:2}),[shape,thickness]);
 useEffect(()=>()=>geo.dispose(),[geo]);
 return <mesh ref={ref} geometry={geo} rotation={[Math.PI/2,0,offset]} castShadow receiveShadow><meshPhysicalMaterial {...material} metalness={.92} roughness={.14} clearcoat={1} clearcoatRoughness={.1}/></mesh>
}
export default function WatchScene({degraded}){
 const group=useRef(),crystal=useRef(),bezel=useRef(),gears=useRef();
 const {velocity,materialPreset}=useWatch(); const {clock}=useThree();
 const metal={color:materialPreset.metal,metalness:.9,roughness:.15,clearcoat:1,clearcoatRoughness:.1};
 useFrame((_,delta)=>{
   const v=velocity;
   const target=Math.min(2.4,Math.abs(window.scrollY||0)/650);
   if(group.current){group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,Math.sin(clock.elapsedTime*.22)*.13+v*1.8,5,delta);group.current.position.y=THREE.MathUtils.damp(group.current.position.y,Math.sin(clock.elapsedTime*.55)*.08,4,delta)}
   if(crystal.current) crystal.current.position.z=THREE.MathUtils.damp(crystal.current.position.z,target*.8,5,delta);
   if(bezel.current) bezel.current.position.z=THREE.MathUtils.damp(bezel.current.position.z,target*.34,5,delta);
   if(gears.current){gears.current.position.z=THREE.MathUtils.damp(gears.current.position.z,-target*.5,5,delta);gears.current.rotation.z+=v*delta*7}
 });
 useEffect(()=>()=>{if(!group.current)return;group.current.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>m.dispose())}})},[]);
 return <group ref={group} scale={1.2}>
  <mesh rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[2.45,.42,.55,96]}/><meshPhysicalMaterial {...metal}/></mesh>
  <group ref={bezel} position={[0,0,.38]}><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[2.18,.23,24,96]}/><meshPhysicalMaterial {...metal}/></mesh></group>
  <mesh position={[0,0,.52]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[1.96,1.96,.09,96]}/><meshPhysicalMaterial color="#171818" metalness=".35" roughness=".22"/></mesh>
  <group ref={gears} position={[0,0,-.02]}>
   <Gear radius=".95" teeth={24} material={metal} offset={.1}/><Gear radius=".62" teeth={17} material={metal} offset={.5}/><Gear radius=".42" teeth={14} material={metal} offset={1.1}/>
   <mesh position={[.65,.35,.14]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.34,.045,12,48]}/><meshPhysicalMaterial {...metal}/></mesh>
  </group>
  <mesh ref={crystal} position={[0,0,.72]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[1.94,1.94,.16,96]}/><meshPhysicalMaterial color="#dcefff" transparent opacity=".28" transmission={.95} thickness={1.2} roughness={0} ior={1.5} metalness={0}/></mesh>
  <mesh position={[0,0,.88]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.78,.018,8,96]}/><meshPhysicalMaterial color={materialPreset.accent} emissive={materialPreset.accent} emissiveIntensity={.15} metalness=".8" roughness=".18"/></mesh>
 </group>
}
