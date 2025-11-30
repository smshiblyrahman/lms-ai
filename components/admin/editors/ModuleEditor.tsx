"use client";

import { Suspense } from "react";
import type { DocumentHandle } from "@sanity/sdk-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDocument, useEditDocument } from "@sanity/sdk-react";
import { ReferenceArrayInput } from "@/components/admin/inputs/ReferenceArrayInput";
import { DocumentActions } from "@/components/admin/documents/DocumentActions";
import { OpenInStudio } from "@/components/admin/documents/OpenInStudio";

interface ModuleEditorProps {
  documentId: string;
  projectId: string;
  dataset: string;
}

function ModuleEditorFallback() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-12 w-2/3" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  );
}

function ModuleEditorContent({
  documentId,
  projectId,
  dataset,
}: ModuleEditorProps) {
  const handle: DocumentHandle = {
    documentId,
    documentType: "module",
    projectId,
    dataset,
  };

  const { data: title } = useDocument<string>({ ...handle, path: "title" });
  const { data: description } = useDocument<string>({
    ...handle,
    path: "description",
  });
  const editTitle = useEditDocument<string>({ ...handle, path: "title" });
  const editDescription = useEditDocument<string>({
    ...handle,
    path: "description",
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-end mb-3">
        <OpenInStudio handle={handle} />
      </div>

      {/* Header section */}
      <div className="bg-background rounded-xl border shadow-sm p-6 mb-6">
        {/* Title input */}
        <Input
          value={title ?? ""}
          onChange={(e) => editTitle(e.currentTarget.value)}
          placeholder="Untitled Module"
          className="text-2xl font-semibold border-none shadow-none px-0 h-auto py-1 focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground/40"
        />

        {/* Description */}
        <Textarea
          value={description ?? ""}
          onChange={(e) => editDescription(e.currentTarget.value)}
          placeholder="Add a description..."
          className="text-muted-foreground border-none shadow-none px-0 resize-none focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground/30 mt-2"
          rows={2}
        />

        {/* Actions */}
        <div className="flex items-center justify-end mt-4 pt-4 border-t">
          <DocumentActions {...handle} />
        </div>
      </div>

      {/* Lessons section */}
      <div className="bg-background rounded-xl border shadow-sm p-6">
        <ReferenceArrayInput
          documentId={documentId}
          documentType="module"
          projectId={projectId}
          dataset={dataset}
          path="lessons"
          label="Lessons"
          referenceType="lesson"
        />
      </div>
    </div>
  );
}

export function ModuleEditor(props: ModuleEditorProps) {
  return (
    <Suspense fallback={<ModuleEditorFallback />}>
      <ModuleEditorContent {...props} />
    </Suspense>
  );
}
