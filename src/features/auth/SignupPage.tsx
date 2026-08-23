import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/app/auth-context";
import { useT } from "@/app/locale";
import { ApiError } from "@/lib/api";

export function SignupPage() {
  const { signup } = useAuth();
  const { t } = useT();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signup(email, password, displayName);
      navigate("/");
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 409
          ? t("auth.emailTaken")
          : t("auth.failSignup")
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t("auth.signupTitle")}</CardTitle>
          <CardDescription>{t("auth.signupDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="displayName">{t("auth.nickname")}</Label>
              <Input
                id="displayName"
                required
                minLength={2}
                maxLength={20}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={submitting}>
              {t("auth.signupBtn")}
            </Button>
            <p className="text-xs text-muted-foreground">
              {t("auth.agreeBefore")}
              <Link to="/terms" className="underline underline-offset-4">
                {t("auth.termsLink")}
              </Link>
              {t("auth.agreeMiddle")}
              <Link to="/privacy" className="underline underline-offset-4">
                {t("auth.privacyLink")}
              </Link>
              {t("auth.agreeAfter")}
            </p>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {t("auth.haveAccount")}{" "}
            <Link to="/login" className="text-foreground underline underline-offset-4">
              {t("auth.loginBtn")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
