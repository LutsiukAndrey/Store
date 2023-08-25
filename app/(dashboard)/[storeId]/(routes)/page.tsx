import { getStockCount } from "@/actions/getStockCount";
import { getSalesCount } from "@/actions/getSalesCount";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formater } from "@/lib/utils";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Overwiew from "@/components/Overwiew";
import { getGraphRevenue } from "@/actions/getGraphRevenue";

interface DashboardProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);

  const salesCount = await getSalesCount(params.storeId);

  const productsInStock = await getStockCount(params.storeId);

  const graphRevenue = await getGraphRevenue(params.storeId);

  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />

        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className=" flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className=" text-sm font-medium">
                Total Revenue
              </CardTitle>
              <AttachMoneyOutlinedIcon
                sx={{ width: "20px", height: "20px" }}
                className=" text-muted-foreground"
              />
            </CardHeader>
            <CardContent>
              <div className=" text-2xl font-bold">
                {formater.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className=" flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className=" text-sm font-medium">Sales</CardTitle>
              <CreditScoreOutlinedIcon
                sx={{ width: "20px", height: "20px" }}
                className=" text-muted-foreground"
              />
            </CardHeader>
            <CardContent>
              <div className=" text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className=" flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className=" text-sm font-medium">
                Products in Stock
              </CardTitle>
              <Inventory2OutlinedIcon
                sx={{ width: "20px", height: "20px" }}
                className=" text-muted-foreground"
              />
            </CardHeader>
            <CardContent>
              <div className=" text-2xl font-bold">{productsInStock}</div>
            </CardContent>
          </Card>
        </div>
        <Card className=" col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className=" pl-2">
            <Overwiew data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
