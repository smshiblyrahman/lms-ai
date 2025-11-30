"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  useApplyDocumentActions,
  publishDocument,
  unpublishDocument,
  discardDocument,
  deleteDocument,
  type DocumentHandle,
  useDocument,
  useQuery,
} from "@sanity/sdk-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload, Trash2, Download, RotateCcw } from "lucide-react";

/**
 * DocumentActions
 *
 * - isDraft: doc._id.startsWith("drafts.") - checks if viewing a draft (real-time)
 * - hasPublishedVersion: useQuery - checks if published version exists (for Discard visibility)
 *
 * Button logic:
 * - Discard: isDraft && hasPublishedVersion (can only revert if published version exists)
 * - Publish: isDraft (push draft changes)
 * - Unpublish: !isDraft (only when viewing published version)
 */

interface DocumentActionsProps extends DocumentHandle {}

function DocumentActionsFallback() {
  return (
    <div className="flex items-center justify-between w-full">
      <Skeleton className="h-6 w-16" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-9" />
      </div>
    </div>
  );
}

function DocumentActionsContent({
  documentId,
  documentType,
  projectId,
  dataset,
}: DocumentActionsProps) {
  const router = useRouter();
  const apply = useApplyDocumentActions();

  const baseId = documentId.replace("drafts.", "");

  // Real-time document state (for editing)
  const { data: doc } = useDocument({
    documentId,
    documentType,
    projectId,
    dataset,
  });

  // Check if published version exists using useQuery with published perspective
  // useDocument doesn't support perspective, but useQuery does
  const { data: publishedDoc } = useQuery<{
    _id: string;
  } | null>({
    query: `*[_id == $id][0]{ _id }`,
    params: { id: baseId },
    perspective: "published",
  });

  console.log("publishedDoc >>>", publishedDoc);

  const isDraft = doc?._id.startsWith("drafts.");
  const hasPublishedVersion = !!publishedDoc;

  const getListUrl = () => {
    if (documentType === "category") return "/admin/categories";
    return `/admin/${documentType}s`;
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Draft badge - only shown when in draft mode */}
      {isDraft && (
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
          📝 Draft
        </span>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {/* Discard changes - only when in draft AND published version exists */}
        {isDraft && hasPublishedVersion && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const confirmed = window.confirm(
                "Discard all changes? This will revert to the published version.",
              );
              if (!confirmed) return;
              apply(
                discardDocument({
                  documentId: baseId,
                  documentType,
                }),
              );
            }}
          >
            <RotateCcw className="h-4 w-4 mr-1.5" />
            Discard changes
          </Button>
        )}

        {/* Unpublish - only when viewing published version (not draft) */}
        {!isDraft && (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              apply(
                unpublishDocument({
                  documentId: baseId,
                  documentType,
                }),
              )
            }
            className="text-gray-700 hover:bg-gray-100"
          >
            <Download className="h-4 w-4 mr-1.5" />
            Unpublish
          </Button>
        )}

        {/* Publish - only when in draft mode */}
        {isDraft && (
          <Button
            size="sm"
            onClick={() =>
              apply(
                publishDocument({
                  documentId: baseId,
                  documentType,
                }),
              )
            }
            className="bg-green-600 hover:bg-green-700"
          >
            <Upload className="h-4 w-4 mr-1.5" />
            Publish
          </Button>
        )}

        {/* Delete button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const confirmed = window.confirm(
              "Delete this document permanently? This cannot be undone.",
            );
            if (!confirmed) return;

            apply(
              deleteDocument({
                documentId: baseId,
                documentType,
              }),
            );
            router.push(getListUrl());
          }}
          className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function DocumentActions(props: DocumentActionsProps) {
  return (
    <Suspense fallback={<DocumentActionsFallback />}>
      <DocumentActionsContent {...props} />
    </Suspense>
  );
}
