"use client";

import { Suspense } from "react";
import {
  useDocument,
  useEditDocument,
  useDocuments,
  useDocumentProjection,
  type DocumentHandle,
} from "@sanity/sdk-react";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReferenceInputProps extends DocumentHandle {
  path: string;
  label: string;
  referenceType: string;
  placeholder?: string;
}

interface SanityReference {
  _type: "reference";
  _ref: string;
}

function ReferenceInputFallback({ label }: { label: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// Component to display a single reference option with its title
function ReferenceOption({
  documentId,
  documentType,
  projectId,
  dataset,
}: DocumentHandle) {
  const { data } = useDocumentProjection({
    documentId,
    documentType,
    projectId,
    dataset,
    projection: "{ title }",
  });

  return <>{(data as { title?: string })?.title || "Untitled"}</>;
}

function ReferenceInputField({
  path,
  label,
  referenceType,
  placeholder,
  projectId,
  dataset,
  ...handle
}: ReferenceInputProps) {
  // Get current reference value
  const { data: currentRef } = useDocument({
    ...handle,
    projectId,
    dataset,
    path,
  });
  const editRef = useEditDocument({ ...handle, projectId, dataset, path });

  // Fetch all documents of the reference type
  const { data: availableDocuments } = useDocuments({
    documentType: referenceType,
    projectId,
    dataset,
  });

  const currentRefId = (currentRef as SanityReference)?._ref ?? "";

  const handleChange = (documentId: string) => {
    if (documentId === "__none__") {
      editRef(null);
    } else {
      editRef({
        _type: "reference",
        _ref: documentId,
      });
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={path}>{label}</Label>
      <Select value={currentRefId || "__none__"} onValueChange={handleChange}>
        <SelectTrigger id={path}>
          <SelectValue placeholder={placeholder ?? "Select..."} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__none__">
            <span className="text-muted-foreground">None</span>
          </SelectItem>
          {availableDocuments?.map((doc) => (
            <SelectItem key={doc.documentId} value={doc.documentId}>
              <Suspense fallback={doc.documentId}>
                <ReferenceOption {...doc} />
              </Suspense>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ReferenceInput(props: ReferenceInputProps) {
  return (
    <Suspense fallback={<ReferenceInputFallback label={props.label} />}>
      <ReferenceInputField {...props} />
    </Suspense>
  );
}
