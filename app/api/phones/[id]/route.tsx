import { NextResponse } from "next/server";

const url = process.env.API_URL;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log("ID:", id);

  try {
    const result = await fetch(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const product = await result.json();
    return NextResponse.json({ data: product });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log("ID a eliminar:", id);

  try {
    const result = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });
    const data = await result.json();    
    if (result.status === 404) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    if (result.status === 405) {
      return NextResponse.json(
        { message: "Method Not Allowed" },
        { status: 405 }
      );
    }

    return NextResponse.json({ message: data.message }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;  
  try {    
    const body = await request.json();    
    const result = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(body),
    });
    const data = result.ok ? await result.json() : null;    
    if (result.status === 404) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    if (result.status === 405) {
      return NextResponse.json(
        { message: "Method Not Allowed" },
        { status: 405 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: "Empty response from API" },
        { status: 204 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}