import logo from "@/assets/edc-logo.svg";
import Image from "next/image";
import styles from "./Stepper.module.css";
// import stepperCheckmark from "./../../assets/stepper-checkmark.svg";
import Link from "next/link";

export function Stepper() {
  return (
    <nav className={styles.stepper}>
      <ul>
        <li className={styles.done}>
          <a href="">
            <span className={styles.accent}>✓</span>
          </a>
          <h4>Bolig</h4>
        </li>
        <li className={styles.active}>
          <a href="">
            <span className={styles.accent}>2</span>
          </a>
          <h4>Købere</h4>
        </li>
        <li>
          <a href="">
            <span className={styles.accent}>3</span>
          </a>
          <h4>Kontaktinfo</h4>
        </li>
        <li className={styles.edclogo}>
          <a href="">
            <span>
              <Image
                src={logo}
                alt="EDC kontakter dig"
                width={32}
                height={32}
              />
            </span>
          </a>
          <h4>kontakter dig</h4>
        </li>
      </ul>
    </nav>
  );
}
