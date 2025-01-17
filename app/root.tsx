import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";

export const meta: MetaFunction = () => [{
  charset: "utf-8",
  title: "Crowdfunding Dapp",
  viewport: "width=device-width,initial-scale=1",
}];

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gradient-to-br from-purple-900 to-blue-900 text-white min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}