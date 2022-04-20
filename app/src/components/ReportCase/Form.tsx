import React, { useState } from "react";
import "../../css/ReportCase.css";
import COVIDTest from "./COVIDTest";
import Symptoms from "./Symptoms";
import AttendedSchool from "./ExtraInfo";
import Swal from "sweetalert2";

const displayWarningMessage = (message: string) => {
  Swal.fire({
    title: message,
    icon: "warning",
    confirmButtonText: "Aceptar",
  });
};

export default function ReportCase() {
  if (!sessionStorage.getItem("studentID")) {
    window.location.href = "/";
  }

  //* States
  const [selection, setSelection] = useState<Lesson[]>([]);
  const [hasTestPhoto, setHasTestPhoto] = useState<undefined | boolean>(undefined);
  const [attendedSchool, setAttendedSchool] = useState<undefined | boolean>(undefined);
  const [sinceDay, setSinceDay] = useState<undefined | Date>(undefined);
  const [testPhoto, setTestPhoto] = useState<undefined | File>(undefined);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);

  //? Simulation
  const schedule: any = [
    {
      group: "3CM19",
      subject: "Aplicaciones para comunicaciones en red",
      days: [
        { dayIndex: 0, time: "7:00-8:30" },
        { dayIndex: 1, time: "" },
        { dayIndex: 2, time: "" },
        { dayIndex: 3, time: "7:00-8:30" },
        { dayIndex: 4, time: "8:30-10:00" },
      ],
    },
    {
      group: "3CM11",
      subject: "Análisis de algoritmos",
      days: [
        { dayIndex: 0, time: "10:30-12:00" },
        { dayIndex: 1, time: "" },
        { dayIndex: 2, time: "8:30-10:00" },
        { dayIndex: 3, time: "10:30-12:00" },
        { dayIndex: 4, time: "" },
      ],
    },
  ];
  schedule.forEach(({ days }) => days.forEach((day) => (day.isSelected = false)));

  const sendForm = () => {
    if (hasTestPhoto === undefined) {
      displayWarningMessage("Indique si ha presentado alguna prueba COVID");
    } else if (hasTestPhoto && !testPhoto) {
      displayWarningMessage("Agregue la foto de la prueba COVID");
    } else if (!sinceDay) {
      displayWarningMessage("Indique desde qué día empezó a tener síntomas");
    } else if (attendedSchool === undefined) {
      displayWarningMessage("Indique si se ha presentado a clases presenciales");
    } else {
      const selectedSymptoms = symptoms.filter((symptom) => symptom.checked);
      if (selectedSymptoms.length <= 0) {
        displayWarningMessage("Seleccione cuáles síntomas ha presentado");
      } else {
        if (attendedSchool) {
          const selectedLessons: Lesson[] = [];
          selection.forEach(({ group, subject, days }) => {
            const selectedDays = days.filter(({ isSelected }) => isSelected);
            if (selectedDays.length > 0) {
              selectedLessons.push({ group, subject, days: selectedDays });
            }
          });
          if (selectedLessons.length <= 0) {
            displayWarningMessage("Seleccione las clases a las que asistió desde empezó a tener síntomas");
          } else {
            console.table(selectedLessons);
          }
        } else {
          console.log("Sí");
        }
      }
    }
  };

  return (
    <div className="px-5 bg-gray-100 flex-auto">
      <h2 className="mt-6 text-3xl font-semibold text-center mb-3">Reportar caso</h2>
      <h2 className="mt-3 text-xl text-center mb-3">Reportarme como alumno infectado por COVID-19</h2>

      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 lg:text-xl lg:leading-10 text-gray-900">
                Prueba COVID
              </h3>
            </div>
          </div>
          <COVIDTest
            hasTestPhotoState={[hasTestPhoto, setHasTestPhoto]}
            testPhotoState={[testPhoto, setTestPhoto]}
          />
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 lg:text-xl lg:leading-10 text-gray-900">
                Síntomas
              </h3>
            </div>
          </div>
          <Symptoms sinceDayState={[sinceDay, setSinceDay]} symptomsState={[symptoms, setSymptoms]} />
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 lg:text-xl lg:leading-10 text-gray-900">
                Información Adicional
              </h3>
            </div>
          </div>
          <AttendedSchool
            schedule={schedule}
            sinceDayState={sinceDay}
            attendedSchoolState={[attendedSchool, setAttendedSchool]}
            selectionState={[selection, setSelection]}
          />
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="px-4 pb-4 text-center sm:px-6">
        <button
          type="button"
          onClick={sendForm}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
