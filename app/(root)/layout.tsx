import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const category = await prismadb.category.findFirst();

  if (category) {
    redirect(`/categories`);
  }

  return <>{children}</>;
}
