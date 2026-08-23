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

export function SignupPage() {
  const { signup } = useAuth();
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
      setError(err instanceof Error ? err.message : "회원가입에 실패했습니다");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">회원가입</CardTitle>
          <CardDescription>가입하면 기록이 리더보드에 저장됩니다</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="displayName">닉네임</Label>
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
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
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
              가입하기
            </Button>
            <p className="text-xs text-muted-foreground">
              가입하면{" "}
              <Link to="/terms" className="underline underline-offset-4">
                이용약관
              </Link>
              과{" "}
              <Link to="/privacy" className="underline underline-offset-4">
                개인정보 처리방침
              </Link>
              에 동의하는 것으로 간주됩니다.
            </p>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            이미 계정이 있나요?{" "}
            <Link to="/login" className="text-foreground underline underline-offset-4">
              로그인
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
