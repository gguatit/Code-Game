import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import { HomePage } from "@/features/home/HomePage";
import { LangsPage } from "@/features/langs/LangsPage";
import { PlayPage } from "@/features/play/PlayPage";
import { LeaderboardPage } from "@/features/leaderboard/LeaderboardPage";
import { ProfilePage } from "@/features/profile/ProfilePage";
import { LoginPage } from "@/features/auth/LoginPage";
import { SignupPage } from "@/features/auth/SignupPage";
import { PrivacyPage } from "@/features/legal/PrivacyPage";
import { TermsPage } from "@/features/legal/TermsPage";
import { NotFoundPage } from "@/features/not-found/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/langs", element: <LangsPage /> },
      { path: "/play/:lang", element: <PlayPage /> },
      { path: "/leaderboard", element: <LeaderboardPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/privacy", element: <PrivacyPage /> },
      { path: "/terms", element: <TermsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
