"use client";

import { Suspense } from "react";
import { useDocument, type DocumentHandle } from "@sanity/sdk-react";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

interface ImageInputProps extends DocumentHandle {
  path: string;
  label: string;
}

interface SanityImageAsset {
  _type: "image";
  asset?: {
    _type: "reference";
    _ref: string;
  };
}

function ImageInputFallback({ label }: { label: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

function ImageInputField({ path, label, ...handle }: ImageInputProps) {
  const { data: imageData } = useDocument({ ...handle, path });

  const image = imageData as SanityImageAsset | null;
  const hasImage = image?.asset?._ref;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Card className="p-4">
        {hasImage ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              <span>Image uploaded</span>
            </div>
            <p className="text-xs text-muted-foreground break-all">
              Asset: {image.asset?._ref}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
            <ImageIcon className="h-10 w-10 mb-2" />
            <p className="text-sm">No image uploaded</p>
            <p className="text-xs mt-1">
              Image upload coming soon - use Sanity Studio for now
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

export function ImageInput(props: ImageInputProps) {
  return (
    <Suspense fallback={<ImageInputFallback label={props.label} />}>
      <ImageInputField {...props} />
    </Suspense>
  );
}


