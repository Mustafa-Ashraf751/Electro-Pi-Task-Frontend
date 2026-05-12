import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/order-success")({
  component: OrderSuccessRedirect,
});

function OrderSuccessRedirect() {
  const nav = useNavigate();
  const { clear } = useCart();

  useEffect(() => {
    clear();
    nav({ to: "/orders" });
  }, []);

  return <p>Redirecting…</p>;
}
