// DATABASE-DRIVEN DATA
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export let role = "admin"; // Default role - can be updated based on user authentication

// FETCH TEACHERS DATA
export async function getTeachersData() {
  const teachers = await prisma.teacher.findMany({
    include: {
      subjects: true,
      classes: true,
    },
  });

  return teachers.map((teacher) => ({
    id: teacher.id,
    teacherId: teacher.id,
    name: `${teacher.name} ${teacher.surname}`,
    email: teacher.email || "",
    photo:
      teacher.img ||
      "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: teacher.phone || "",
    subjects: teacher.subjects.map((subject) => subject.name),
    classes: teacher.classes.map((cls) => cls.name),
    address: teacher.address,
    bloodType: teacher.bloodType,
    sex: teacher.sex,
    birthday: teacher.birthday,
  }));
}

// FETCH STUDENTS DATA
export async function getStudentsData() {
  const students = await prisma.student.findMany({
    include: {
      parent: true,
      class: true,
      grade: true,
    },
  });

  return students.map((student) => ({
    id: student.id,
    studentId: student.id,
    name: `${student.name} ${student.surname}`,
    email: student.email || "",
    photo:
      student.img ||
      "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: student.phone || "",
    grade: student.grade.level,
    class: student.class.name,
    address: student.address,
    bloodType: student.bloodType,
    sex: student.sex,
    birthday: student.birthday,
    parent: `${student.parent.name} ${student.parent.surname}`,
    parentPhone: student.parent.phone,
    parentEmail: student.parent.email || "",
  }));
}

// FETCH PARENTS DATA
export async function getParentsData() {
  const parents = await prisma.parent.findMany({
    include: {
      students: {
        include: {
          class: true,
          grade: true,
        },
      },
    },
  });

  return parents.map((parent) => ({
    id: parent.id,
    parentId: parent.id,
    name: `${parent.name} ${parent.surname}`,
    email: parent.email || "",
    phone: parent.phone,
    address: parent.address,
    students: parent.students.map((student) => ({
      id: student.id,
      name: `${student.name} ${student.surname}`,
      class: student.class.name,
      grade: student.grade.level,
    })),
  }));
}

// FETCH CLASSES DATA
export async function getClassesData() {
  const classes = await prisma.class.findMany({
    include: {
      grade: true,
      supervisor: true,
      students: true,
      lessons: {
        include: {
          subject: true,
          teacher: true,
        },
      },
    },
  });

  return classes.map((cls) => ({
    id: cls.id,
    name: cls.name,
    capacity: cls.capacity,
    grade: cls.grade.level,
    supervisor: cls.supervisor
      ? `${cls.supervisor.name} ${cls.supervisor.surname}`
      : null,
    students: cls.students.length,
    lessons: cls.lessons.map((lesson) => ({
      id: lesson.id,
      name: lesson.name,
      subject: lesson.subject.name,
      teacher: `${lesson.teacher.name} ${lesson.teacher.surname}`,
      day: lesson.day,
      startTime: lesson.startTime,
      endTime: lesson.endTime,
    })),
  }));
}

// FETCH SUBJECTS DATA
export async function getSubjectsData() {
  const subjects = await prisma.subject.findMany({
    include: {
      teachers: true,
      lessons: {
        include: {
          class: true,
        },
      },
    },
  });

  return subjects.map((subject) => ({
    id: subject.id,
    name: subject.name,
    teachers: subject.teachers.map(
      (teacher) => `${teacher.name} ${teacher.surname}`
    ),
    classes: [...new Set(subject.lessons.map((lesson) => lesson.class.name))], // Unique classes
  }));
}

// FETCH LESSONS DATA
export async function getLessonsData() {
  const lessons = await prisma.lesson.findMany({
    include: {
      subject: true,
      class: true,
      teacher: true,
    },
  });

  return lessons.map((lesson) => ({
    id: lesson.id,
    name: lesson.name,
    subject: lesson.subject.name,
    class: lesson.class.name,
    teacher: `${lesson.teacher.name} ${lesson.teacher.surname}`,
    day: lesson.day,
    startTime: lesson.startTime,
    endTime: lesson.endTime,
  }));
}

// FETCH EXAMS DATA
export async function getExamsData() {
  const exams = await prisma.exam.findMany({
    include: {
      lesson: {
        include: {
          subject: true,
          class: true,
          teacher: true,
        },
      },
      results: {
        include: {
          student: true,
        },
      },
    },
  });

  return exams.map((exam) => ({
    id: exam.id,
    title: exam.title,
    subject: exam.lesson.subject.name,
    class: exam.lesson.class.name,
    teacher: `${exam.lesson.teacher.name} ${exam.lesson.teacher.surname}`,
    startTime: exam.startTime,
    endTime: exam.endTime,
    results: exam.results.map((result) => ({
      studentId: result.student.id,
      studentName: `${result.student.name} ${result.student.surname}`,
      score: result.score,
    })),
  }));
}

// FETCH ASSIGNMENTS DATA
export async function getAssignmentsData() {
  const assignments = await prisma.assignment.findMany({
    include: {
      lesson: {
        include: {
          subject: true,
          class: true,
          teacher: true,
        },
      },
      results: {
        include: {
          student: true,
        },
      },
    },
  });

  return assignments.map((assignment) => ({
    id: assignment.id,
    title: assignment.title,
    subject: assignment.lesson.subject.name,
    class: assignment.lesson.class.name,
    teacher: `${assignment.lesson.teacher.name} ${assignment.lesson.teacher.surname}`,
    startDate: assignment.startDate,
    dueDate: assignment.dueDate,
    results: assignment.results.map((result) => ({
      studentId: result.student.id,
      studentName: `${result.student.name} ${result.student.surname}`,
      score: result.score,
    })),
  }));
}

