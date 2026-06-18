import type { Framework } from "../../types";
import { pasSystemFragment } from "./pas";
import { aidaSystemFragment } from "./aida";
import { babSystemFragment } from "./bab";

export const frameworkFragments: Record<Framework, () => string> = {
  pas: pasSystemFragment,
  aida: aidaSystemFragment,
  bab: babSystemFragment,
};
