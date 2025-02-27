import sdk, { Context } from "@farcaster/frame-sdk";
import React from "react";

import { Loading } from "@/components/ui/loading";

const FAKE_FRAME_CONTEXT: Context.FrameContext | undefined =
  process.env.NODE_ENV === "development"
    ? {
        user: {
          fid: 1287,
          pfpUrl:
            "https://i.seadn.io/gcs/files/ed56e6b9a1b22720ce7490524db333e0.jpg?w=500&auto=format",
        },
        client: {
          clientFid: 9152,
          added: false,
          safeAreaInsets: {
            bottom: 0,
            top: 0,
            left: 0,
            right: 0
          }
        },
        // @ts-ignore-next-line
        fakePayload: true,
      }
    : undefined;

type FrameContextProviderContextValue = {
  fid: number;
  pfpUrl: string | undefined;
  frameAdded: boolean;
  safeAreaInsets?: Context.SafeAreaInsets;
};

const FrameContextProviderContext =
  React.createContext<FrameContextProviderContextValue>([] as never);

function FrameContextProvider({ children }: React.PropsWithChildren) {
  const [noFrameContextFound, setNoFrameContextFound] =
    React.useState<boolean>(false);


  const [frameContext, setFrameContext] = React.useState<Context.FrameContext | undefined>(FAKE_FRAME_CONTEXT);

  const checkFrameContext = React.useCallback(async () => {
    const ctx: Context.FrameContext = await sdk.context;

    if (
      typeof ctx !== "undefined" &&
      ctx !== null &&
      typeof frameContext === "undefined"
    ) {
      setFrameContext(ctx);
    } else {
      setNoFrameContextFound(true);
    }
  }, [frameContext]);

  React.useEffect(() => {
    if (typeof frameContext === "undefined") {
      checkFrameContext();
    }
  }, [checkFrameContext, frameContext]);

  if (noFrameContextFound) {
    return <Loading />;
  }

  if (typeof frameContext === "undefined") {
    return <Loading />;
  }

  return (
    <FrameContextProviderContext.Provider
      value={{ fid: frameContext.user.fid, pfpUrl: frameContext.user.pfpUrl, frameAdded: frameContext.client.added, safeAreaInsets: frameContext.client.safeAreaInsets }}
    >
      {children}
    </FrameContextProviderContext.Provider>
  );
}

export const useViewer = () => {
  const { fid, pfpUrl, frameAdded } = React.useContext(FrameContextProviderContext);
  return { fid, pfpUrl, frameAdded };
};

export const useSafeArea = () => {
  const { safeAreaInsets } = React.useContext(FrameContextProviderContext);
  return { safeAreaInsets };
};

export { FrameContextProvider };
