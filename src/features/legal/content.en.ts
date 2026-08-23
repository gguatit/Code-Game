import type { LegalDoc } from "./legal-doc";

export const termsDoc: LegalDoc = {
  title: "Terms of Service",
  effective: "Effective: August 23, 2026",
  blocks: [
    {
      h: "Article 1 (Purpose)",
      ps: [
        "These terms define the conditions and procedures for using CoffeeToCode (the \"Service\"), and the rights, obligations, and responsibilities of users and the operator.",
      ],
    },
    {
      h: "Article 2 (Definition of the Service)",
      ps: [
        "The \"Service\" is an online typing-practice web game that measures typing speed (WPM) and accuracy against code written in various programming languages.",
      ],
    },
    {
      h: "Article 3 (Use of the Service)",
      ul: [
        "The Service is provided free of charge; the practice features are available without an account.",
        "An account is required to save records to the leaderboard.",
      ],
    },
    {
      h: "Article 4 (Sign-up)",
      ps: [
        "Signing up requires an email address, a nickname, and a password. By signing up, you warrant that the information you provide is accurate, and you are deemed to agree that it will be processed in accordance with the {{privacy}}.",
      ],
    },
    {
      h: "Article 5 (Prohibited Conduct)",
      ul: [
        "Creating abnormal records using macros or automation tools",
        "Using or compromising another person's account without authorization",
        "Interfering with the normal operation of the Service",
      ],
    },
    {
      h: "Article 6 (Record Management)",
      ps: [
        "Records judged to have been created abnormally (violations of Article 5) may be deleted without prior notice.",
      ],
    },
    {
      h: "Article 7 (Changes and Discontinuation)",
      ps: [
        "The Service is run as a personal project. Part or all of the Service may be changed or discontinued without prior notice as operationally required.",
      ],
    },
    {
      h: "Article 8 (Disclaimer)",
      ps: [
        "The Service is provided free of charge. The operator is not liable for damages arising from the use of the Service absent willful misconduct or gross negligence.",
      ],
    },
    {
      h: "Article 9 (Governing Law)",
      ps: ["These terms are interpreted in accordance with the laws of the Republic of Korea."],
    },
    { h: "Article 10 (Contact)", ps: ["For inquiries about the Service, please use {{issues}}."] },
  ],
};

export const privacyDoc: LegalDoc = {
  title: "Privacy Policy",
  effective: "Effective: August 23, 2026",
  intro:
    "CoffeeToCode (the \"Service\") values your privacy and complies with applicable privacy laws, including the Personal Information Protection Act. This policy explains what information the Service collects and how it is used.",
  blocks: [
    {
      h: "1. Information We Collect",
      ul: [
        "**Email address** — at sign-up and login",
        "**Nickname** — at sign-up (displayed on the leaderboard)",
        "**Game records** — WPM, accuracy, and duration per language and category",
        "**Session cookie** — to keep you logged in",
      ],
      ps: [
        "No account information is collected from guests. A guest's personal best records are never sent to the server and are stored only in the browser (localStorage).",
      ],
    },
    {
      h: "2. How We Collect",
      ps: ["Information is collected only through sign-up/login forms and automatic saving of game results."],
    },
    {
      h: "3. Purpose of Use",
      ul: [
        "Identifying members and keeping them logged in",
        "Displaying nicknames and records on the leaderboard",
        "Operating the Service and providing records",
      ],
    },
    {
      h: "4. Retention Period",
      ul: [
        "Account information and game records: until account deletion or a deletion request",
        "Session cookie: up to 30 days after issuance",
      ],
    },
    {
      h: "5. Third Parties",
      ps: [
        "We do not sell personal data or share it for advertising. To operate the Service, data is stored on Cloudflare, Inc. infrastructure (hosting and database), which is governed by Cloudflare's own privacy policy.",
      ],
    },
    {
      h: "6. Cookies",
      ps: [
        "The Service uses exactly one essential cookie (session) to keep you logged in. No advertising, tracking, or analytics cookies are used.",
      ],
    },
    {
      h: "7. Your Rights",
      ps: [
        "You may request access, correction, deletion of your personal data, and account deletion at any time. Upon account deletion, your account information (email and nickname) and all stored game records are deleted immediately.",
      ],
    },
    { h: "8. Contact", ps: ["For privacy inquiries, please leave a message at {{issues}}."] },
    {
      h: "9. Changes to This Policy",
      ps: [
        "If this policy changes, we will announce it on the Service. The changed policy takes effect on the day it is announced.",
      ],
    },
  ],
  tail: "The {{terms}} also apply to this Service.",
};
