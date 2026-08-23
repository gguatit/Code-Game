import { useT } from "@/app/locale";
import { LegalDocView } from "./legal-doc";
import { PRIVACY_DOCS } from "./content";

export function PrivacyPage() {
  const { locale } = useT();
  return <LegalDocView doc={PRIVACY_DOCS[locale]} />;
}
