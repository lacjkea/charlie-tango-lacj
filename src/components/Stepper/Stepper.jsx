import Image from "next/image";
import logo from "@/assets/edc-logo.svg";
import styles from "./Stepper.module.css";
import { useState } from "react";
// import stepperCheckmark from "./../../assets/stepper-checkmark.svg";
import Link from "next/link";
import StepItem from "./StepItem";

export function Stepper({ currentStep, setCurrentStep }) {
  console.log("currentStep", currentStep);

  function jumpToStep(id) {
    setCurrentStep(id);
  }

  return (
    <nav className={styles.stepper}>
      <ol>
        <StepItem
          currentStep={currentStep}
          jumpToStep={jumpToStep}
          stepNumber={1}
          title="Bolig"
          theHref={"/"}
        />
        <StepItem
          currentStep={currentStep}
          jumpToStep={jumpToStep}
          stepNumber={2}
          title="Købere"
          theHref={"/buyers"}
        />
        <StepItem
          currentStep={currentStep}
          jumpToStep={jumpToStep}
          stepNumber={3}
          title="Kontaktinfo"
          theHref={"/contact"}
        />
        <li className={styles.edclogo}>
          <Link href="">
            <span>
              <Image
                src={logo}
                alt="EDC kontakter dig"
                width={32}
                height={32}
              />
            </span>
          </Link>
          <span className={styles.stepper_text}>kontakter dig</span>
        </li>
      </ol>
    </nav>
  );
}

{
  /*    <Link
            onClick={(e) => (currentStep > 1 ? nextStep(e) : console.log("no"))}
            href="/"
          > <span className={styles.accent}>✓</span>  </Link>*/
}
