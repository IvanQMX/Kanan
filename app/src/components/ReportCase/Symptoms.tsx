import React, { ChangeEvent, useEffect } from "react";
import SymptomCheckbox from "./SymptomCheckbox";

const SYMPTOMS: Symptom[] = [
  { name: "Fiebre" },
  { name: "Tos" },
  { name: "Cansancio" },
  { name: "Pérdida del gusto o del olfato" },
  { name: "Dolor de garganta" },
  { name: "Dolor de cabeza" },
  { name: "Molestias y dolores" },
  { name: "Diarrea" },
  { name: "Erupción cutánea o pérdida del color de los dedos de las manos o los pies" },
  { name: "Ojos rojos o irritados" },
  { name: "Dificultad para respirar o disnea" },
  { name: "Pérdida de movilidad o del habla o sensación de confusión" },
  { name: "Dolor en el pecho" },
];

const formatDate = (date: Date | undefined) => {
  if (date) {
    return date
      .toLocaleDateString("es-mx", { day: "2-digit", month: "2-digit", year: "numeric" })
      .split("/")
      .reverse()
      .join("-");
  } else {
    return "";
  }
};

export default function Symptoms({ sinceDayState, symptomsState }: Symptoms) {
  const [sinceDay, setSinceDay] = sinceDayState;
  const [symptoms, setSymptoms] = symptomsState;

  useEffect(() => {
    setSymptoms([...SYMPTOMS]);
  }, []);

  const now = new Date();
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
  const maxDate = formatDate(now);
  const minDate = formatDate(oneWeekAgo);

  const changeSinceDay = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const dateValues = e.target.value.split("-").map((value) => parseInt(value));
      const date = new Date(dateValues[0], dateValues[1] - 1, dateValues[2]);
      setSinceDay(date);
    } else {
      setSinceDay(undefined);
    }
  };

  const updateSymptoms = (index) => {
    setSymptoms(
      symptoms.map((symptom, currentIndex) =>
        currentIndex === index ? { ...symptom, checked: !symptom.checked } : symptom
      )
    );
  };

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <div className="shadow sm:rounded-md">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <div>
              <legend className="text-base font-medium text-gray-900">Día desde que presentó síntomas</legend>
              <p className="text-sm text-gray-500">Seleccione el día desde que presentó el primer síntoma.</p>
            </div>
            <div className="mt-4">
              <input
                value={formatDate(sinceDay)}
                onChange={(e) => changeSinceDay(e)}
                type="date"
                max={maxDate}
                min={minDate}
                className="font-medium border border-gray-400 rounded px-3 py-1 bg-gray-50 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div>
            <div>
              <legend className="text-base font-medium text-gray-900">Síntomas presentados</legend>
              <p className="text-sm text-gray-500">
                Seleccione cuáles de los siguientes síntomas ha presentado.
              </p>
            </div>
            <div className="mt-4 space-y-4">
              {symptoms.map((symptom, index) => (
                <SymptomCheckbox
                  key={index}
                  isChecked={symptom.checked}
                  checkHandler={() => updateSymptoms(index)}
                  label={symptom.name}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
