import env from "@config/env";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

type AccessToken = {
  access_token: string | null;
  expires_in: number | null;
};

let cachedToken: AccessToken = {
  access_token: null,
  expires_in: null,
};

async function getAccessToken() {
  if (
    cachedToken.access_token &&
    cachedToken.expires_in &&
    cachedToken.expires_in > Date.now()
  ) {
    return cachedToken.access_token;
  }

  const clientId = env.KEYCLOAK_CLIENT_ID;
  const clientSecret = env.KEYCLOAK_CLIENT_SECRET;
  const tokenUrl = `https://auth.gyfted.io/realms/${env.KEYCLOAK_REALM}/protocol/openid-connect/token`;

  console.log("Fetching token from", tokenUrl);
  const tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(
      `Error al obtener el token de acceso.\n${tokenResponse.statusText}`
    );
  }

  const data = await tokenResponse.json();
  const accessToken = data.access_token;
  const expiresIn = data.expires_in; // Tiempo en segundos hasta que el token expire

  // Almacena el token en caché y calcula la fecha de expiración
  cachedToken = {
    access_token: accessToken,
    expires_in: Date.now() + expiresIn * 1000 - 30000, // Restamos 30 segundos para asegurarnos de que actualizamos antes de que expire
  };

  return accessToken;
}
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const accessToken = await getAccessToken();

    const response = await fetch(`${env.API_URL}/design-lab/images/generate`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      console.error("API Error", await response.text());
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (catchError) {
    return NextResponse.json(
      { error: (catchError as Error).message },
      { status: 500 }
    );
  }
}
