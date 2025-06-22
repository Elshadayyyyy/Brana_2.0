import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <div className="d-flex align-items-center">
      <label className="me-2 text-white">{t("language")}:</label>
      <select
        className="form-select bg-dark text-white border-light w-auto"
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        defaultValue={i18n.language}
      >
        <option value="en">English</option>
        <option value="am">አማርኛ</option>
      </select>
    </div>
  );
}
