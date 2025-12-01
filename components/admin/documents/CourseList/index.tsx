"use client";

import { Suspense, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useApplyDocumentActions, createDocument } from "@sanity/sdk-react";
import { ListPageHeader, SearchInput } from "@/components/admin/shared";
import { DocumentGridSkeleton } from "@/components/admin/shared/DocumentSkeleton";
import { CourseGrid } from "./CourseGrid";
import type { CourseListProps } from "./types";

export function CourseList({ projectId, dataset }: CourseListProps) {
  const router = useRouter();
  const [isCreating, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const apply = useApplyDocumentActions();

  const handleCreateCourse = () => {
    startTransition(async () => {
      const result = await apply(
        createDocument({
          documentType: "course",
        }),
      );
      const created = Array.isArray(result) ? result[0] : result;
      if (created?.id) {
        router.push(`/admin/courses/${created.id}`);
      }
    });
  };

  return (
    <div className="space-y-6">
      <ListPageHeader
        title="Courses"
        description="Manage your courses and their content"
        actionLabel="New course"
        onAction={handleCreateCourse}
        isLoading={isCreating}
      />

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search courses..."
      />

      <Suspense fallback={<DocumentGridSkeleton count={4} />}>
        <CourseGrid
          projectId={projectId}
          dataset={dataset}
          onCreateCourse={handleCreateCourse}
          isCreating={isCreating}
          searchQuery={searchQuery}
        />
      </Suspense>
    </div>
  );
}

export type { CourseListProps } from "./types";

