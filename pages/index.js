import Link from "next/link";
import Layout from '@/Components/layouts/Layout';

const Home = () => {
  return (
    <>
     {/* <Layout> */}
      <h1 className="text-4xl text-bold text-center mt-10">
        Viva Scheduling Landing Page
      </h1>

      <Link href="/login" className="text-bold">
        Login
      </Link>
      {/* </Layout> */}
    </>

  );
};
export default Home;
