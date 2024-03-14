import { DarkModeToggle } from "./ui/darkmode-toggle";

export default function Navbar() {
  return (
    <nav>
      <div>Trivia Night</div>
      <div>high scores</div>
      <div>players</div>
      <DarkModeToggle />
    </nav>

  );
}