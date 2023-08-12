import prismadb from "@/lib/prismadb";

interface DashboardProps {
  params: { soreId: string };
}

const DashboardPage: React.FC<DashboardProps> = async ({ params }) => {
  console.log(params);
  const store = await prismadb.store.findFirst({
    where: {
      id: params.soreId,
    },
  });
  // console.log(store);
  return <div>Active Store: {store?.name}</div>;
};

export default DashboardPage;
