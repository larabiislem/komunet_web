"use client";
import { Provider } from "react-redux";
import postStore from "../store";

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={postStore}>{children}</Provider>;
}