// FETCH EVENTS DATA
export async function getEventsData() {
  const events = await prisma.event.findMany({
    include: {
      class: true,
    },
  });

  return events.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    startTime: event.startTime,
    endTime: event.endTime,
    class: event.class?.name || "All Classes",
  }));
}

// FETCH ANNOUNCEMENTS DATA
export async function getAnnouncementsData() {
  const announcements = await prisma.announcement.findMany({
    include: {
      class: true,
    },
  });

  return announcements.map((announcement) => ({
    id: announcement.id,
    title: announcement.title,
    description: announcement.description,
    date: announcement.date,
    class: announcement.class?.name || "All Classes",
  }));
}

// FETCH ATTENDANCE DATA
export async function getAttendanceData() {
  const attendance = await prisma.attendance.findMany({
    include: {
      student: {
        include: {
          class: true,
        },
      },
      lesson: {
        include: {
          subject: true,
          teacher: true,
        },
      },
    },
  });

  return attendance.map((record) => ({
    id: record.id,
    date: record.date,
    present: record.present,
    student: {
      id: record.student.id,
      name: `${record.student.name} ${record.student.surname}`,
      class: record.student.class.name,
    },
    lesson: {
      id: record.lesson.id,
      name: record.lesson.name,
      subject: record.lesson.subject.name,
      teacher: `${record.lesson.teacher.name} ${record.lesson.teacher.surname}`,
    },
  }));
}

// LEGACY DATA - keeping for backward compatibility until components are updated
export const teachersData = [
  {
    id: 1,
    teacherId: "teacher_001",
    name: "Emma Anderson",
    email: "e.anderson@springfield-academy.edu",
    photo:
      "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "555-1001",
    subjects: ["Mathematics", "Science"],
    classes: ["Grade 1A", "Grade 2A"],
    address: "100 Education Drive, Springfield, ST 12345",
  },
  // Add more legacy data as needed...
];

export const studentsData = [
  {
    id: 1,
    studentId: "student_001",
    name: "Emily Adams",
    email: "emily.adams@student.springfield-academy.edu",
    photo:
      "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "555-3001",
    grade: 8,
    class: "Grade 8A",
    address: "300 Student Street, Springfield, ST 12345",
  },
  // Add more legacy data as needed...
];

// CALENDAR DATA
export const calendarEvents = [
  {
    title: "Math",
    allDay: false,
    start: new Date(2024, 11, 11, 8, 0), // December 11, 2024, 8:00 AM
    end: new Date(2024, 11, 11, 8, 45), // December 11, 2024, 8:45 AM
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2024, 11, 11, 9, 0), // December 11, 2024, 9:00 AM
    end: new Date(2024, 11, 11, 9, 45), // December 11, 2024, 9:45 AM
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2024, 11, 11, 10, 0), // December 11, 2024, 10:00 AM
    end: new Date(2024, 11, 11, 10, 45), // December 11, 2024, 10:45 AM
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2024, 11, 11, 11, 0), // December 11, 2024, 11:00 AM
    end: new Date(2024, 11, 11, 11, 45), // December 11, 2024, 11:45 AM
  },
  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2024, 11, 11, 13, 0), // December 11, 2024, 1:00 PM
    end: new Date(2024, 11, 11, 13, 45), // December 11, 2024, 1:45 PM
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2024, 11, 11, 14, 0), // December 11, 2024, 2:00 PM
    end: new Date(2024, 11, 11, 14, 45), // December 11, 2024, 2:45 PM
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2024, 11, 12, 9, 0), // December 12, 2024, 9:00 AM
    end: new Date(2024, 11, 12, 9, 45), // December 12, 2024, 9:45 AM
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2024, 11, 12, 10, 0), // December 12, 2024, 10:00 AM
    end: new Date(2024, 11, 12, 10, 45), // December 12, 2024, 10:45 AM
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2024, 11, 12, 11, 0), // December 12, 2024, 11:00 AM
    end: new Date(2024, 11, 12, 11, 45), // December 12, 2024, 11:45 AM
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2024, 11, 12, 14, 0), // December 12, 2024, 2:00 PM
    end: new Date(2024, 11, 12, 14, 45), // December 12, 2024, 2:45 PM
  },
  {
    title: "Math",
    allDay: false,
    start: new Date(2024, 11, 13, 8, 0), // December 13, 2024, 8:00 AM
    end: new Date(2024, 11, 13, 8, 45), // December 13, 2024, 8:45 AM
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2024, 11, 13, 10, 0), // December 13, 2024, 10:00 AM
    end: new Date(2024, 11, 13, 10, 45), // December 13, 2024, 10:45 AM
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2024, 11, 13, 11, 0), // December 13, 2024, 11:00 AM
    end: new Date(2024, 11, 13, 11, 45), // December 13, 2024, 11:45 AM
  },
  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2024, 11, 13, 13, 0), // December 13, 2024, 1:00 PM
    end: new Date(2024, 11, 13, 13, 45), // December 13, 2024, 1:45 PM
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2024, 11, 13, 14, 0), // December 13, 2024, 2:00 PM
    end: new Date(2024, 11, 13, 14, 45), // December 13, 2024, 2:45 PM
  },
];

// ROLE-BASED ACCESS CONTROL HELPER
export function updateRole(newRole: string) {
  role = newRole;
}

export function getCurrentRole() {
  return role;
}

// CLOSE PRISMA CONNECTION
export async function closePrismaConnection() {
  await prisma.$disconnect();
}
