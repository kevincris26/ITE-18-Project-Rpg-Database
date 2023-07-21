import { useFetchUser } from "../lib/authContext";
import Layout from "../components/Layout";

export default function Home() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user}>
    <h1 className="font-bold text-5xl">ROLE PLAYING GAMES</h1>
    </Layout>
  );
}