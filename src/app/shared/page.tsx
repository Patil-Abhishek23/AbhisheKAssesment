'use client';

import { useEffect, useState } from "react";
import Input from "@/src/sharedcomponents/textinput";
import DropdownComponent from "@/src/sharedcomponents/dropdown";
import {
  DropdownSkeleton,
  SkeletonText,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Theme
} from "@carbon/react";
import { Moon, Sun, Logout } from "@carbon/icons-react";
import CustomButton from "@/src/sharedcomponents/button";
import DataTableDisplay from "@/src/sharedcomponents/datatabledisplay";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [theme, setTheme] = useState<'g100' | 'white'>('g100'); // Dark theme default

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleDropdownChange = (option: string) => setSelectedOption(option);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", text);
  };
  const toggleTheme = () => setTheme(prev => (prev === 'g100' ? 'white' : 'g100'));
  const handleLogout = () => router.push("./");

  return (
    <Theme theme={theme}>
      <div className={`min-h-screen ${theme === 'g100' ? 'cds-theme-g100' : 'cds-theme-white'}`}>
        {/* Navigation Bar */}
        <Header aria-label="Intellispheere Navbar">
          <HeaderName prefix="">Intellispheere</HeaderName>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === 'g100' ? <Sun size={20} /> : <Moon size={20} />}
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Logout" onClick={handleLogout}>
              <Logout size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>

        <br /><br />
        <div className="dashboard">Dashboard</div>

        <form className="form" onSubmit={handleSubmit}>
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
                    <CustomButton id="submit-btn" label="Submit" />
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
        </form>

        {selectedOption && <DataTableDisplay />}
      </div>
    </Theme>
  );
}
