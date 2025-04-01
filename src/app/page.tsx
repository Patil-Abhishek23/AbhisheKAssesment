"use client";

import React, { useState } from "react";
import Head from "next/head";
import {
  Button,
  Link,
  PasswordInput,
  TextInput,
  Form,
  Theme,
} from "@carbon/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./navbar";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
  const [theme, setTheme] = useState<"g100" | "white">("g100");
  const [language, setLanguage] = useState<"English" | "Spanish">("English");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9_]{3,16}$/, "Username must be 3-16 characters, letters, numbers, or underscores only")
        .required("Username is required"),
      password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters, include one letter and one number")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      router.push("/dashboard");
    },
  });

  return (
    <Theme theme={theme}>
      <>
        <Head>
          <title>Intellispheere</title>
          <meta name="description" content="Intellispheere login page" />
        </Head>

        {/* Navbar */}
        <Navbar theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />

        <div className={`${styles.container} ${theme}`}>
          <div className="form-header">
            <h4>Welcome back to Intellispheere</h4>
          </div>

          <Form className={styles.loginform} onSubmit={formik.handleSubmit}>
            <TextInput
              className={styles["text-input"]}
              id="username"
              name="username"
              labelText="Username"
              type="text"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.username && !!formik.errors.username}
              invalidText={formik.touched.username && formik.errors.username}
            />

            <PasswordInput
              className={styles["password-input"]}
              id="password"
              name="password"
              labelText="Password"
              type="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.password && !!formik.errors.password}
              invalidText={formik.touched.password && formik.errors.password}
            />

            <Link href="/forgot-password" className={styles["forgot-password-link"]}>
              Forgot password?
            </Link>

            <Button type="submit" className={styles["submit-button"]}>
              Submit
            </Button>
          </Form>
        </div>
      </>
    </Theme>
  );
}
