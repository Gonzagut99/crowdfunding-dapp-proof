var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 66,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 116,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-3A5TEPCV.css";

// app/root.tsx
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var meta = () => [{
  charset: "utf-8",
  title: "Crowdfunding Dapp",
  viewport: "width=device-width,initial-scale=1"
}];
function links() {
  return [{ rel: "stylesheet", href: tailwind_default }];
}
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { className: "bg-gradient-to-br from-purple-900 to-blue-900 text-white min-h-screen", children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var contractABI = [
  "event TokensPurchased(address indexed purchaser, uint256 amountSpent, uint256 tokensMinted)",
  "event SaleFinalized()",
  "function buyTokens() external payable",
  "function finalizeSale() external",
  "function isSaleActive() public view returns (bool)",
  "function cap() public view returns (uint256)",
  "function saleStart() public view returns (uint256)",
  "function saleEnd() public view returns (uint256)",
  "function rate() public view returns (uint256)",
  "function totalSupply() public view returns (uint256)"
], contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
function Index() {
  let [provider, setProvider] = useState(null), [contract, setContract] = useState(null), [account, setAccount] = useState(null), [saleActive, setSaleActive] = useState(!1), [cap, setCap] = useState(""), [totalSupply, setTotalSupply] = useState(""), [saleStart, setSaleStart] = useState(""), [saleEnd, setSaleEnd] = useState(""), [rate, setRate] = useState(""), [amount, setAmount] = useState("");
  return useEffect(() => ((async () => {
    if (typeof window.ethereum < "u") {
      let provider2 = new ethers.BrowserProvider(window.ethereum), signer = await provider2.getSigner(), contract2 = new ethers.Contract(contractAddress, contractABI, signer);
      setProvider(provider2), setContract(contract2), setAccount(await signer.getAddress());
      let active = await contract2.isSaleActive(), capValue = await contract2.cap(), supplyValue = await contract2.totalSupply(), startValue = await contract2.saleStart(), endValue = await contract2.saleEnd(), rateValue = await contract2.rate();
      setSaleActive(active), setCap(ethers.formatEther(capValue)), setTotalSupply(ethers.formatEther(supplyValue)), setSaleStart(new Date(Number(startValue) * 1e3).toLocaleString()), setSaleEnd(new Date(Number(endValue) * 1e3).toLocaleString()), setRate(rateValue.toString()), contract2.on("TokensPurchased", (purchaser, amountSpent, tokensMinted) => {
        console.log(`Tokens Purchased: ${ethers.formatEther(tokensMinted)} by ${purchaser}`), contract2.totalSupply().then((newSupply) => {
          setTotalSupply(ethers.formatEther(newSupply));
        });
      }), contract2.on("SaleFinalized", () => {
        console.log("Sale Finalized"), setSaleActive(!1);
      });
    }
  })(), () => {
    contract && contract.removeAllListeners();
  }), []), /* @__PURE__ */ jsxDEV3("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxDEV3("h1", { className: "text-4xl font-bold mb-8 text-center", children: "Crowdfunding Dapp" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 97,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("div", { className: "bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-lg shadow-xl", children: [
      /* @__PURE__ */ jsxDEV3("p", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDEV3("span", { className: "font-semibold", children: "Connected Account:" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 99,
          columnNumber: 29
        }, this),
        " ",
        account
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 99,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("p", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDEV3("span", { className: "font-semibold", children: "Sale Active:" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 100,
          columnNumber: 29
        }, this),
        " ",
        saleActive ? "Yes" : "No"
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 100,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("p", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDEV3("span", { className: "font-semibold", children: "Cap:" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 101,
          columnNumber: 29
        }, this),
        " ",
        cap,
        " tokens"
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 101,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("p", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDEV3("span", { className: "font-semibold", children: "Total Supply:" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 102,
          columnNumber: 29
        }, this),
        " ",
        totalSupply,
        " tokens"
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 102,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("p", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDEV3("span", { className: "font-semibold", children: "Sale Start:" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 103,
          columnNumber: 29
        }, this),
        " ",
        saleStart
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 103,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("p", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDEV3("span", { className: "font-semibold", children: "Sale End:" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 104,
          columnNumber: 29
        }, this),
        " ",
        saleEnd
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 104,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("p", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDEV3("span", { className: "font-semibold", children: "Rate:" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 105,
          columnNumber: 29
        }, this),
        " ",
        rate,
        " tokens per ETH"
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 105,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsxDEV3(
          "input",
          {
            type: "text",
            value: amount,
            onChange: (e) => setAmount(e.target.value),
            placeholder: "Amount in ETH",
            className: "w-full p-2 mb-4 bg-white bg-opacity-20 rounded text-white placeholder-gray-300"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 107,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV3(
          "button",
          {
            onClick: async () => {
              if (contract && amount)
                try {
                  await (await contract.buyTokens({ value: ethers.parseEther(amount) })).wait(), console.log("Tokens purchased successfully");
                } catch (error) {
                  console.error("Error buying tokens:", error);
                }
            },
            disabled: !saleActive,
            className: "w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 px-4 rounded hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed",
            children: "Buy Tokens"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 114,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 106,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 98,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 96,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-V4TDCRQS.js", imports: ["/build/_shared/chunk-YMSA6ONA.js", "/build/_shared/chunk-EN3P3HGM.js", "/build/_shared/chunk-UIDJAVJF.js", "/build/_shared/chunk-PHP2QVJK.js", "/build/_shared/chunk-PVMJWBJB.js", "/build/_shared/chunk-ATEPPW6H.js", "/build/_shared/chunk-RGTVMBVK.js", "/build/_shared/chunk-EBWBTRXC.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-TFRGP5LG.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-3DSXZWC5.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "8d209874", hmr: { runtime: "/build/_shared/chunk-ATEPPW6H.js", timestamp: 1728904069317 }, url: "/build/manifest-8D209874.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
