export interface CourseListProps {
  projectId: string;
  dataset: string;
}

export interface CourseData {
  title?: string;
  description?: string;
  tier?: "free" | "pro" | "ultra";
  thumbnail?: {
    asset?: {
      url?: string;
    };
  };
  moduleCount?: number;
  lessonCount?: number;
}

