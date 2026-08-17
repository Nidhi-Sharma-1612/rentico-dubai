"use client";

import { LogOut } from "lucide-react";
import { signOut } from "./actions";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-900/60 transition-colors hover:bg-navy-900/5 hover:text-navy-900"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </form>
  );
}
