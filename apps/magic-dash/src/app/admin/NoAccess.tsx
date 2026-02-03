import { AppHeader } from "@/app/components/AppHeader";
import Link from "next/link";

export const NoAccess = () => {
  return (
    <>
      <AppHeader />
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Admin access required</h1>
        <p className="mt-2 text-sm text-gray-600">
          This account is not assigned as an admin. If you are a teacher,
          visit your tools dashboard.
        </p>
        <Link className="mt-4 inline-flex text-sm font-semibold underline" href="/tools">
          Go to Tools
        </Link>
      </div>
    </>
  );
};
