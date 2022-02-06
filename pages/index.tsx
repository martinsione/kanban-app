import Board from "../components/Board";
import Layout from "../components/Layout";
import TopBar from "../components/TopBar";

export default function Home() {
  return (
    <Layout>
      <TopBar />
      <Board />
    </Layout>
  );
}
