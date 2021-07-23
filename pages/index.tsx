import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useSwr from "swr";
import Button from "@material-ui/core/Button";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = ({ data2 }: any) => {
  const { data, error } = useSwr("/api/hello", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Hello world</title>
      </Head>
      {data.name}
      <br />
      {data2.title}
      {JSON.stringify(data2)}
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
};

export async function getServerSideProps() {
  const data2 = await fetcher("https://jsonplaceholder.typicode.com/posts/1");

  return { props: { data2 } };
}

export default Home;
