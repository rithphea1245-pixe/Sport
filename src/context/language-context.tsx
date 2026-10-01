"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "km";

export interface Translations {
  [key: string]: string;
}

const enTranslations: Translations = {
  // Navigation
  "nav.home": "Home",
  "nav.sports": "Sports",
  "nav.venues": "Venues",
  "nav.about": "About",
  "nav.signIn": "Sign In",
  "nav.register": "Register",
  "nav.adminConsole": "Admin Console",
  "nav.signOut": "Sign Out",
  "nav.themeLight": "Light Mode",
  "nav.themeDark": "Dark Mode",
  "nav.langSwitch": "ភាសាខ្មែរ",

  // Spring I/O Inspired Pass Banner
  "pass.tag": "CAMBODIA 2026 • NATIONAL ATHLETICS SEASON",
  "pass.dates": "Apr · 13 - 15 · 2026",
  "pass.city": "Phnom Penh",
  "pass.venue": "Morodok Techo Stadium",
  "pass.title": "Premier Tournament & Stadium Pass",
  "pass.desc": "Experience world-class football, Kun Khmer championship duels, and martial arts live across national arenas.",
  "pass.cta": "View Season Schedule",
  "pass.secondaryCta": "Arena Direct GPS",
  "pass.pillLive": "Live API Synchronized",
  "pass.pillEdition": "2026 Season Edition",

  // Hero Section
  "hero.badge": "Official Sports Arena & Fan Hub",
  "hero.adminBadge": "Admin Mode • Full CRUD Controls",
  "hero.sync": "Live API Synchronized",
  "hero.title1": "National Sports, Tournaments & ",
  "hero.titleHighlight": "Arenas",
  "hero.desc": "Explore national athletics news, breaking tournament stories, match arenas, and engage in fan discussions. Save your favorite teams and matches with one click.",
  "hero.adminDesc": "Welcome to the Admin Portal. You have permission to create, edit, delete sports records, manage tournament stadiums, and moderate fan match discussions.",
  "hero.browseSports": "Browse Sports",
  "hero.venues": "Venues & Arenas",
  "hero.favorites": "Favorites",
  "hero.signIn": "Sign In",
  "hero.createContent": "+ Create Content",
  "hero.stats.sports": "Sports Disciplines",
  "hero.stats.events": "Match Arenas",
  "hero.stats.categories": "Categories",
  "hero.stats.favorites": "Favorited Items",

  // Categories
  "cat.all": "ALL DISCIPLINES",

  // Sports Catalog
  "sports.tag": "National Catalog",
  "sports.title": "Sports & Highlights",
  "sports.subtitle": "Click any card to read full details, story, and explore related sports",
  "sports.searchPlaceholder": "Search sports or athletes...",
  "sports.resetFilters": "Reset Filters",
  "sports.viewDetails": "View Details",
  "sports.addToFav": "Add to Favorites",
  "sports.savedToFav": "Saved to Favorites",
  "sports.related": "Explore Other Sports Cards",
  "sports.clickSwitch": "Click to switch card",
  "sports.noFound": "No sports found matching your search.",
  "sports.close": "Close",

  // Venues & Arenas
  "venues.tag": "Match Venues & Arenas",
  "venues.title": "Stadiums, Grounds & Events",
  "venues.subtitle": "Click any arena card to view full venue specs, GPS map navigation, live fan discussion, and explore related venues",
  "venues.maps": "Maps",
  "venues.openInMaps": "Open in Maps",
  "venues.discussion": "Discussion",
  "venues.commentsTitle": "Fan Community Discussion",
  "venues.liveFeedback": "Live Match Feedback",
  "venues.noComments": "No fan comments yet",
  "venues.beFirst": "Be the first supporter to leave a note about this arena!",
  "venues.post": "Post",
  "venues.posting": "Posting...",
  "venues.placeholderComment": "Share match thoughts or venue tips...",
  "venues.related": "Explore Other Venues & Arenas",
  "venues.clickSwitch": "Click any card to switch view",
  "venues.overview": "Venue & Tournament Overview",
  "venues.noVenues": "No events found for this discipline.",
  "venues.edit": "Edit Venue",
  "venues.delete": "Delete Venue",

  // About Page
  "about.badge": "Our Vision & Legacy",
  "about.title": "Empowering Cambodian Sports to the World",
  "about.subtitle": "SportHub connects passionate athletes, national tournament stadiums, and loyal supporters with real-time API intelligence.",
  "about.missionTitle": "The Mission",
  "about.missionDesc": "To preserve ancestral sporting legacies such as Kun Khmer and Bokator while providing cutting-edge digital infrastructure for contemporary football and marathon disciplines.",
  "about.pillarsTitle": "Four Pillars of Excellence",
  "about.stadiumsTitle": "Host of World-Class Arenas",

  // Footer
  "footer.brandTagline": "Cambodia's premier digital sports platform uniting national athletes, international arenas, and passionate fan communities.",
  "footer.quickLinks": "Quick Navigation",
  "footer.disciplines": "Disciplines",
  "footer.contact": "Phnom Penh Headquarters",
  "footer.newsletterTitle": "Get Match Alerts & Highlights",
  "footer.newsletterDesc": "Subscribe for weekly national league updates, Kun Khmer title fights, and ticket releases.",
  "footer.newsletterPlaceholder": "Enter your email address...",
  "footer.newsletterBtn": "Subscribe",
  "footer.newsletterSuccess": "Thank you for subscribing to national match alerts!",
  "footer.copyright": "SportHub Cambodia. All rights reserved.",
  "footer.memberSignIn": "Member Sign In",
};

