import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { toast } from "react-hot-toast";

export async function GET(
  _req: Request,
  { params }: { params: { productId: string; billboardId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("product id is requred", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
      toast.error("Unautorized");
    }

    if (!name) {
      toast.error("name is requred");
      return new NextResponse("name is requred", { status: 400 });
    }

    if (!images || !images.length) {
      toast.error("images is requred");
      return new NextResponse("images is requred", { status: 400 });
    }
    if (!price) {
      toast.error("price is requred");
      return new NextResponse("price is requred", { status: 400 });
    }
    if (!categoryId) {
      toast.error("categoryId is requred");
      return new NextResponse("categoryId is requred", { status: 400 });
    }
    if (!colorId) {
      toast.error("colorId is requred");
      return new NextResponse("colorId is requred", { status: 400 });
    }
    if (!sizeId) {
      toast.error("sizeId is requred");
      return new NextResponse("sizeId is requred", { status: 400 });
    }
    if (!params.productId) {
      toast.error("product id is requred");
      return new NextResponse("product id is requred", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_PATCH]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("product id is requred", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
