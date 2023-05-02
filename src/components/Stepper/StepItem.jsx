import Link from "next/link";
import styles from "./Stepper.module.css";

export default function StepItem({
  currentStep,
  jumpToStep,
  stepNumber,
  title,
  theHref,
}) {
  const isStepActive = currentStep === stepNumber;
  const isStepDone = currentStep > stepNumber;

  return (
    <li
      className={`${isStepActive ? styles.active : ""} ${
        isStepDone ? styles.done : ""
      }`}
    >
      <Link
        onClick={() =>
          isStepDone
            ? jumpToStep(stepNumber)
            : () => console.log(`undefined step ${stepNumber} clicked`)
        }
        href={theHref}
        // href={stepNumber === 1 ? "/" : "/buyers"}
      >
        <span className={styles.accent}>{isStepDone ? "✓" : stepNumber}</span>
      </Link>
      <h4>{title}</h4>
    </li>
  );
}
