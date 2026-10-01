import { NextRequest, NextResponse } from "next/server";

const TARGET_BASE_URL = "https://sport-api.eunglyzhia.com/api/v1";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join("/");
  const search = request.nextUrl.search;
  const targetUrl = `${TARGET_BASE_URL}/${pathStr}${search}`;

  try {
    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.text();
    return new NextResponse(data, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy GET error:", error);
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join("/");
  const targetUrl = `${TARGET_BASE_URL}/${pathStr}`;

  try {
    const contentType = request.headers.get("content-type") || "";

    let body: any;
    const headers: Record<string, string> = {};

    if (contentType.includes("multipart/form-data")) {
      body = await request.formData();
    } else if (contentType.includes("application/json")) {
      body = await request.text();
      headers["Content-Type"] = "application/json";
    } else {
      body = await request.text();
    }

    const res = await fetch(targetUrl, {
      method: "POST",
      headers,
      body,
    });

    const data = await res.text();
    return new NextResponse(data, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy POST error:", error);
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join("/");
  const targetUrl = `${TARGET_BASE_URL}/${pathStr}`;

  try {
    const body = await request.text();
    const res = await fetch(targetUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const data = await res.text();
    return new NextResponse(data, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy PATCH error:", error);
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join("/");
  const targetUrl = `${TARGET_BASE_URL}/${pathStr}`;

  try {
    const res = await fetch(targetUrl, {
      method: "DELETE",
    });

    const data = await res.text();
    return new NextResponse(data, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy DELETE error:", error);
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
  }
}
