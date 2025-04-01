"use client";

import { useEffect, useState } from "react";
import Input from "@/src/sharedcomponents/textinput";
import DropdownComponent from "@/src/sharedcomponents/dropdown";
import {
  DropdownSkeleton,
  Form,
  SkeletonText,
  Theme
} from "@carbon/react";
import CustomButton from "@/src/sharedcomponents/button";
import DataTableDisplay from "@/src/sharedcomponents/datatabledisplay";
import { useRouter } from "next/navigation";
import Navbar from "../navbar";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [theme, setTheme] = useState<'g100' | 'white'>('g100'); // Dark theme default
  const [language, setLanguage] = useState<"English" | "Spanish">("English");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleDropdownChange = (option: string) => setSelectedOption(option);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", text);
  };

  return (
    <>
    <Theme theme={theme}>
      <div className={`min-h-screen ${theme === 'g100' ? 'cds-theme-g100' : 'cds-theme-white'}`}>
      
        <Navbar theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />

        <br /><br />
        <div className="dashboard">Dashboard</div>

        <Form className="form" onSubmit={handleSubmit}>
          <div className="tilesGrid">
            <div className="tile">
              <div className="tileContent">
                {loading ? (
                  <SkeletonText />
                ) : (
                  <div className="inputWithButton">
                    <Input
                      id="name"
                      label="Enter Name"
                      value={text}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                      placeholder="Enter Text"
                    />
                    {/* <CustomButton id="submit-btn" label="Submit" /> */}
                  </div>
                )}
              </div>
            </div>

            <div className="tile">
              <div className="tileContent">
                {loading ? (
                  <DropdownSkeleton />
                ) : (
                  <DropdownComponent
                    id="default"
                    label="Select an option the table "
                    items={[
                      "Select an option to see table",
                      "same data table but option 2",
                      "same data table but option 3",
                    ]}
                    onChange={handleDropdownChange}
                  />
                )}
              </div>
            </div>
          </div>
        </Form>
        {selectedOption && <DataTableDisplay />}
      </div>
    </Theme>
    </>
    );
  }