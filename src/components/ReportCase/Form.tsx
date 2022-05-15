import React, { Fragment, useEffect, useState } from "react";
import "../../css/ReportCase.css";
import COVIDTest from "./COVIDTest";
import Symptoms from "./Symptoms";
import AttendedSchool from "./ExtraInfo";
import axios from "axios";
import Swal from "sweetalert2";

const displayWarningMessage = (message: string) => {
  Swal.fire({
    title: message,
    icon: "warning",
    confirmButtonText: "Aceptar",
  });
};

const displayErrorMessage = (message: string) => {
  Swal.fire({
    title: message,
    icon: "error",
    confirmButtonText: "Aceptar",
  });
};

const displayLoadingMessage = (message: string) => {
  Swal.fire({
    title: message,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export default function ReportCase({ sessionState }: Form) {
  const [session, setSession] = sessionState;
  if (!session) {
    window.location.href = "/";
  }

  //* States
  const [selection, setSelection] = useState<Lesson[]>([]);
  const [schedule, setSchedule] = useState<Lesson[]>([]);
  const [hasTestPhoto, setHasTestPhoto] = useState<undefined | boolean>(undefined);
  const [attendedSchool, setAttendedSchool] = useState<undefined | boolean>(undefined);
  const [sinceDay, setSinceDay] = useState<undefined | Date>(undefined);
  const [testPhoto, setTestPhoto] = useState<undefined | File>(undefined);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [scheduleReady, setScheduleReady] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    displayLoadingMessage("Cargando");
    axios
      .post(
        "https://kanan.azurewebsites.net/api/GetSchedule?code=bftrXd5GT2AhcLrfW5Rxd-HuXSyY7O5ddpLEM7mvRaIjAzFuHrLjew==",
        {
          studentID: session,
        }
      )
      .then((response) => {
        Swal.close();
        if (response.data === "Not found") {
          displayErrorMessage("No se pudo cargar el horario");
          setScheduleReady(false);
        } else {
          response.data.forEach(({ days }) => days.forEach((day) => (day.isSelected = false)));
          setSchedule(response.data);
          setScheduleReady(true);
        }
      })
      .catch((error) => {
        displayErrorMessage("No se pudo cargar el horario. Inténtelo más tarde");
        console.error(error);
        setScheduleReady(false);
      });
  }, []);

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const sendForm = async () => {
    if (hasTestPhoto === undefined) {
      displayWarningMessage("Indique si ha presentado alguna prueba COVID");
      return;
    }
    if (hasTestPhoto && !testPhoto) {
      displayWarningMessage("Agregue la foto de la prueba COVID");
      return;
    }
    if (!sinceDay) {
      displayWarningMessage("Indique desde qué día empezó a tener síntomas");
      return;
    }
    const selectedSymptoms = symptoms.filter((symptom) => symptom.checked);
    if (selectedSymptoms.length <= 0) {
      displayWarningMessage("Seleccione cuáles síntomas ha presentado");
      return;
    }
    if (attendedSchool === undefined) {
      displayWarningMessage("Indique si se ha presentado a clases presenciales");
      return;
    }
    const selectedLessons: selectedLesson[] = [];
    if (attendedSchool) {
      selection.forEach(({ _id, days }) => {
        const selectedDays = days.filter(({ isSelected }) => isSelected);
        if (selectedDays.length > 0) {
          selectedLessons.push({ _id, days: selectedDays });
        }
      });
      if (selectedLessons.length <= 0) {
        displayWarningMessage("Seleccione las clases a las que asistió desde empezó a tener síntomas");
        return;
      }
    }
    displayLoadingMessage("Enviando reporte");
    const testPhotoBase64 = hasTestPhoto ? await toBase64(testPhoto!) : "";
    const data = {
      studentID: session,
      hasTestPhoto,
      testPhoto: testPhotoBase64,
      sinceDay,
      symptoms: selectedSymptoms,
      attendedSchool,
      lessonsAttended: selectedLessons,
    };
    axios
      .post("https://kanan.azurewebsites.net/api/CreateReport?code=FOunNyyE-DzMzEUAs3Sjy7OVh2XpuoqFqEyX28bmIE0FAzFuGrx7wg==", data)
      .then((response) => {
        Swal.close();
        Swal.fire({
          title: "Reporte Enviado",
          icon: "success",
          confirmButtonText: "Aceptar",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/"
          }
        });
      })
      .catch((error) => {
        displayErrorMessage("No se pudo enviar el reporte. Inténtelo más tarde");
        console.error(error);
      });
  };
  if (scheduleReady === undefined) {
    return <Fragment />;
  } else if (scheduleReady) {
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
              sinceDayState={sinceDay}
              attendedSchoolState={[attendedSchool, setAttendedSchool]}
              selectionState={[selection, setSelection]}
              schedule={schedule}
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
  } else {
    return (
      <div className="px-5 bg-gray-100 flex-auto">
        <h2 className="py-8 text-2xl font-semibold text-center">No se pudo obtener el horario</h2>
      </div>
    );
  }
}
