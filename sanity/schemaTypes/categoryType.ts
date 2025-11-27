import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => [
        Rule.required().error("Category title is required"),
        Rule.max(50).warning("Keep category names concise"),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => [
        Rule.required().error("Slug is required for URL generation"),
      ],
    }),
    defineField({
      name: "description",
      type: "text",
      description: "Brief description of what courses fall under this category",
      validation: (Rule) => [
        Rule.max(200).warning("Keep descriptions under 200 characters"),
      ],
    }),
    defineField({
      name: "icon",
      type: "string",
      description: "Icon name from lucide-react (e.g., 'code', 'palette', 'database')",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Category",
        subtitle: subtitle || "No description",
      };
    },
  },
});

