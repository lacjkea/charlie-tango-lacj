import logo from "@/assets/edc-logo.svg";
import { Stepper } from "../Stepper/Stepper";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

export function Header({ currentStep, setCurrentStep }) {
  return (
    <header className="wrapper">
      <Link href="/" aria-label="EDC">
        <Image
          className={styles.logo}
          src={logo.src}
          width={48}
          height={48}
          alt="EDC logo"
          priority
        />
      </Link>
      <Stepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      ></Stepper>
    </header>
  );
}
