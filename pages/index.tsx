import CardContainer from "../components/CardContainer";
import Layout from "../components/Layout";
import data from "../data/db.json";

export default function Home() {
  return (
    <Layout>
      <CardContainer data={data} />
    </Layout>
  );
}
