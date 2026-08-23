import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="font-heading text-7xl font-bold text-sky-500">404</p>
      <h1 className="text-xl font-semibold">페이지를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground">
        주소가 잘못되었거나 페이지가 이동되었을 수 있습니다.
      </p>
      <Button asChild>
        <Link to="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
