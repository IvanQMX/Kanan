import React, { Fragment, useState } from "react";

export default function COVIDTest({ hasTestPhotoState, testPhotoState }: COVIDTest) {
  const [hasTestPhoto, setHasTestPhoto] = hasTestPhotoState;
  const [testPhoto, setTestPhoto] = testPhotoState;
  const [testPhotoURL, setTestPhotoURL] = useState<string|undefined>(undefined);

  const addTestPhoto = (files: FileList | null) => {
    //TODO: PNG,JPG Validation
    if (files) {
      setTestPhoto(files[0]);
      setTestPhotoURL(URL.createObjectURL(files[0]))
    } else {
      setTestPhoto(undefined);
      setTestPhotoURL(undefined)
    }
  };

  const removeTestPhoto = () => {
    if(testPhotoURL){
      URL.revokeObjectURL(testPhotoURL)
    }
      setTestPhoto(undefined);
      setTestPhotoURL(undefined)
  };

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <fieldset>
            <div>
              <legend className="text-base font-medium text-gray-900">
                ¿Ha presentado alguna prueba COVID?
              </legend>
              <p className="text-sm text-gray-500">Prueba de Antígenos o PCR.</p>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input
                  id="yes-test"
                  name="covid-test"
                  type="radio"
                  className="radio-button"
                  checked={hasTestPhoto === undefined ? false : hasTestPhoto}
                  onChange={() => setHasTestPhoto(true)}
                />
                <label htmlFor="yes-test" className="ml-3 block text-sm font-medium text-gray-700">
                  Sí
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="no-test"
                  name="covid-test"
                  type="radio"
                  className="radio-button"
                  checked={hasTestPhoto === undefined ? false : !hasTestPhoto}
                  onChange={() => setHasTestPhoto(false)}
                />
                <label htmlFor="no-test" className="ml-3 block text-sm font-medium text-gray-700">
                  No
                </label>
              </div>
            </div>
          </fieldset>
          {hasTestPhoto ? (
            <div>
              <div>
                <legend className="text-base font-medium text-gray-900">Foto de la prueba</legend>
                <p className="text-sm text-gray-500">Anexe una foto visible con los resultados de la prueba.</p>
              </div>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {!testPhoto ? (
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="text-sm text-gray-600">
                      <label
                        htmlFor="test-photo"
                        className="relative cursor-pointer bg-white rounded-md font-semibold text-indigo-600 hover:text-indigo-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Subir archivo</span>
                        <input
                          id="test-photo"
                          name="test-photo"
                          type="file"
                          onChange={(e) => addTestPhoto(e.target.files)}
                          className="sr-only"
                          accept=".png,.jpg"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG o JPG hasta 10MB</p>
                  </div>
                ) : (
                  <div className="flex flex-1 flex-col items-center">
                    <img src={testPhotoURL} className="w-40 sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg" alt="Foto de prueba"/>
                    <button className="mt-2 px-2 py-1 cursor-pointer bg-indigo-600 rounded-md font-semibold text-white hover:bg-indigo-700 focus-within:outline-none" onClick={removeTestPhoto}>Remover foto</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Fragment />
          )}
        </div>
      </div>
    </div>
  );
}
