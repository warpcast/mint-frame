/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  API_URL: string;
  PUBLIC_URL: string;
}

type ApiFeaturedMint = {
  name: string;
  imageUrl: string;
  description?: string;
  creator: {
    fid: number;
    username?: string;
    displayName: string;
    pfp?: {
      url: string;
    };
  };
  isMinting: boolean;
};

export const onRequest = async (
  context: EventContext<Env, string, unknown>
) => {
  try {
    const [
      {
        result: { mint },
      },
      interRegular,
      interMedium,
      interSemiBold,
    ] = await Promise.all([
      fetch(`${context.env.API_URL}/v1/featured-mint`).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch mint data");
        }
        return response.json();
      }) as Promise<{ result: { mint: ApiFeaturedMint } }>,
      fetch(new URL(`${context.env.PUBLIC_URL}/fonts/Inter-Regular.ttf`)).then(
        (res) => res.arrayBuffer()
      ),
      fetch(new URL(`${context.env.PUBLIC_URL}/fonts/Inter-Medium.ttf`)).then(
        (res) => res.arrayBuffer()
      ),
      fetch(new URL(`${context.env.PUBLIC_URL}/fonts/Inter-SemiBold.ttf`)).then(
        (res) => res.arrayBuffer()
      ),
    ]);

    const imageUrl = mint.imageUrl.replace("?width=250", "?width=1600");

    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            width: "1236px",
            height: "825px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "black",
          }}
        >
          {/* Background Image */}
          <img
            src={imageUrl}
            alt={mint.name}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Live Pill */}
          {mint.isMinting && (
            <div
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                padding: "12px 24px",
                alignItems: "center",
                gap: "12px",
                borderRadius: "999px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "30px",
                  height: "30px",
                  padding: "9px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "15px",
                  background: "rgba(255, 255, 255, 0.30)",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "6px",
                    background: "#FFFFFF",
                  }}
                />
              </div>
              <span
                style={{
                  color: "#FFF",
                  fontFamily: "Inter",
                  fontSize: "36px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "48px",
                  letterSpacing: "-0.27px",
                }}
              >
                LIVE
              </span>
            </div>
          )}

          {/* Info Box */}
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              left: "24px",
              width: "1176px",
              height: "204px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: "30px",
              flexShrink: 0,
              borderRadius: "36px",
              background: "rgba(0, 0, 0, 0.50)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                flex: "1 0 0",
              }}
            >
              <div
                style={{
                  color: "#FFF",
                  fontFamily: "Inter",
                  fontSize: "72px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "96px",
                  letterSpacing: "-0.27px",
                }}
              >
                {mint.name}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "#9FA3AF",
                  fontFamily: "Inter",
                  fontSize: "45px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "60px",
                  letterSpacing: "-0.45px",
                }}
              >
                <span>by</span>
                {mint.creator.pfp && (
                  <img
                    src={mint.creator.pfp.url}
                    alt={mint.creator.displayName}
                    width="48"
                    height="48"
                    style={{
                      borderRadius: "48px",
                      background: "lightgray",
                      objectFit: "cover",
                    }}
                  />
                )}
                <span
                  style={{
                    color: "#FFF",
                    fontFamily: "Inter",
                    fontSize: "45px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "60px",
                    letterSpacing: "-0.45px",
                  }}
                >
                  {mint.creator.username}
                </span>
                <span>on</span>
                <img
                  src={`${context.env.PUBLIC_URL}/base-logo.png`}
                  alt="Base"
                  width="48"
                  height="48"
                  style={{
                    borderRadius: "48px",
                    background: "lightgray",
                    objectFit: "cover",
                  }}
                />
                <span
                  style={{
                    color: "#FFF",
                    fontFamily: "Inter",
                    fontSize: "45px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "60px",
                    letterSpacing: "-0.45px",
                  }}
                >
                  Base
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1236,
        height: 825,
        fonts: [
          {
            name: "Inter",
            data: interRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Inter",
            data: interMedium,
            weight: 500,
            style: "normal",
          },
          {
            name: "Inter",
            data: interSemiBold,
            weight: 600,
            style: "normal",
          },
        ],
      }
    );

    const headers = new Headers(imageResponse.headers);
    headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=59"
    );

    return new Response(imageResponse.body, {
      headers,
      status: imageResponse.status,
      statusText: imageResponse.statusText,
    });
  } catch {
    return new Response("Failed to generate image", {
      status: 500,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
};
