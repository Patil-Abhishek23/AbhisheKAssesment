'use client';
import { useState, useEffect } from 'react';
import {
  Grid,
  Column,
  ClickableTile,
  Theme,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Dropdown,
} from '@carbon/react';
import { useRouter } from 'next/navigation';
import {
  Dashboard,
  Archive,
  Document,
  ChartColumn,
  Moon,
  Sun,
  Logout,
} from '@carbon/icons-react';
import translations from "../language/translation.json"; 
import './dashboard.scss'; // Import your CSS module

export default function DashboardPage() {
  const router = useRouter();
  const [theme, setTheme] = useState<'g100' | 'white'>('g100'); 
  const [language, setLanguage] = useState<keyof typeof translations>('English');
  const [texts, setTexts] = useState(translations[language]); 

  useEffect(() => {
    setTexts(translations[language]); 
  }, [language]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'g100' ? 'white' : 'g100'));
  };

  const handleLogout = () => {
    router.push('./'); 
  };

  const handleLanguageChange = ({ selectedItem }: { selectedItem: string }) => {
    setLanguage(selectedItem as keyof typeof translations);
  };

  const languageOptions = Object.keys(translations);

  const tiles = [
    {
      title: texts.archiveData,
      description: texts.archiveDescription,
      icon: Archive,
      action: () => router.push('/datatables'),
    },
    {
      title: texts.analytics,
      description: texts.analyticsDescription,
      icon: ChartColumn,
      action: () => router.push('/products'),
    },
    {
      title: texts.documents,
      description: texts.documentsDescription,
      icon: Document,
      action: () => router.push('/shared'),
    },
    {
      title: texts.overview,
      description: texts.overviewDescription,
      icon: Dashboard,
      action: () => router.push('/Forms'),
    },
  ];

  return (
    <Theme theme={theme}>
      <div style={{ minHeight: '100vh', backgroundColor: theme === 'g100' ? '#161616' : '#ffffff' }}>
        {/* Navigation Bar */}
        <Header aria-label="Intellispheere Navbar">
          <HeaderName prefix="">Intellisphere</HeaderName>
          <HeaderGlobalBar>
            <Dropdown
              id="language-dropdown"
              titleText=""
              label={language}
              items={languageOptions}
              selectedItem={language}
              onChange={handleLanguageChange}
              size="sm"
            />
            <HeaderGlobalAction aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === 'g100' ? <Sun size={20} /> : <Moon size={20} />}
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Logout" onClick={handleLogout}>
              <Logout size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>

        <br />
        <br />
        {/* Main Content */}

        <main style={{ padding: '2rem' }}>
          <Grid>
            <Column lg={16} md={8} sm={4}>
              <h1 style={{ color: theme === 'g100' ? '#ffffff' : '#161616' }}>{texts.dashboardOverview}</h1>
            </Column>
          </Grid>

          <div className="dashboardtilesGrid">
            {tiles.map((tile, index) => (
              <ClickableTile key={index} className="dashboardtile" onClick={tile.action}>
                
                  <div className="dashtileContent">
                    <tile.icon size={32} />
                    <h3 className="cds--type-productive-heading-02">{tile.title}</h3>
                    <p className="cds--type-body-long-01">{tile.description}</p>
                  </div>
          
              </ClickableTile>
            ))}
          </div>

       
        </main>
      </div>
    </Theme>
  );
}