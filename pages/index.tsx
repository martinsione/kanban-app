import Board from "../components/Board";
import Layout from "../components/Layout";
import { useStore } from "../context";

export default function Home() {
  return (
    <Layout>
      <Board />
    </Layout>
  );
}
