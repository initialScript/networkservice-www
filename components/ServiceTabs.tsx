"use client";

import { useState } from "react";

const tabs = [
  {
    id: "activites",
    label: "Activités",
    items: [
      "Vente et réparation de matériels informatique :",
      "Ordinateur de bureaux : HP, Dell, Lenovo, IBM.",
      "Ordinateur portable : HP, Dell, Lenovo, Sony, IBM, Samsung, Toshiba ...",
      "Imprimantes, Photocopieuses : HP, Brother, Canon, Samsung ...",
      "Installation de réseau informatique.",
      "Installation et programmation caisse tactile.",
      "Consommables des Imprimante et photocopieuses.",
    ],
  },
  {
    id: "securite",
    label: "Sécurité",
    items: [
      "Porte Automatiques – Sectionnelles, Vidéo-surveillance, Cameras de surveillance.",
      "Détection incendie – Extinction, Contrôle d’accès – Verrouillage, Système antivol.",
      "Système anti-intrusion. Domotique ...",
    ],
  },
  {
    id: "logiciels",
    label: "Logiciels",
    items: [
      "Logiciel d’hôtellerie IMPERIALTECH PMS",
      "Logiciel de gestion de paie.",
      "Logiciel d’agence de voyages.",
      "Logiciel de gestion de Spa.",
      "Logiciel de gestion de Parapharmacie.",
      "Logiciel de gestion Commerciale.",
      "Logiciel du Pneumatique.",
      "Logiciel de Point de vente : Snack, Restaurant, Bar, ...",
    ],
  },
];

export default function ServicesTabs() {
  const [activeTab, setActiveTab] = useState("activites");

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-4 rounded border transition-all text-2xl font-bold
                  ${
                    active
                      ? "bg-[#2ea0bf] text-white border-[#2ea0bf]"
                      : "bg-white text-[#2ea0bf] border-[#2ea0bf]"
                  }`}
              >
                {tab.label}

                {active && (
                  <span
                    className="absolute left-1/2 top-full -translate-x-1/2
                    w-0 h-0 border-l-[20px] border-r-[20px]
                    border-t-[20px] border-l-transparent
                    border-r-transparent border-t-[#2ea0bf]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-8 rounded border border-[#2ea0bf] bg-white p-10 shadow-sm">
          <ul className="space-y-3 text-[20px] text-gray-700">
            {currentTab?.items.map((item, index) => (
              <li key={index} className="list-disc ml-6">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}