"use client";

import Link from "next/link";
import type { DocumentHandle } from "@sanity/sdk-react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface OpenInStudioProps {
  handle: DocumentHandle;
}

export function OpenInStudio({ handle }: OpenInStudioProps) {
  // Construct the Studio URL for the document
  // Format: /studio/structure/[documentType];[documentId]
  const studioUrl = `/studio/structure/${handle.documentType};${handle.documentId}`;

  return (
    <Button variant="outline" size="sm" asChild>
      <Link href={studioUrl} target="_blank">
        <ExternalLink className="h-4 w-4 mr-2" />
        Open in Studio
      </Link>
    </Button>
  );
}
