import { QRConfigProvider } from "../store";
import { AppLayout } from "./AppLayout";

export function App() {
  return (
    <QRConfigProvider>
      <AppLayout />
    </QRConfigProvider>
  );
}
