import type { Locale } from "@/app/locale";
import type { LegalDoc } from "./legal-doc";
import { privacyDoc as koPrivacy, termsDoc as koTerms } from "./content.ko";
import { privacyDoc as enPrivacy, termsDoc as enTerms } from "./content.en";
import { privacyDoc as jaPrivacy, termsDoc as jaTerms } from "./content.ja";

export const TERMS_DOCS: Record<Locale, LegalDoc> = {
  ko: koTerms,
  en: enTerms,
  ja: jaTerms,
};

export const PRIVACY_DOCS: Record<Locale, LegalDoc> = {
  ko: koPrivacy,
  en: enPrivacy,
  ja: jaPrivacy,
};
