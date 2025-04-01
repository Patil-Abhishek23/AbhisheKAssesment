"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Stack,
  TextInput,
  Dropdown,
  Button,
  Grid,
  Column,
  Theme
} from "@carbon/react";
import { useDispatch, useSelector } from "react-redux";
import { saveForm } from "../redux/slices/formSlices";
import { useRouter } from "next/navigation";
import { RootState } from "../redux/store";
import Navbar from "../navbar";
import "./registration.module.scss";


const registerForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const formData = useSelector((state: RootState) => state.form);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [theme, setTheme] = useState<'g100' | 'white'>('g100');
  
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    relationship: "",
    fileName: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  useEffect(() => {
    if (formData.isReadOnly) {
      setFormValues({
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        email: formData.email || "",
        gender: formData.gender || "",
        relationship: formData.relationship || "",
        fileName: formData.fileName || "",
      });
    }
  }, [formData]);

  const handleTextChange = (id: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDropdownChange = (id: string) => (
    { selectedItem }: { selectedItem: string }
  ) => {
    setFormValues((prev) => ({ ...prev, [id]: selectedItem }));
  };


  const validateForm = () => {
    const newErrors = {
      firstName: !formValues.firstName.trim(),
      lastName: !formValues.lastName.trim(),
      email: !formValues.email.trim() || !/\S+@\S+\.\S+/.test(formValues.email),
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(saveForm(formValues));
      router.push("/dashboard");
    }
  };

  return (
    <Theme theme={theme}>
      <div style={{ minHeight: '100vh', backgroundColor: theme === 'g100' ? '#161616' : '#ffffff', color: theme === 'g100' ? '#ffffff' : '#161616' }}>
        <Navbar theme={theme} setTheme={setTheme} language="English" setLanguage={() => {}} />
        <main style={{ padding: '2rem' }}>
          <Form onSubmit={handleSubmit}>
            <Grid fullWidth>
              <Column sm={4} md={8} lg={16} className="form-container">
                <Stack gap={7}>
                  <br></br>
                  <h3>Personal Information</h3>

                  <TextInput
                    id="firstName"
                    labelText="First Name"
                    placeholder="Enter your first name"
                    value={formValues.firstName}
                    onChange={(e) => handleTextChange("firstName", e.target.value)}
                    invalid={errors.firstName}
                    invalidText="First name is required"
                    disabled={formData.isReadOnly}
                  />

                  <TextInput
                    id="lastName"
                    labelText="Last Name"
                    placeholder="Enter your last name"
                    value={formValues.lastName}
                    onChange={(e) => handleTextChange("lastName", e.target.value)}
                    invalid={errors.lastName}
                    invalidText="Last name is required"
                    disabled={formData.isReadOnly}
                  />

                  <TextInput
                    id="email"
                    labelText="Email"
                    placeholder="Enter your email address"
                    value={formValues.email}
                    onChange={(e) => handleTextChange("email", e.target.value)}
                    invalid={errors.email}
                    invalidText="Please enter a valid email address"
                    disabled={formData.isReadOnly}
                    type="email"
                  />

                  <Dropdown
                    id="gender"
                    titleText="Gender"
                    label="Select gender"
                    items={["Male", "Female", "Other"]}
                    selectedItem={formValues.gender}
                    onChange={handleDropdownChange("gender")}
                    disabled={formData.isReadOnly}
                  />

                  <Dropdown
                    id="relationship"
                    titleText="Relationship Status"
                    label="Select relationship status"
                    items={["Single", "Married", "Divorced", "Widowed"]}
                    selectedItem={formValues.relationship}
                    onChange={handleDropdownChange("relationship")}
                    disabled={formData.isReadOnly}
                  />

                  {!formData.isReadOnly && <Button kind="primary" type="submit">Submit</Button>}
                </Stack>
              </Column>
            </Grid>
          </Form>
        </main>
      </div>
    </Theme>
  );
};

export default registerForm;
