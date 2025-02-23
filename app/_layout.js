
import { LevelProvider, LevelContext } from "../scripts/context.js";

import { Link, Slot, Redirect } from 'expo-router';



export default function Layout() {
  return (
    <LevelProvider>
      <Redirect href="/home/App" />
      <Slot />
    </LevelProvider>
  );
}