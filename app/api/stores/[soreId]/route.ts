import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { soreId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is requred", { status: 400 });
    }

    if (!params.soreId) {
      return new NextResponse("Store id is requred", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.soreId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
export async function DELETE(
  _req: Request,
  { params }: { params: { soreId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }

    if (!params.soreId) {
      return new NextResponse("Store id is requred", { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.soreId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
