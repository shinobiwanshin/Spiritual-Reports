"use client";

import { ServiceForm } from "../../../service-form";
import { updateService } from "../../../actions/services";

interface EditServiceClientProps {
  id: number;
  initialData: {
    slug: string;
    title: string;
    subtitle: string;
    duration: string;
    description: string;
    highlights: string[];
    iconName: string;
    accent: string;
    featured: boolean | null;
    price: number;
  };
}

export function EditServiceClient({ id, initialData }: EditServiceClientProps) {
  const action = async (formData: FormData) => {
    await updateService(id, formData);
  };

  return <ServiceForm action={action} initialData={initialData} />;
}
