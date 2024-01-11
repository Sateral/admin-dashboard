import Navbar from "@/components/Navbar";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const category = await prismadb.category.findFirst();

  if (!category) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
