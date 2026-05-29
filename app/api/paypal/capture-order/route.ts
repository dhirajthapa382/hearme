import { NextResponse } from "next/server";

const PAYPAL_BASE_URL = "https://api-m.paypal.com";

const CLIENT_ID =
  "AR3A_xntr6nV2xrirpCgyRGD5YjAtVD3d2pGt7DePA_kQRzEUDV4XN4mUwqydGszJrWw4Wnx1UPQUP-V";

const SECRET =
  "EIDpObXV_k3BKfNxY1kd8S8ZT7NsCQ7lG-zhNWYx-td0u0FPQTzW33T5Q0Y-yyiRBlYJ5oaMDQjxrEbJ";

async function getAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${SECRET}`).toString("base64");

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  console.log("TOKEN:", data);

  return data.access_token;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const accessToken = await getAccessToken();

    const response = await fetch(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${body.orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log("CAPTURE:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.log("PAYPAL CAPTURE ERROR:", error);

    return NextResponse.json({
      error: "Capture failed",
    });
  }
}