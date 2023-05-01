import Image from "next/image";
import logo from "@/assets/edc-logo.svg";
import styles from "./Stepper.module.css";
import { useState } from "react";
// import stepperCheckmark from "./../../assets/stepper-checkmark.svg";
import Link from "next/link";

export function Stepper({ currentStep, setCurrentStep }) {
  console.log("currentStep", currentStep);
  function jumpToStep(id) {
    setCurrentStep(id);
  }
  return (
    <nav className={styles.stepper}>
      <ul>
        <li
          className={`${currentStep === 1 ? styles.active : ""} ${
            currentStep > 1 ? styles.done : ""
          }`} /*GPT */
        >
          <Link
            onClick={() =>
              currentStep > 1
                ? jumpToStep(1)
                : () => {
                    console.log("undefined step 1 clicked");
                    return undefined;
                  }
            }
            href="/"
          >
            <span className={styles.accent}>{currentStep > 1 ? "✓" : "1"}</span>
          </Link>
          <h4>Bolig</h4>
        </li>
        <li
          className={`${currentStep === 2 ? styles.active : ""} ${
            currentStep > 2 ? styles.done : ""
          }`} /*GPT */
        >
          <Link
            onClick={() =>
              currentStep > 2
                ? jumpToStep(2)
                : () => {
                    console.log("undefined step 2 clicked");
                    return undefined;
                  }
            }
            href="/buyers"
          >
            <span className={styles.accent}>{currentStep > 2 ? "✓" : "2"}</span>
          </Link>
          <h4>Købere</h4>
        </li>
        <li>
          <Link href="">
            <span className={styles.accent}>3</span>
          </Link>
          <h4>Kontaktinfo</h4>
        </li>
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
          <h4>kontakter dig</h4>
        </li>
      </ul>
    </nav>
  );
}

{
  /*    <Link
            onClick={(e) => (currentStep > 1 ? nextStep(e) : console.log("no"))}
            href="/"
          > <span className={styles.accent}>✓</span>  </Link>*/
}
