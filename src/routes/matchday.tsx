import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/matchday")({
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
});
