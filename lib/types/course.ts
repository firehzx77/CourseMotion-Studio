export interface CourseModule {
  moduleTitle: string;
  duration: string;
  learningObjectives: string[];
  keyPoints: string[];
  cases: string[];
  activities: string[];
  instructorNotes: string[];
}

export interface CourseJson {
  courseTitle: string;
  targetAudience: string;
  courseDuration: string;
  courseGoal: string;
  courseStyle: string;
  modules: CourseModule[];
}
