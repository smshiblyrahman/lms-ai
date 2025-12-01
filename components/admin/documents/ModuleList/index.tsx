"use client";

import { Suspense, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useApplyDocumentActions, createDocument } from "@sanity/sdk-react";
import { ListPageHeader, SearchInput } from "@/components/admin/shared";
import { ModuleListSkeleton } from "@/components/admin/shared/DocumentSkeleton";
import { ModuleListContent } from "./ModuleListContent";
import type { ModuleListProps } from "./types";

export function ModuleList({ projectId, dataset }: ModuleListProps) {
  const router = useRouter();
  const [isCreating, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const apply = useApplyDocumentActions();

  const handleCreateModule = () => {
    startTransition(async () => {
      const result = await apply(
        createDocument({
          documentType: "module",
        }),
      );
      const created = Array.isArray(result) ? result[0] : result;
      if (created?.id) {
        router.push(`/admin/modules/${created.id}`);
      }
    });
  };

  return (
    <div className="space-y-6">
      <ListPageHeader
        title="Modules"
        description="Manage course modules organized by course"
        actionLabel="New module"
        onAction={handleCreateModule}
        isLoading={isCreating}
      />

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search modules..."
      />

      <Suspense fallback={<ModuleListSkeleton />}>
        <ModuleListContent
          projectId={projectId}
          dataset={dataset}
          onCreateModule={handleCreateModule}
          isCreating={isCreating}
          searchQuery={searchQuery}
        />
      </Suspense>
    </div>
  );
}

export type { ModuleListProps } from "./types";
