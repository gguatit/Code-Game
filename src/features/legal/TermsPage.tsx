import { useT } from "@/app/locale";
import { LegalDocView } from "./legal-doc";
import { TERMS_DOCS } from "./content";

export function TermsPage() {
  const { locale } = useT();
  return <LegalDocView doc={TERMS_DOCS[locale]} />;
}
