import Navbar from "./components/ui/NavBar";
import AppRouter from "./routes/AppRouter";
import useCheckLoginStatus from "./hooks/useCheckLoginStatus";
import useInterceptors from "./hooks/useInterceptors";

export default function App() {
  useCheckLoginStatus();
  useInterceptors();

  return (
    <main className="">
      <Navbar />
      <AppRouter />
    </main>
  );
}