const kmTranslations: Translations = {
  // Navigation
  "nav.home": "ទំព័រដើម",
  "nav.sports": "កីឡាជាតិ",
  "nav.venues": "ពហុកីឡដ្ឋាន",
  "nav.about": "អំពីយើង",
  "nav.signIn": "ចូលគណនី",
  "nav.register": "ចុះឈ្មោះ",
  "nav.adminConsole": "ផ្ទាំងគ្រប់គ្រង",
  "nav.signOut": "ចាកចេញ",
  "nav.themeLight": "ពន្លឺ",
  "nav.themeDark": "ងងឹត",
  "nav.langSwitch": "English",

  // Spring I/O Inspired Pass Banner
  "pass.tag": "កម្ពុជា ២០២៦ • រដូវកាលកីឡាជាតិ និងជើងឯក",
  "pass.dates": "១៣ - ១៥ មេសា · ២០២៦",
  "pass.city": "រាជធានីភ្នំពេញ",
  "pass.venue": "ពហុកីឡដ្ឋានជាតិមរតកតេជោ",
  "pass.title": "សំបុត្រចូលទស្សនាការប្រកួតកម្រិតកំពូល",
  "pass.desc": "ចូលរួមទស្សនាការប្រកួតបាល់ទាត់ជាតិ ការប្រកួតគុនខ្មែរដណ្តើមខ្សែក្រវាត់ និងក្បាច់គុនបុរាណផ្ទាល់នៅគ្រប់ពហុកីឡដ្ឋានជាតិ។",
  "pass.cta": "មើលកាលវិភាគប្រកួត",
  "pass.secondaryCta": "ផែនទី GPS ទីលាន",
  "pass.pillLive": "ទិន្នន័យផ្ទាល់ពី API",
  "pass.pillEdition": "រដូវកាល ២០២៦",

  // Hero Section
  "hero.badge": "វេទិកាកីឡាជាតិ និងសហគមន៍អ្នកគាំទ្រ",
  "hero.adminBadge": "ទម្រង់អ្នកគ្រប់គ្រង • សិទ្ធិគ្រប់គ្រងពេញលេញ",
  "hero.sync": "ទិន្នន័យផ្ទាល់ពី API",
  "hero.title1": "កីឡាជាតិ ការប្រកួត និង",
  "hero.titleHighlight": "ពហុកីឡដ្ឋាន",
  "hero.desc": "ស្វែងរកព័ត៌មានកីឡាជាតិ កាលវិភាគប្រកួតផ្លូវការ ទីលានប្រកួត និងចូលរួមពិភាក្សាជាមួយអ្នកគាំទ្រទូទាំងប្រទេស។ រក្សាទុកកីឡាដែលអ្នកពេញចិត្តបានយ៉ាងងាយស្រួល។",
  "hero.adminDesc": "សូមស្វាគមន៍មកកាន់ផ្ទាំងអ្នកគ្រប់គ្រង។ លោកអ្នកមានសិទ្ធិបង្កើត កែប្រែ លុបព័ត៌មានកីឡា គ្រប់គ្រងទីលានប្រកួត និងសម្របសម្រួលការពិភាក្សា។",
  "hero.browseSports": "ស្វែងរកកីឡា",
  "hero.venues": "ពហុកីឡដ្ឋាន",
  "hero.favorites": "កីឡាពេញចិត្ត",
  "hero.signIn": "ចូលគណនី",
  "hero.createContent": "+ បង្កើតមាតិកា",
  "hero.stats.sports": "ប្រភេទកីឡាជាតិ",
  "hero.stats.events": "ពហុកីឡដ្ឋាន",
  "hero.stats.categories": "ចំណាត់ថ្នាក់",
  "hero.stats.favorites": "បានរក្សាទុក",

  // Categories
  "cat.all": "គ្រប់ប្រភេទកីឡា",

  // Sports Catalog
  "sports.tag": "កាតាឡុកកីឡាជាតិ",
  "sports.title": "កីឡាជាតិ និងការប្រកួតលេចធ្លោ",
  "sports.subtitle": "ចុចលើកាតនីមួយៗ ដើម្បីអានព័ត៌មានលម្អិត រឿងរ៉ាវ និងប្តូរមើលកាតកីឡាផ្សេងទៀត",
  "sports.searchPlaceholder": "ស្វែងរកកីឡា ឬអត្តពលិក...",
  "sports.resetFilters": "កំណត់ឡើងវិញ",
  "sports.viewDetails": "មើលលម្អិត",
  "sports.addToFav": "រក្សាទុកក្នុងបញ្ជីពេញចិត្ត",
  "sports.savedToFav": "បានរក្សាទុកក្នុងបញ្ជី",
  "sports.related": "ស្វែងរកកាតកីឡាផ្សេងទៀត",
  "sports.clickSwitch": "ចុចដើម្បីប្តូរកាត",
  "sports.noFound": "មិនមានកីឡាត្រូវគ្នានឹងការស្វែងរកឡើយ។",
  "sports.close": "បិទ",

  // Venues & Arenas
  "venues.tag": "ពហុកីឡដ្ឋាន និងទីលានប្រកួត",
  "venues.title": "ពហុកីឡដ្ឋាន ទីលាន និងព្រឹត្តិការណ៍",
  "venues.subtitle": "ចុចលើកាតពហុកីឡដ្ឋាននីមួយៗ ដើម្បីមើលព័ត៌មានលម្អិត ផែនទី GPS និងការពិភាក្សាផ្ទាល់ពីអ្នកគាំទ្រ",
  "venues.maps": "ផែនទី",
  "venues.openInMaps": "បើកក្នុងផែនទី Google",
  "venues.discussion": "ការពិភាក្សា",
  "venues.commentsTitle": "ការពិភាក្សាសហគមន៍អ្នកគាំទ្រ",
  "venues.liveFeedback": "មតិយោបល់ការប្រកួតផ្ទាល់",
  "venues.noComments": "មិនទាន់មានមតិយោបល់នៅឡើយទេ",
  "venues.beFirst": "សូមក្លាយជាអ្នកគាំទ្រដំបូងគេដែលបញ្ចេញមតិយោបល់អំពីទីលាននេះ!",
  "venues.post": "ផ្ញើមតិ",
  "venues.posting": "កំពុងផ្ញើ...",
  "venues.placeholderComment": "ចែករំលែកមតិយោបល់ ឬគន្លឹះទាក់ទងនឹងការប្រកួត...",
  "venues.related": "ស្វែងរកពហុកីឡដ្ឋានផ្សេងទៀត",
  "venues.clickSwitch": "ចុចលើកាតដើម្បីប្តូរទិដ្ឋភាព",
  "venues.overview": "ព័ត៌មានលម្អិតអំពីពហុកីឡដ្ឋាន",
  "venues.noVenues": "មិនមានព្រឹត្តិការណ៍សម្រាប់កីឡានេះឡើយ។",
  "venues.edit": "កែសម្រួលទីលាន",
  "venues.delete": "លុបទីលាន",

  // About Page
  "about.badge": "ចក្ខុវិស័យ និងកេរ្តិ៍ដំណែល",
  "about.title": "លើកកម្ពស់កីឡាកម្ពុជាទៅកាន់ពិភពលោក",
  "about.subtitle": "SportHub តភ្ជាប់អត្តពលិកឆ្នើម ពហុកីឡដ្ឋានជាតិ និងអ្នកគាំទ្រយ៉ាងស្និទ្ធស្នាល ជាមួយនឹងបច្ចេកវិទ្យា API ទំនើប។",
  "about.missionTitle": "បេសកកម្មរបស់យើង",
  "about.missionDesc": "ថែរក្សា និងផ្សព្វផ្សាយក្បាច់គុនដូនតា ដូចជា គុនខ្មែរ និងល្បុក្កតោ ព្រមទាំងផ្តល់នូវប្រព័ន្ធឌីជីថលកម្រិតខ្ពស់សម្រាប់បាល់ទាត់ជាតិ និងអត្តពលកម្មទំនើប។",
  "about.pillarsTitle": "សសរស្តម្ភទាំងបួននៃឧត្តមភាព",
  "about.stadiumsTitle": "ពហុកីឡដ្ឋានស្តង់ដារអន្តរជាតិ",

  // Footer
  "footer.brandTagline": "វេទិកាកីឡាឌីជីថលឈានមុខគេនៅកម្ពុជា ដែលតភ្ជាប់អត្តពលិកជាតិ ទីលានប្រកួត និងសហគមន៍អ្នកគាំទ្រយ៉ាងស្អិតរមួត។",
  "footer.quickLinks": "តំណភ្ជាប់រហ័ស",
  "footer.disciplines": "ប្រភេទកីឡាពេញនិយម",
  "footer.contact": "ទីស្នាក់ការកណ្តាល រាជធានីភ្នំពេញ",
  "footer.newsletterTitle": "ទទួលព័ត៌មាន និងការប្រកួតថ្មីៗ",
  "footer.newsletterDesc": "ជាវព្រឹត្តិបត្រព័ត៌មានដើម្បីទទួលបានព័ត៌មានលីគជាតិ ការប្រកួតគុនខ្មែរ និងសំបុត្រប្រកួតមុនគេ។",
  "footer.newsletterPlaceholder": "បញ្ចូលអាសយដ្ឋានអ៊ីមែលរបស់អ្នក...",
  "footer.newsletterBtn": "ជាវឥឡូវនេះ",
  "footer.newsletterSuccess": "សូមអរគុណចំពោះការជាវព្រឹត្តិបត្រព័ត៌មានកីឡាជាតិ!",
  "footer.copyright": "SportHub កម្ពុជា។ រក្សាសិទ្ធិគ្រប់យ៉ាង។",
  "footer.memberSignIn": "ចូលគណនីសមាជិក",
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  isKhmer: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("sporthub_lang") as Language | null;
    if (saved === "km" || saved === "en") {
      setLanguageState(saved);
      applyLanguage(saved);
    }
  }, []);

  const applyLanguage = (lang: Language) => {
    const root = document.documentElement;
    root.lang = lang;
    root.setAttribute("data-lang", lang);
    if (lang === "km") {
      document.body.classList.add("font-battambang");
    } else {
      document.body.classList.remove("font-battambang");
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("sporthub_lang", lang);
    applyLanguage(lang);
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "en" ? "km" : "en";
    setLanguage(nextLang);
  };

  const t = (key: string, fallback?: string): string => {
    const dict = language === "km" ? kmTranslations : enTranslations;
    if (dict[key]) return dict[key];
    if (enTranslations[key]) return enTranslations[key];
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isKhmer: language === "km",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
