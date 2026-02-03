"use client";

import { Button, Form } from "@magic-dash/ui";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="w-full border-b border-black px-4 py-3">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6">
        <nav className="flex items-center gap-6 text-sm font-semibold">
          <Link href="/admin" className="text-base">
            MagicDash
          </Link>
          <Link href="/admin">Admin</Link>
          <Link href="/tools">Tools</Link>
        </nav>
        <Form.Root action="/api/auth/signout" method="post">
          <Form.Submit asChild>
            <Button variant="text">Sign out</Button>
          </Form.Submit>
        </Form.Root>
      </div>
    </header>
  );
}
