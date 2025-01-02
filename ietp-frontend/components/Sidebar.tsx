"use client";

import React, { useState } from "react";
import { FaBars, FaTimes, FaBusAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "../i18n"; // Import the i18n configuration

const Sidebar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "am" : "en";
    i18n.changeLanguage(newLang);
  };

  const busStations = [
    { name: t("sidebar.megenagna"), eta: "60 " + t("sidebar.min") },
    { name: t("sidebar.gerji"), eta: "55 " + t("sidebar.min") },
    { name: t("sidebar.mebrathail"), eta: "50 " + t("sidebar.min") },
    { name: t("sidebar.jackros"), eta: "45 " + t("sidebar.min") },
    { name: t("sidebar.goro"), eta: "40 " + t("sidebar.min") },
    { name: t("sidebar.ict"), eta: "35 " + t("sidebar.min") },
    { name: t("sidebar.hot"), eta: "30 " + t("sidebar.min") },
    { name: t("sidebar.gojo"), eta: "25 " + t("sidebar.min") },
    { name: t("sidebar.koye16"), eta: "20 " + t("sidebar.min") },
    { name: t("sidebar.koye"), eta: "15 " + t("sidebar.min") },
    { name: t("sidebar.aastu"), eta: "10 " + t("sidebar.min") },
    { name: t("sidebar.tulu"), eta: "5 " + t("sidebar.min") },
  ];

  return (
    <div className="absolute top-0 left-0 z-10 h-full">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-5 left-5 z-50 text-gray-700 hover:text-gray-900"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FaTimes size={24} color="white" /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-72 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="flex justify-between items-center p-4 mt-12 border-b border-gray-600">
          <h2 className="text-xl font-bold">{t("sidebar.title")}</h2>
        </div>
        <div className="p-4">
          <button
            onClick={toggleLanguage}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md w-full text-center"
          >
            {t("sidebar.toggle")}
          </button>
        </div>
        <ul className="mt-4 space-y-4 px-6 overflow-y-auto pb-24 h-[calc(100vh-10rem)]">
          {busStations.map((station, index) => (
            <li
              key={index}
              className="flex items-center gap-4 hover:bg-gray-700 rounded-md p-3 cursor-pointer"
            >
              <div>
                <FaBusAlt size={24} />
              </div>
              <div>
                <p className="font-bold">
                  {t("sidebar.station")} {index + 1}: {station.name}
                </p>
                <p className="text-sm text-gray-300">
                  {t("sidebar.eta")}: {station.eta}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
