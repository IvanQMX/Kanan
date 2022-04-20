export interface IStudent {
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  telephone: string;
  password: string;
}

export interface Student extends IStudent, Document {}

export interface ILesson {
  group: String;
  subject: String;
  days: ILessonDay[];
}

interface ILessonDay {
  dayIndex: number;
  time: String;
}

export interface Lesson extends ILesson, Document {}
