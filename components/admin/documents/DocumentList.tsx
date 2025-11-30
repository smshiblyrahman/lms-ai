"use client";

import { Suspense } from "react";
import Link from "next/link";
import {
  useDocuments,
  useDocumentProjection,
  type DocumentHandle,
} from "@sanity/sdk-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight } from "lucide-react";

interface DocumentListProps {
  documentType: string;
  title: string;
  description?: string;
  basePath: string;
  projectId: string;
  dataset: string;
  showCreateButton?: boolean;
}

function DocumentListFallback() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}

function DocumentItem({
  documentId,
  documentType,
  projectId,
  dataset,
  basePath,
}: DocumentHandle & { basePath: string }) {
  const { data } = useDocumentProjection({
    documentId,
    documentType,
    projectId,
    dataset,
    projection: "{ title, description }",
  });

  const title = (data as { title?: string })?.title || "Untitled";
  const description = (data as { description?: string })?.description;

  return (
    <Link href={`${basePath}/${documentId}`}>
      <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group">
        <div className="flex items-center justify-between">
          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="font-medium truncate">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {description}
              </p>
            )}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 ml-4" />
        </div>
      </Card>
    </Link>
  );
}

function DocumentListContent({
  documentType,
  basePath,
  projectId,
  dataset,
}: Omit<DocumentListProps, "title" | "description" | "showCreateButton">) {
  const { data: documents } = useDocuments({
    documentType,
    projectId,
    dataset,
  });

  if (!documents || documents.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No {documentType}s found</p>
        <Link href={`${basePath}/new`}>
          <Button variant="outline" className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Create your first {documentType}
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <Suspense
          key={doc.documentId}
          fallback={<Skeleton className="h-16 w-full" />}
        >
          <DocumentItem {...doc} basePath={basePath} />
        </Suspense>
      ))}
    </div>
  );
}

export function DocumentList({
  documentType,
  title,
  description,
  basePath,
  projectId,
  dataset,
  showCreateButton = true,
}: DocumentListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {showCreateButton && (
          <Link href={`${basePath}/new`}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New {documentType}
            </Button>
          </Link>
        )}
      </div>

      <Suspense fallback={<DocumentListFallback />}>
        <DocumentListContent
          documentType={documentType}
          basePath={basePath}
          projectId={projectId}
          dataset={dataset}
        />
      </Suspense>
    </div>
  );
}
