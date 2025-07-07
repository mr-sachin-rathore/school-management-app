import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // ADMIN USERS - only id and username fields exist
  const adminUsers = [
    { id: "admin_001", username: "admin" },
    { id: "admin_002", username: "principal" },
  ];

  for (const admin of adminUsers) {
    await prisma.admin.create({
      data: admin,
    });
  }
  console.log("✅ Created admins");

  // GRADES (1-12)
  for (let i = 1; i <= 12; i++) {
    await prisma.grade.create({
      data: { level: i },
    });
  }
  console.log("✅ Created grades 1-12");

  // SUBJECTS with realistic curriculum
  const subjects = [
    { name: "Mathematics" },
    { name: "English Language Arts" },
    { name: "Science" },
    { name: "Social Studies" },
    { name: "Physical Education" },
    { name: "Art" },
    { name: "Music" },
    { name: "Spanish" },
    { name: "French" },
    { name: "Computer Science" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "World History" },
    { name: "American History" },
    { name: "Literature" },
    { name: "Algebra" },
    { name: "Geometry" },
    { name: "Calculus" },
    { name: "Statistics" },
    { name: "Environmental Science" },
    { name: "Psychology" },
  ];

  for (const subject of subjects) {
    await prisma.subject.create({ data: subject });
  }
  console.log("✅ Created subjects");

  // CLASSES - 3 classes per grade
  const classLetters = ["A", "B", "C"];
  for (let grade = 1; grade <= 12; grade++) {
    for (const letter of classLetters) {
      await prisma.class.create({
        data: {
          name: `Grade ${grade}${letter}`,
          gradeId: grade,
          capacity: grade <= 6 ? 25 : 30, // Elementary smaller classes
        },
      });
    }
  }
  console.log("✅ Created classes");

  // TEACHERS with realistic profiles
  const teachers = [
    // Elementary Teachers (Grades 1-6)
    {
      username: "teacher.anderson",
      name: "Emma",
      surname: "Anderson",
      email: "e.anderson@springfield-academy.edu",
      subjects: [1, 3],
      phone: "555-0101",
    },
    {
      username: "teacher.brown",
      name: "Michael",
      surname: "Brown",
      email: "m.brown@springfield-academy.edu",
      subjects: [2, 16],
      phone: "555-0102",
    },
    {
      username: "teacher.clark",
      name: "Jennifer",
      surname: "Clark",
      email: "j.clark@springfield-academy.edu",
      subjects: [4, 14],
      phone: "555-0103",
    },
    {
      username: "teacher.davis",
      name: "Robert",
      surname: "Davis",
      email: "r.davis@springfield-academy.edu",
      subjects: [5, 6],
      phone: "555-0104",
    },
    {
      username: "teacher.evans",
      name: "Lisa",
      surname: "Evans",
      email: "l.evans@springfield-academy.edu",
      subjects: [6, 7],
      phone: "555-0105",
    },
    {
      username: "teacher.foster",
      name: "David",
      surname: "Foster",
      email: "d.foster@springfield-academy.edu",
      subjects: [1, 17],
      phone: "555-0106",
    },

    // Middle School Teachers (Grades 7-9)
    {
      username: "teacher.garcia",
      name: "Maria",
      surname: "Garcia",
      email: "m.garcia@springfield-academy.edu",
      subjects: [8, 9],
      phone: "555-0107",
    },
    {
      username: "teacher.harris",
      name: "James",
      surname: "Harris",
      email: "j.harris@springfield-academy.edu",
      subjects: [11, 12],
      phone: "555-0108",
    },
    {
      username: "teacher.johnson",
      name: "Sarah",
      surname: "Johnson",
      email: "s.johnson@springfield-academy.edu",
      subjects: [13, 21],
      phone: "555-0109",
    },
    {
      username: "teacher.kim",
      name: "Daniel",
      surname: "Kim",
      email: "d.kim@springfield-academy.edu",
      subjects: [10, 22],
      phone: "555-0110",
    },

    // High School Teachers (Grades 10-12)
    {
      username: "teacher.lopez",
      name: "Carlos",
      surname: "Lopez",
      email: "c.lopez@springfield-academy.edu",
      subjects: [14, 15],
      phone: "555-0111",
    },
    {
      username: "teacher.miller",
      name: "Amanda",
      surname: "Miller",
      email: "a.miller@springfield-academy.edu",
      subjects: [16, 2],
      phone: "555-0112",
    },
    {
      username: "teacher.nelson",
      name: "Thomas",
      surname: "Nelson",
      email: "t.nelson@springfield-academy.edu",
      subjects: [17, 18],
      phone: "555-0113",
    },
    {
      username: "teacher.parker",
      name: "Rachel",
      surname: "Parker",
      email: "r.parker@springfield-academy.edu",
      subjects: [11, 12],
      phone: "555-0114",
    },
    {
      username: "teacher.rodriguez",
      name: "Sofia",
      surname: "Rodriguez",
      email: "s.rodriguez@springfield-academy.edu",
      subjects: [19, 20],
      phone: "555-0115",
    },
    {
      username: "teacher.smith",
      name: "John",
      surname: "Smith",
      email: "j.smith@springfield-academy.edu",
      subjects: [13, 21],
      phone: "555-0116",
    },
    {
      username: "teacher.taylor",
      name: "Michelle",
      surname: "Taylor",
      email: "m.taylor@springfield-academy.edu",
      subjects: [6, 7],
      phone: "555-0117",
    },
    {
      username: "teacher.white",
      name: "Kevin",
      surname: "White",
      email: "k.white@springfield-academy.edu",
      subjects: [5, 4],
      phone: "555-0118",
    },
    {
      username: "teacher.wilson",
      name: "Patricia",
      surname: "Wilson",
      email: "p.wilson@springfield-academy.edu",
      subjects: [8, 9],
      phone: "555-0119",
    },
    {
      username: "teacher.young",
      name: "Christopher",
      surname: "Young",
      email: "c.young@springfield-academy.edu",
      subjects: [10, 19],
      phone: "555-0120",
    },
  ];

  for (let i = 0; i < teachers.length; i++) {
    const teacher = teachers[i];
    await prisma.teacher.create({
      data: {
        id: `teacher_${String(i + 1).padStart(3, "0")}`,
        username: teacher.username,
        name: teacher.name,
        surname: teacher.surname,
        email: teacher.email,
        phone: `555-${String(1001 + i).padStart(4, "0")}`, // Generate unique phone numbers
        address: `${100 + i} Education Drive, Springfield, ST 12345`,
        bloodType: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"][i % 8],
        sex: i % 2 === 0 ? UserSex.FEMALE : UserSex.MALE,
        birthday: new Date(1975 + (i % 20), i % 12, (i % 28) + 1),
        subjects: { connect: teacher.subjects.map((id) => ({ id })) },
        classes: { connect: [{ id: (i % 36) + 1 }] }, // Distribute across classes
      },
    });
  }
  console.log("✅ Created teachers");

  // PARENTS with realistic family structures
  const parentData = [
    {
      firstName: "Jennifer",
      lastName: "Adams",
      phone: "555-2001",
      email: "jennifer.adams@email.com",
    },
    {
      firstName: "Michael",
      lastName: "Adams",
      phone: "555-2002",
      email: "michael.adams@email.com",
    },
    {
      firstName: "Sarah",
      lastName: "Baker",
      phone: "555-2003",
      email: "sarah.baker@email.com",
    },
    {
      firstName: "David",
      lastName: "Baker",
      phone: "555-2004",
      email: "david.baker@email.com",
    },
    {
      firstName: "Lisa",
      lastName: "Chen",
      phone: "555-2005",
      email: "lisa.chen@email.com",
    },
    {
      firstName: "Robert",
      lastName: "Chen",
      phone: "555-2006",
      email: "robert.chen@email.com",
    },
    {
      firstName: "Maria",
      lastName: "Davis",
      phone: "555-2007",
      email: "maria.davis@email.com",
    },
    {
      firstName: "James",
      lastName: "Davis",
      phone: "555-2008",
      email: "james.davis@email.com",
    },
    {
      firstName: "Patricia",
      lastName: "Evans",
      phone: "555-2009",
      email: "patricia.evans@email.com",
    },
    {
      firstName: "William",
      lastName: "Evans",
      phone: "555-2010",
      email: "william.evans@email.com",
    },
    {
      firstName: "Linda",
      lastName: "Foster",
      phone: "555-2011",
      email: "linda.foster@email.com",
    },
    {
      firstName: "Thomas",
      lastName: "Foster",
      phone: "555-2012",
      email: "thomas.foster@email.com",
    },
    {
      firstName: "Susan",
      lastName: "Garcia",
      phone: "555-2013",
      email: "susan.garcia@email.com",
    },
    {
      firstName: "Carlos",
      lastName: "Garcia",
      phone: "555-2014",
      email: "carlos.garcia@email.com",
    },
    {
      firstName: "Karen",
      lastName: "Harris",
      phone: "555-2015",
      email: "karen.harris@email.com",
    },
    {
      firstName: "Richard",
      lastName: "Harris",
      phone: "555-2016",
      email: "richard.harris@email.com",
    },
    {
      firstName: "Nancy",
      lastName: "Johnson",
      phone: "555-2017",
      email: "nancy.johnson@email.com",
    },
    {
      firstName: "Daniel",
      lastName: "Johnson",
      phone: "555-2018",
      email: "daniel.johnson@email.com",
    },
    {
      firstName: "Betty",
      lastName: "Kim",
      phone: "555-2019",
      email: "betty.kim@email.com",
    },
    {
      firstName: "Mark",
      lastName: "Kim",
      phone: "555-2020",
      email: "mark.kim@email.com",
    },
  ];

  for (let i = 0; i < parentData.length; i++) {
    const parent = parentData[i];
    await prisma.parent.create({
      data: {
        id: `parent_${String(i + 1).padStart(3, "0")}`,
        username: `parent.${parent.firstName.toLowerCase()}.${parent.lastName.toLowerCase()}`,
        name: parent.firstName,
        surname: parent.lastName,
        email: parent.email,
        phone: parent.phone,
        address: `${
          200 + Math.floor(i / 2)
        } Family Lane, Springfield, ST 12345`,
      },
    });
  }
  console.log("✅ Created parents");

  // STUDENTS with family relationships
  const studentData = [
    // Adams family children
    {
      firstName: "Emily",
      lastName: "Adams",
      grade: 8,
      parentIds: ["parent_001", "parent_002"],
    },
    {
      firstName: "Jacob",
      lastName: "Adams",
      grade: 5,
      parentIds: ["parent_001", "parent_002"],
    },

    // Baker family children
    {
      firstName: "Sophia",
      lastName: "Baker",
      grade: 11,
      parentIds: ["parent_003", "parent_004"],
    },
    {
      firstName: "Ethan",
      lastName: "Baker",
      grade: 9,
      parentIds: ["parent_003", "parent_004"],
    },

    // Chen family children
    {
      firstName: "Olivia",
      lastName: "Chen",
      grade: 7,
      parentIds: ["parent_005", "parent_006"],
    },
    {
      firstName: "Lucas",
      lastName: "Chen",
      grade: 4,
      parentIds: ["parent_005", "parent_006"],
    },

    // Davis family children
    {
      firstName: "Ava",
      lastName: "Davis",
      grade: 10,
      parentIds: ["parent_007", "parent_008"],
    },
    {
      firstName: "Mason",
      lastName: "Davis",
      grade: 6,
      parentIds: ["parent_007", "parent_008"],
    },
    {
      firstName: "Lily",
      lastName: "Davis",
      grade: 3,
      parentIds: ["parent_007", "parent_008"],
    },

    // Evans family children
    {
      firstName: "Noah",
      lastName: "Evans",
      grade: 12,
      parentIds: ["parent_009", "parent_010"],
    },
    {
      firstName: "Emma",
      lastName: "Evans",
      grade: 8,
      parentIds: ["parent_009", "parent_010"],
    },

    // Foster family children
    {
      firstName: "Liam",
      lastName: "Foster",
      grade: 9,
      parentIds: ["parent_011", "parent_012"],
    },
    {
      firstName: "Isabella",
      lastName: "Foster",
      grade: 6,
      parentIds: ["parent_011", "parent_012"],
    },

    // Garcia family children
    {
      firstName: "William",
      lastName: "Garcia",
      grade: 11,
      parentIds: ["parent_013", "parent_014"],
    },
    {
      firstName: "Mia",
      lastName: "Garcia",
      grade: 7,
      parentIds: ["parent_013", "parent_014"],
    },
    {
      firstName: "Alexander",
      lastName: "Garcia",
      grade: 2,
      parentIds: ["parent_013", "parent_014"],
    },

    // Harris family children
    {
      firstName: "James",
      lastName: "Harris",
      grade: 10,
      parentIds: ["parent_015", "parent_016"],
    },
    {
      firstName: "Charlotte",
      lastName: "Harris",
      grade: 5,
      parentIds: ["parent_015", "parent_016"],
    },

    // Johnson family children
    {
      firstName: "Benjamin",
      lastName: "Johnson",
      grade: 12,
      parentIds: ["parent_017", "parent_018"],
    },
    {
      firstName: "Amelia",
      lastName: "Johnson",
      grade: 9,
      parentIds: ["parent_017", "parent_018"],
    },
    {
      firstName: "Henry",
      lastName: "Johnson",
      grade: 4,
      parentIds: ["parent_017", "parent_018"],
    },

    // Kim family children
    {
      firstName: "Sebastian",
      lastName: "Kim",
      grade: 8,
      parentIds: ["parent_019", "parent_020"],
    },
    {
      firstName: "Harper",
      lastName: "Kim",
      grade: 1,
      parentIds: ["parent_019", "parent_020"],
    },

    // Additional students for more diversity
    {
      firstName: "Evelyn",
      lastName: "Martinez",
      grade: 6,
      parentIds: ["parent_001"],
    }, // Single parent
    {
      firstName: "Jackson",
      lastName: "Thompson",
      grade: 7,
      parentIds: ["parent_003"],
    },
    {
      firstName: "Abigail",
      lastName: "White",
      grade: 9,
      parentIds: ["parent_005"],
    },
    {
      firstName: "Aiden",
      lastName: "Rodriguez",
      grade: 10,
      parentIds: ["parent_007"],
    },
    {
      firstName: "Ella",
      lastName: "Wilson",
      grade: 11,
      parentIds: ["parent_009"],
    },
    {
      firstName: "Michael",
      lastName: "Anderson",
      grade: 12,
      parentIds: ["parent_011"],
    },
    {
      firstName: "Scarlett",
      lastName: "Taylor",
      grade: 3,
      parentIds: ["parent_013"],
    },
    {
      firstName: "Owen",
      lastName: "Moore",
      grade: 4,
      parentIds: ["parent_015"],
    },
  ];

  for (let i = 0; i < studentData.length; i++) {
    const student = studentData[i];
    const classId = (student.grade - 1) * 3 + ((i % 3) + 1); // Distribute across A, B, C classes

    await prisma.student.create({
      data: {
        id: `student_${String(i + 1).padStart(3, "0")}`,
        username: `student.${student.firstName.toLowerCase()}.${student.lastName.toLowerCase()}`,
        name: student.firstName,
        surname: student.lastName,
        email: `${student.firstName.toLowerCase()}.${student.lastName.toLowerCase()}@student.springfield-academy.edu`,
        phone: `555-3${String(i + 1).padStart(3, "0")}`,
        address: `${300 + i} Student Street, Springfield, ST 12345`,
        bloodType: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"][i % 8],
        sex: i % 2 === 0 ? UserSex.FEMALE : UserSex.MALE,
        birthday: new Date(2024 - student.grade - 5, i % 12, (i % 28) + 1),
        gradeId: student.grade,
        classId: classId,
        parentId: student.parentIds[0], // Primary parent
      },
    });
  }
  console.log("✅ Created students");

  // LESSONS with realistic scheduling
  const lessonTemplates = [
    { name: "Basic Arithmetic", subject: 1, grades: [1, 2, 3] },
    { name: "Reading Comprehension", subject: 2, grades: [1, 2, 3, 4] },
    { name: "Elementary Science", subject: 3, grades: [1, 2, 3, 4, 5, 6] },
    { name: "Social Studies Fundamentals", subject: 4, grades: [3, 4, 5, 6] },
    {
      name: "Physical Education",
      subject: 5,
      grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    { name: "Art & Creativity", subject: 6, grades: [1, 2, 3, 4, 5, 6] },
    { name: "Music Appreciation", subject: 7, grades: [1, 2, 3, 4, 5, 6] },
    { name: "Introduction to Spanish", subject: 8, grades: [6, 7, 8, 9] },
    { name: "Pre-Algebra", subject: 17, grades: [7, 8] },
    { name: "Algebra I", subject: 17, grades: [8, 9] },
    { name: "Geometry", subject: 18, grades: [9, 10] },
    { name: "Algebra II", subject: 17, grades: [10, 11] },
    { name: "Pre-Calculus", subject: 19, grades: [11, 12] },
    { name: "AP Calculus", subject: 19, grades: [12] },
    { name: "Biology", subject: 13, grades: [9, 10] },
    { name: "Chemistry", subject: 12, grades: [10, 11] },
    { name: "Physics", subject: 11, grades: [11, 12] },
    { name: "World Literature", subject: 16, grades: [9, 10] },
    { name: "American Literature", subject: 16, grades: [11, 12] },
    { name: "World History", subject: 14, grades: [9, 10] },
    { name: "US History", subject: 15, grades: [11] },
    { name: "Government & Economics", subject: 4, grades: [12] },
    { name: "Computer Programming", subject: 10, grades: [9, 10, 11, 12] },
    { name: "AP Psychology", subject: 22, grades: [11, 12] },
  ];

  const days = [
    Day.MONDAY,
    Day.TUESDAY,
    Day.WEDNESDAY,
    Day.THURSDAY,
    Day.FRIDAY,
  ];
  let lessonId = 1;

  for (const template of lessonTemplates) {
    for (const grade of template.grades) {
      for (let classLetter = 0; classLetter < 3; classLetter++) {
        const classId = (grade - 1) * 3 + classLetter + 1;
        const teacherId = `teacher_${String(
          ((template.subject - 1) % 20) + 1
        ).padStart(3, "0")}`;

        // Create multiple sessions per week for core subjects
        const sessionsPerWeek = [1, 2, 3, 4, 5].includes(template.subject)
          ? 5
          : 3;

        for (let session = 0; session < sessionsPerWeek; session++) {
          const day = days[session % 5];
          const hour = 8 + (session % 6); // School hours 8 AM - 2 PM

          await prisma.lesson.create({
            data: {
              name: `${template.name} - Grade ${grade}${String.fromCharCode(
                65 + classLetter
              )}`,
              day: day,
              startTime: new Date(2024, 0, 1, hour, 0, 0),
              endTime: new Date(2024, 0, 1, hour + 1, 0, 0),
              subjectId: template.subject,
              classId: classId,
              teacherId: teacherId,
            },
          });
          lessonId++;
        }
      }
    }
  }
  console.log("✅ Created lessons");

  // EXAMS with realistic academic calendar
  const examTypes = [
    { type: "Unit Test", weight: 0.6 },
    { type: "Midterm Exam", weight: 0.8 },
    { type: "Final Exam", weight: 1.0 },
    { type: "Quiz", weight: 0.4 },
    { type: "Practical Exam", weight: 0.7 },
  ];

  const lessons = await prisma.lesson.findMany();

  for (let i = 0; i < Math.min(100, lessons.length); i++) {
    const lesson = lessons[i];
    const examType = examTypes[i % examTypes.length];

    await prisma.exam.create({
      data: {
        title: `${examType.type} - ${lesson.name}`,
        startTime: new Date(2024, 2 + (i % 8), (i % 25) + 1, 9, 0, 0),
        endTime: new Date(2024, 2 + (i % 8), (i % 25) + 1, 11, 0, 0),
        lessonId: lesson.id,
      },
    });
  }
  console.log("✅ Created exams");

  // ASSIGNMENTS with due dates
  const assignmentTypes = [
    "Homework Assignment",
    "Research Project",
    "Lab Report",
    "Essay",
    "Problem Set",
    "Group Project",
    "Presentation",
    "Creative Writing",
    "Science Experiment",
    "Book Report",
    "Math Worksheet",
    "Art Portfolio",
  ];

  for (let i = 0; i < Math.min(150, lessons.length); i++) {
    const lesson = lessons[i];
    const assignmentType = assignmentTypes[i % assignmentTypes.length];

    await prisma.assignment.create({
      data: {
        title: `${assignmentType} - ${lesson.name}`,
        startDate: new Date(2024, 1 + (i % 10), (i % 25) + 1),
        dueDate: new Date(2024, 1 + (i % 10), (i % 25) + 8), // One week later
        lessonId: lesson.id,
      },
    });
  }
  console.log("✅ Created assignments");

  // RESULTS with realistic grade distribution
  const students = await prisma.student.findMany();
  const exams = await prisma.exam.findMany();
  const assignments = await prisma.assignment.findMany();

  // Generate exam results
  for (let i = 0; i < Math.min(200, exams.length * 3); i++) {
    const exam = exams[i % exams.length];
    const student = students[i % students.length];

    // Realistic grade distribution (70-100 with bell curve)
    const baseScore = 75 + Math.random() * 25;
    const score = Math.min(100, Math.max(60, Math.round(baseScore)));

    await prisma.result.create({
      data: {
        score: score,
        examId: exam.id,
        studentId: student.id,
      },
    });
  }

  // Generate assignment results
  for (let i = 0; i < Math.min(300, assignments.length * 2); i++) {
    const assignment = assignments[i % assignments.length];
    const student = students[i % students.length];

    const baseScore = 80 + Math.random() * 20; // Assignments typically scored higher
    const score = Math.min(100, Math.max(70, Math.round(baseScore)));

    await prisma.result.create({
      data: {
        score: score,
        assignmentId: assignment.id,
        studentId: student.id,
      },
    });
  }
  console.log("✅ Created results");

  // ATTENDANCE with realistic patterns
  for (let day = 1; day <= 30; day++) {
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      const lesson = lessons[(day * student.gradeId + i) % lessons.length];

      // 95% attendance rate with some students having lower rates
      const attendanceRate = i % 10 === 0 ? 0.85 : 0.95;
      const present = Math.random() < attendanceRate;

      await prisma.attendance.create({
        data: {
          date: new Date(2024, 2, day),
          present: present,
          studentId: student.id,
          lessonId: lesson.id,
        },
      });
    }
  }
  console.log("✅ Created attendance records");

  // EVENTS
  const schoolEvents = [
    {
      title: "Back to School Night",
      description:
        "Meet your child's teachers and learn about the curriculum for the year",
      date: new Date(2024, 8, 15),
      classId: null,
    },
    {
      title: "Science Fair",
      description:
        "Students showcase their scientific research and experiments",
      date: new Date(2024, 10, 20),
      classId: null,
    },
    {
      title: "Winter Concert",
      description: "Music students perform holiday songs for families",
      date: new Date(2024, 11, 15),
      classId: null,
    },
    {
      title: "Parent-Teacher Conferences",
      description: "Individual meetings to discuss student progress",
      date: new Date(2024, 10, 5),
      classId: null,
    },
    {
      title: "Spring Sports Day",
      description: "Annual athletic competition between grade levels",
      date: new Date(2025, 4, 10),
      classId: null,
    },
    {
      title: "Graduation Ceremony",
      description: "Celebrating our graduating seniors",
      date: new Date(2025, 5, 15),
      classId: 36,
    }, // Grade 12C
    {
      title: "Art Exhibition",
      description: "Student artwork displayed for the community",
      date: new Date(2025, 3, 20),
      classId: null,
    },
    {
      title: "Math Competition",
      description: "Inter-school mathematics competition",
      date: new Date(2025, 2, 25),
      classId: null,
    },
    {
      title: "Book Fair",
      description: "Annual book sale and reading promotion event",
      date: new Date(2024, 9, 30),
      classId: null,
    },
    {
      title: "Career Day",
      description: "Local professionals share about their careers",
      date: new Date(2025, 1, 14),
      classId: null,
    },
  ];

  for (const event of schoolEvents) {
    await prisma.event.create({
      data: {
        title: event.title,
        description: event.description,
        startTime: new Date(
          event.date.getFullYear(),
          event.date.getMonth(),
          event.date.getDate(),
          10,
          0,
          0
        ),
        endTime: new Date(
          event.date.getFullYear(),
          event.date.getMonth(),
          event.date.getDate(),
          15,
          0,
          0
        ),
        classId: event.classId,
      },
    });
  }
  console.log("✅ Created events");

  // ANNOUNCEMENTS
  const announcements = [
    {
      title: "Welcome Back Students!",
      description:
        "We're excited to start the new school year. Please review the updated handbook and schedule.",
      classId: null,
    },
    {
      title: "New Lunch Menu",
      description:
        "We've added healthier options to our cafeteria. View the full menu on our website.",
      classId: null,
    },
    {
      title: "Library Hours Extended",
      description:
        "The library will now be open until 5 PM on weekdays for student study sessions.",
      classId: null,
    },
    {
      title: "Flu Season Reminder",
      description:
        "Please keep sick students home and wash hands frequently. Vaccination information available in the nurse's office.",
      classId: null,
    },
    {
      title: "Grade 12 College Application Deadlines",
      description:
        "Seniors: Remember that many college applications are due soon. See your counselor for assistance.",
      classId: 34,
    }, // Grade 12A
    {
      title: "Spring Break Schedule",
      description:
        "School will be closed March 25-29. Classes resume Monday, April 1st.",
      classId: null,
    },
    {
      title: "Yearbook Photos",
      description:
        "Individual and class photos will be taken October 15-18. Order forms available in the main office.",
      classId: null,
    },
    {
      title: "Safety Drill Practice",
      description:
        "We will conduct emergency drills this week. Please review procedures with your students.",
      classId: null,
    },
    {
      title: "Grade 9 Course Selection",
      description:
        "Freshmen should meet with counselors by March 1st to select next year's courses.",
      classId: 28,
    }, // Grade 9A
    {
      title: "PTA Meeting",
      description:
        "Monthly PTA meeting this Thursday at 7 PM in the auditorium. All parents welcome.",
      classId: null,
    },
  ];

  for (let i = 0; i < announcements.length; i++) {
    const announcement = announcements[i];
    await prisma.announcement.create({
      data: {
        title: announcement.title,
        description: announcement.description,
        date: new Date(2024, 1 + i, i * 3 + 1),
        classId: announcement.classId,
      },
    });
  }
  console.log("✅ Created announcements");

  console.log("🎉 Database seeding completed successfully!");
  console.log("📊 Created data summary:");
  console.log("   • 2 Admin users");
  console.log("   • 12 Grades (1-12)");
  console.log("   • 36 Classes (3 per grade)");
  console.log("   • 22 Subjects");
  console.log("   • 20 Teachers");
  console.log("   • 20 Parents");
  console.log("   • 30 Students");
  console.log("   • Comprehensive lessons, exams, assignments");
  console.log("   • Attendance records, results, events, announcements");
  console.log("   • All data is interconnected and realistic for testing");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
