import React, { Fragment, useState, useEffect } from "react";

export default function ExtraInfo({
  sinceDayState,
  attendedSchoolState,
  selectionState,
  schedule,
}: ExtraInfo) {
  const [attendedSchool, setAttendedSchool] = attendedSchoolState;
  const [selection, setSelection] = selectionState;
  const sinceDay = sinceDayState;
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const now = new Date();

  //* Load Lessons
  useEffect(() => {
    if (sinceDay && (attendedSchool === undefined || attendedSchool)) {
      const daysOrder: Date[] = [];
      const sinceDayCopy = new Date(sinceDay);
      while (sinceDayCopy.getTime() <= now.getTime()) {
        if (sinceDayCopy.getDay() !== 0 && sinceDayCopy.getDay() !== 6) {
          daysOrder.push(new Date(sinceDayCopy));
        }
        sinceDayCopy.setDate(sinceDayCopy.getDate() + 1);
      }
      const activeWeekDays: string[] = [];
      for (const date of daysOrder) {
        let day = date
          .toLocaleDateString("es-mx", { weekday: "long", month: "long", day: "numeric" })
          .split(" ");
        day[0] = day[0].replace(/^\w/, (c) => c.toUpperCase());
        day[0] = day[0].replace(",", "");
        day[3] = day[3].replace(/^\w/, (c) => c.toUpperCase());
        activeWeekDays.push(day.join(" "));
      }
      const newSelection: Lesson[] = [];
      for (const lesson of schedule) {
        const lessonCopy = { ...lesson };
        const activeLessonDays: LessonDay[] = [];
        for (const date of daysOrder) {
          const day = lessonCopy.days[date.getDay() - 1];
          if (day.time) {
            day.date = date;
          }
          activeLessonDays.push(day);
        }
        lessonCopy.days = [...activeLessonDays];
        newSelection.push(lessonCopy);
      }
      setSelection([...newSelection]);
      setWeekDays([...activeWeekDays]);
    } else {
      setSelection([]);
      setWeekDays([]);
    }
  }, [sinceDay, attendedSchool]);

  const selectLessonDay = (selectedSubject: String, selectedDayIndex: number) => {
    const selectionCopy = [...selection];
    const day = selectionCopy
      .find(({ subject }) => subject === selectedSubject)
      ?.days.find(({ dayIndex }) => dayIndex === selectedDayIndex);
    if (day?.isSelected !== undefined) {
      day.isSelected = !day.isSelected;
    }
    setSelection(selectionCopy);
  };

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <div className="shadow sm:rounded-md">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <div>
              <legend className="text-base font-medium text-gray-900">
                ¿Se ha presentado a clases presenciales?
              </legend>
              <p className="text-sm text-gray-500">
                Indique si ha asistido a la escuela para tomar clases de manera presencial.
              </p>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input
                  id="yes-attended"
                  name="attended-school"
                  type="radio"
                  className="radio-button"
                  checked={attendedSchool === undefined ? false : attendedSchool}
                  onChange={() => setAttendedSchool(true)}
                />
                <label htmlFor="yes-attended" className="ml-3 block text-sm font-medium text-gray-700">
                  Sí
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="no-attended"
                  name="attended-school"
                  type="radio"
                  className="radio-button"
                  checked={attendedSchool === undefined ? false : !attendedSchool}
                  onChange={() => setAttendedSchool(false)}
                />
                <label htmlFor="no-attended" className="ml-3 block text-sm font-medium text-gray-700">
                  No
                </label>
              </div>
            </div>
          </div>
          {sinceDay === undefined || !attendedSchool ? (
            <Fragment />
          ) : (
            <div>
              <div>
                <legend className="text-base font-medium text-gray-900">
                  Clases a las que asistió desde que presentó síntomas
                </legend>
                <p className="text-sm text-gray-500">
                  Seleccione los horarios de las clases a las que asistió.
                </p>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="table-auto border-collapse table-lesson-td">
                  <thead>
                    <tr className="bg-indigo-600 text-white font-semibold text-center">
                      <td className="table-lesson-th">Grupo</td>
                      <td className="table-lesson-th">Materia</td>
                      {weekDays.map((day, dayIndex) => (
                        <td key={dayIndex} className="table-lesson-th">
                          {day}
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selection.map((lesson, indexLesson) => (
                      <tr key={indexLesson}>
                        <td className="table-lesson-td text-center">{lesson.group}</td>
                        <td className="table-lesson-td px-2">{lesson.subject}</td>
                        {lesson.days.map((day) => (
                          <td key={day.dayIndex} className="table-lesson-td">
                            {day.time ? (
                              <button
                                className={day.isSelected ? "lesson-button-active" : "lesson-button"}
                                type="button"
                                onClick={() => selectLessonDay(lesson.subject, day.dayIndex)}
                              >
                                {day.time}
                              </button>
                            ) : (
                              <Fragment />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
