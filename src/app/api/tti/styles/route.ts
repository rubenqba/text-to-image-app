import env from "@config/env";
import { DesignStyle } from "@model/test-to-image";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

// Función para capitalizar la primera letra de cada palabra en una cadena.
function capitalizeWords(str: string): string {
  return str.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
  );
}

export async function GET() {
  console.log("fetching API styles...");
  const response = await fetch(`${env.API_URL}/design-lab/images/styles`);

  if (!response.ok) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const styles: string[] = await response.json();

  // Convertir cada estilo a su respectivo modelo StyleModel
  const styleDesigns: DesignStyle[] = styles.map((style) => {
    // Reemplazar THREE_D_ por 3D, quitar guiones bajos (_) y Capitalizar cada palabra
    let formattedStyle = style
      .toLowerCase()
      .replace(/three_d_/g, "3D_")
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Crear el modelo con el valor original y el valor formateado
    return { key: style, label: formattedStyle };
  });

  return NextResponse.json(styleDesigns);
}
