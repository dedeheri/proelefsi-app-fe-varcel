import { useTranslation } from "react-i18next";
import {
  Container,
  General,
  LanguageAndTheme,
  History,
} from "../../../components";

function Setting() {
  const { t } = useTranslation();

  return (
    <Container title={t("SETTING.TITLE")}>
      <div className="max-w-2xl mx-auto mt-10 md:mt-16 lg:mt-24 px-4 space-y-4 md:space-y-6 lg:space-y-8">
        {/* general */}
        <General />
        {/* language */}
        <LanguageAndTheme />
        {/* history */}
        <History />
      </div>
    </Container>
  );
}

export default Setting;
