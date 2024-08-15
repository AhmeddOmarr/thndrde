"use client";

import Image from "next/image";
import styles from "./page.module.css";
import type { FormProps } from 'antd';
import {Checkbox, Form, Input } from 'antd';
import Antform from "./components/login";
import Fbutton from "./components/Button";
import FirstC from "./components/FirstC";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <FirstC/>
        </div>
        <div>
        <Antform/>
        <Fbutton/>
        </div>
    </main>
  );
}
