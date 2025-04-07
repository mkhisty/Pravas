
import { LevelProvider, LevelContext } from "../scripts/context.js";

import { Link, Slot, Redirect } from 'expo-router';
import { wipe } from "../scripts/database.js";



export default function Layout() {
  return (
    <LevelProvider>
      <Redirect href="/home/App" />
      <Slot />
    </LevelProvider>
  );
}