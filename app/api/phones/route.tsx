import { NextResponse } from "next/server";

const url = process.env.API_URL;

export async function GET(request: Request) {
  try {
    if (!url) {
      return NextResponse.json(
        { error: "API URL not defined" },
        { status: 500 }
      );
    }    
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const phones = await res.json();
    return NextResponse.json(phones, { status: 200 });
  } catch (error) {
    console.error("Request failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {    
    const body = await request.json();
    if (!url) {
      return NextResponse.json(
        { error: "API URL not defined" },
        { status: 500 }
      );
    }    
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Request failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}