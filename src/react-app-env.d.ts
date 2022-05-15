/// <reference types="react-scripts" />
interface Lesson {
  _id: String;
  group: String;
  subject: String;
  days: LessonDay[];
}

interface selectedLesson {
  _id: String;
  days: LessonDay[];
}

interface LessonDay {
  dayIndex: number;
  time: String;
  isSelected: boolean;
  date?: Date;
}

interface COVIDTest {
  hasTestPhotoState: [undefined|boolean, React.Dispatch<React.SetStateAction<undefined|boolean>>];
  testPhotoState: [undefined|File, React.Dispatch<React.SetStateAction<undefined|File>>]
}

interface Symptoms {
  sinceDayState: [undefined|Date, React.Dispatch<React.SetStateAction<undefined|Date>>]
  symptomsState: [Symptom[], React.Dispatch<React.SetStateAction<Symptom[]>>];
}

type Session = [
  null|string, React.Dispatch<React.SetStateAction<null|string>>
]

interface Symptom {
  name: string;
  checked?: boolean;
}

interface Login {
  sessionState: Session
}

interface Form {
  sessionState: Session
}

interface Navbar {
  sessionState: Session
}

interface ExtraInfo {
  sinceDayState: undefined|Date;
  attendedSchoolState: [undefined|boolean, React.Dispatch<React.SetStateAction<undefined|boolean>>];
  selectionState: [Lesson[], React.Dispatch<React.SetStateAction<Lesson[]>>];
  schedule: Lesson[];
}
