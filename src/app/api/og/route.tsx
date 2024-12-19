/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const DEFAULT_PARAMS = {
  name: "touchgrass",
  imageUrl:
    "https://img.reservoir.tools/images/v2/base/i9YO%2F4yHXUdJsWcTqhqvf0HuRNOfH0JlxmkF8fFc%2Bzvc7Xi%2FCKncUl%2B9XCqdon72bQ1ezWBTciHWXLEfYlTbF19J7Qcl9gZNstO7FPIKV%2FWQOA9oJBKmCtsZHaB%2B4j3R?width=412",
  username: "eriks",
  pfpUrl:
    "https://i.seadn.io/s/raw/files/ad549379a71c7948b405e10d84e5e7b7.png?w=500&auto=format",
  chain: "Base",
} as const;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || DEFAULT_PARAMS.name;
  const imageUrl = searchParams.get("imageUrl") || DEFAULT_PARAMS.imageUrl;
  const username = searchParams.get("username") || DEFAULT_PARAMS.username;
  const pfpUrl = searchParams.get("pfpUrl") || DEFAULT_PARAMS.pfpUrl;

  try {
    const interRegular = await fetch(
      new URL(
        "https://wc-featured-mint.vercel.app/fonts/Inter-Regular.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());

    const interMedium = await fetch(
      new URL(
        "https://wc-featured-mint.vercel.app/fonts/Inter-Medium.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());

    const interSemiBold = await fetch(
      new URL(
        "https://wc-featured-mint.vercel.app/fonts/Inter-SemiBold.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
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
            alt={name}
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
                {name}
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
                {pfpUrl && (
                  <img
                    src={pfpUrl}
                    alt={username}
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
                  {username}
                </span>
                <span>on</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://wc-featured-mint.vercel.app/base-logo.png"
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
  } catch {
    return new Response("Failed to generate image", { status: 500 });
  }
}
