/* paths.ts */
import "module-alias/register";
import { addAliases } from "module-alias";

const srcDir = `${process.cwd()}/src`;

addAliases({
  "@routes": `${srcDir}/routes`,
  "@models": `${srcDir}/models`,
  "@utils": `${srcDir}/utils`,
});
