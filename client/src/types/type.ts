import type { ChangeEvent } from "react";

export type LabeledInputType = {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  maxlength?: number;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type BlogCardProps = {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
};

