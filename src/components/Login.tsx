import React, { useState } from "react";
import { LockClosedIcon, AcademicCapIcon } from "@heroicons/react/solid";
import axios from "axios";

export default function Login({ sessionState }: Login) {
  const [session, setSession] = sessionState;
  if (session) {
    window.location.href = "/";
  }
  const [processingRequest, setProcessingRequest] = useState(false);
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");

  const autenticate = async () => {
    setProcessingRequest(true);
    try {
      const response = await axios.post("/api/Login", {
        studentID,
        password,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    const valid = studentID === "2020630369" && password === "1" ? "Marco" : null;
    if (valid) {
      setSession(studentID);
    }
    setProcessingRequest(false);
  };

  return (
    <div className="flex flex-auto items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-md w-full space-y-8 pb-16">
        <div>
          <AcademicCapIcon className="mx-auto h-14 md:h-24 w-auto text-indigo-600" />
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Acceder a Kanan</h2>
          <p className="mt-2 text-center text-sm text-gray-700">Cuidando nuestra comunidad</p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="student-id" className="sr-only">
                Número de boleta
              </label>
              <input
                id="student-id"
                name="student-id"
                type="text"
                autoComplete="student-id"
                className="bg-gray-50 rounded-none relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-600 text-gray-900 rounded-t-md focus:outline-indigo-600 focus:outline-1 focus:z-10 sm:text-sm"
                placeholder="Número de boleta"
                value={studentID}
                onChange={({ target }) => setStudentID(target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="bg-gray-50 rounded-none relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-600 text-gray-900 rounded-b-md focus:outline-indigo-600 focus:outline-1 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={()=>autenticate()}
              disabled={processingRequest}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
