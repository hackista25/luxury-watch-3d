import "./globals.css";
import {WatchProvider} from "./context/WatchContext";
export const metadata={title:"Aurelius — Kinetic No. 01",description:"An immersive mechanical horology experience."};
export default function RootLayout({children}){return <html lang="en"><body><WatchProvider>{children}</WatchProvider></body></html>}