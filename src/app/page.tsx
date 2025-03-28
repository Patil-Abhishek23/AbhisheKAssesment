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
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "@carbon/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Moon, Sun, Logout } from "@carbon/icons-react";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
  const [theme, setTheme] = useState<"g100" | "white">("g100"); // Default to dark theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "g100" ? "white" : "g100"));
  };

  const handleLogout = () => {
    // Handle logout logic here
    router.push("/login"); // Redirect to login page
  };

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
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

        {/* Navigation Bar */}
        <Header aria-label="Intellispheere Navbar">
          <HeaderName prefix="">Intellispheere</HeaderName>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === "g100" ? <Sun size={20} /> : <Moon size={20} />}
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Logout"
              onClick={handleLogout}
            >
              <Logout size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>

        <div className={`${styles.container} ${theme}`}>
          <div className="form-header">
            <h4>Welcome back to INtelliSphere</h4>
          </div>

          <Form className={styles.loginform} onSubmit={formik.handleSubmit}>
            <TextInput  className={styles["text-input"]}
              id="username"
              name="username"
              labelText="Username"
              
              type="text"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              invalid={formik.touched.username && !!formik.errors.username}
              invalidText={formik.errors.username}
            />

            <PasswordInput className={styles["password-input"]}
              id="password"
              name="password"
              labelText="Password"
              
              type="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              invalid={formik.touched.password && !!formik.errors.password}
              invalidText={formik.errors.password}
            />

            <Link href="/forgot-password" className={styles["forgot-password-link"]} >
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