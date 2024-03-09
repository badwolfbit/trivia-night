// TODO: navbar from previous & darkmode/lightmode toggle
// TODO: triviaQuestion & triviaAnswer components
// TODO: triviaDB API call
// TODO: redis cache for triviaDB

// import { createContext, useContext, useState } from "react";
import Navbar from '@/app/components/navbar';


export default function Home() {

  return (
    <div>
      <Navbar />
      <h1>Trivia Night</h1>
    </div>
  );
}
