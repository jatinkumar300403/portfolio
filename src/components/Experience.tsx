"use client";

import { createContext, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "./SmoothScroll";
import BootSequence from "./BootSequence";
import Nav from "./Nav";
import Hero from "./Hero";
import TrainingWidget from "./TrainingWidget";
import TrajectoryLine from "./TrajectoryLine";
import CommandPalette from "./CommandPalette";
import { LogFragment } from "./Section";
import Dataset from "./sections/Dataset";
import DataCleaning from "./sections/DataCleaning";
import FeatureEngineering from "./sections/FeatureEngineering";
import TrainingLogs from "./sections/TrainingLogs";
import Hyperparameters from "./sections/Hyperparameters";
import Validation from "./sections/Validation";
import Deployment from "./sections/Deployment";

const BootContext = createContext(false);
export const useBooted = () => useContext(BootContext);

export default function Experience() {
  const [booted, setBooted] = useState(false);
  useSmoothScroll();

  return (
    <BootContext.Provider value={booted}>
      <AnimatePresence>
        {!booted && <BootSequence onDone={() => setBooted(true)} />}
      </AnimatePresence>

      <Nav />
      <TrainingWidget />
      <CommandPalette />

      <main className="relative">
        <TrajectoryLine />
        <Hero />
        <LogFragment text="dataset loaded · 4 domains · quality checks passed" />
        <Dataset />
        <LogFragment text="preprocessing complete · foundations normalized" />
        <DataCleaning />
        <LogFragment text="feature space constructed · reuse detected across epochs" />
        <FeatureEngineering />
        <LogFragment text="training started · 2 epochs logged · live demos attached" />
        <TrainingLogs />
        <LogFragment text="gradient stabilized · tuning hyperparameters" />
        <Hyperparameters />
        <LogFragment text="running evaluation suite..." />
        <Validation />
        <LogFragment text="all checks passed · preparing deployment" />
        <Deployment />
      </main>
    </BootContext.Provider>
  );
}
