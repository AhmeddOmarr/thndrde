"use client";

import Image from "next/image";
import styles from "./page.module.css";
import type { FormProps } from 'antd';
import {Checkbox, Form, Input } from 'antd';
import Antform from "./components/Login";
import Fbutton from "./components/Button";
import FirstC from "./components/FirstC";
import Movieslist from "./components/Movies";

export default function Home() {
  return (
    <main className={styles.main}>
        <div>
        <Movieslist/>
        <Fbutton/>
        </div>
    </main>
  );
}
