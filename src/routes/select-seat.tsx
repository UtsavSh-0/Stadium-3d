import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/select-seat")({
  beforeLoad: () => {
    throw redirect({ to: "/stadium" });
  },
});
