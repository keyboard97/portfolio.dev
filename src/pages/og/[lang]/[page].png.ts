import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

export const getStaticPaths: GetStaticPaths = () => [
  { params: { lang: "en", page: "home" } },
  { params: { lang: "en", page: "projects" } },
  { params: { lang: "es", page: "home" } },
  { params: { lang: "es", page: "projects" } },
];

const CONTENT: Record<string, Record<string, { title: string; subtitle: string; description: string }>> = {
  en: {
    home: {
      title: "Adrián Rodríguez",
      subtitle: "Software Engineer · Fullstack Developer",
      description: "Building elegant web applications and pioneering digital experiences.",
    },
    projects: {
      title: "Projects",
      subtitle: "Adrián Rodríguez",
      description: "A collection of web apps, tools, and experiments.",
    },
  },
  es: {
    home: {
      title: "Adrián Rodríguez",
      subtitle: "Ingeniero Informático · Desarrollador Fullstack",
      description: "Construyendo aplicaciones web elegantes y experiencias digitales.",
    },
    projects: {
      title: "Proyectos",
      subtitle: "Adrián Rodríguez",
      description: "Una colección de apps web, herramientas y experimentos.",
    },
  },
};

let fontCache: { regular: Buffer; bold: Buffer } | null = null;

async function getFonts() {
  if (fontCache) return fontCache;
  const base = fileURLToPath(
    new URL("../../../../node_modules/@fontsource/inter/files/", import.meta.url)
  );
  const [regular, bold] = await Promise.all([
    readFile(base + "inter-latin-400-normal.woff"),
    readFile(base + "inter-latin-700-normal.woff"),
  ]);
  fontCache = { regular, bold };
  return fontCache;
}

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang === "es" ? "es" : "en";
  const page = params.page === "projects" ? "projects" : "home";
  const content = CONTENT[lang][page];
  const fonts = await getFonts();

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#0f172a",
          fontFamily: "Inter",
          position: "relative",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #5eead4 0%, #1d19d8 100%)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column", gap: "16px" },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 76,
                      fontWeight: 700,
                      color: "#ffffff",
                      letterSpacing: "-3px",
                      lineHeight: 1,
                    },
                    children: content.title,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 28,
                      fontWeight: 400,
                      color: "#5eead4",
                      letterSpacing: "-0.5px",
                    },
                    children: content.subtitle,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column", gap: "20px" },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 24,
                      color: "rgba(255,255,255,0.5)",
                      maxWidth: "800px",
                      lineHeight: 1.5,
                      fontWeight: 400,
                    },
                    children: content.description,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: { display: "flex", alignItems: "center", gap: "14px" },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            width: "40px",
                            height: "3px",
                            background: "#5eead4",
                            borderRadius: "2px",
                          },
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: 20,
                            color: "rgba(255,255,255,0.35)",
                            fontWeight: 400,
                            letterSpacing: "0.5px",
                          },
                          children: "keyboard97.netlify.app",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    } as any,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: fonts.regular, weight: 400, style: "normal" },
        { name: "Inter", data: fonts.bold, weight: 700, style: "normal" },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
