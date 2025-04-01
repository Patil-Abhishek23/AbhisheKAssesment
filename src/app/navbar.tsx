'use client';

import { useRouter } from 'next/navigation';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, Dropdown } from '@carbon/react';
import { Sun, Moon, Logout } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

export default function Navbar({ theme, setTheme }: { 
  theme: 'g100' | 'white', 
  setTheme: (theme: 'g100' | 'white') => void 
}) {
  const router = useRouter();
  const { i18n } = useTranslation(); // Access i18n instance
  const languageOptions = ['en', 'es']; // Define available languages

  const handleLogout = () => router.push('./');
  const handleLanguageChange = ({ selectedItem }: { selectedItem: string }) => {
    i18n.changeLanguage(selectedItem); // Change language dynamically
  };
  const toggleTheme = () => setTheme(theme === 'g100' ? 'white' : 'g100');

  return (
    <Header aria-label="Intellisphere Navbar">
      <HeaderName prefix="">Intellisphere</HeaderName>
      <HeaderGlobalBar>
        <Dropdown
          id="language-dropdown"
          titleText=""
          label={i18n.language === 'en' ? 'English' : 'Spanish'} // Display current language
          items={languageOptions}
          selectedItem={i18n.language}
          onChange={({ selectedItem }) => {
            if (selectedItem) handleLanguageChange({ selectedItem }); // Handle language change only if selectedItem is not null
          }} // Handle language change
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
  );
}