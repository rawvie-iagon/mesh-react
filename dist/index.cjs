"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CardanoWallet: () => CardanoWallet,
  MeshBadge: () => MeshBadge,
  MeshProvider: () => MeshProvider,
  StakeButton: () => StakeButton,
  WalletContext: () => WalletContext,
  useAddress: () => useAddress,
  useAssets: () => useAssets,
  useLovelace: () => useLovelace,
  useNetwork: () => useNetwork,
  useRewardAddress: () => useRewardAddress,
  useWallet: () => useWallet,
  useWalletList: () => useWalletList,
  useWalletSubmit: () => useWalletSubmit
});
module.exports = __toCommonJS(src_exports);

// src/cardano-wallet/index.tsx
var import_react10 = require("react");

// src/common/button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function Button({
  children,
  isDarkMode = false,
  hideMenuList = false,
  setHideMenuList,
  onMouseEnter,
  onMouseLeave
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      className: `mesh-mr-menu-list mesh-flex mesh-w-60 mesh-items-center mesh-justify-center mesh-rounded-t-md mesh-border mesh-px-4 mesh-py-2 mesh-text-lg mesh-font-normal mesh-shadow-sm ${isDarkMode ? `mesh-bg-neutral-950	mesh-text-neutral-50` : `mesh-bg-neutral-50	mesh-text-neutral-950`}`,
      onClick: () => setHideMenuList && setHideMenuList(!hideMenuList),
      onMouseEnter,
      onMouseLeave,
      children
    }
  );
}

// src/hooks/useAddress.ts
var import_react2 = require("react");

// src/contexts/WalletContext.ts
var import_react = require("react");
var import_wallet = require("@meshsdk/wallet");
var INITIAL_STATE = {
  walletName: "",
  walletInstance: {}
};
var useWalletStore = () => {
  const [error, setError] = (0, import_react.useState)(void 0);
  const [connectingWallet, setConnectingWallet] = (0, import_react.useState)(false);
  const [connectedWalletInstance, setConnectedWalletInstance] = (0, import_react.useState)(INITIAL_STATE.walletInstance);
  const [connectedWalletName, setConnectedWalletName] = (0, import_react.useState)(
    INITIAL_STATE.walletName
  );
  const connectWallet = (0, import_react.useCallback)(
    async (walletName, extensions) => {
      setConnectingWallet(true);
      try {
        const walletInstance = await import_wallet.BrowserWallet.enable(
          walletName,
          extensions
        );
        setConnectedWalletInstance(walletInstance);
        setConnectedWalletName(walletName);
        setError(void 0);
      } catch (error2) {
        setError(error2);
      }
      setConnectingWallet(false);
    },
    []
  );
  const disconnect = (0, import_react.useCallback)(() => {
    setConnectedWalletName(INITIAL_STATE.walletName);
    setConnectedWalletInstance(INITIAL_STATE.walletInstance);
  }, []);
  return {
    hasConnectedWallet: INITIAL_STATE.walletName !== connectedWalletName,
    connectedWalletInstance,
    connectedWalletName,
    connectingWallet,
    connectWallet,
    disconnect,
    error
  };
};
var WalletContext = (0, import_react.createContext)({
  hasConnectedWallet: false,
  connectedWalletInstance: INITIAL_STATE.walletInstance,
  connectedWalletName: INITIAL_STATE.walletName,
  connectingWallet: false
});

// src/contexts/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var MeshProvider = (props) => {
  const store = useWalletStore();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(WalletContext.Provider, { value: store, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: props.children }) });
};

// src/hooks/useAddress.ts
var useAddress = (accountId = 0) => {
  const [address, setAddress] = (0, import_react2.useState)();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } = (0, import_react2.useContext)(WalletContext);
  (0, import_react2.useEffect)(() => {
    if (hasConnectedWallet) {
      connectedWalletInstance.getUsedAddresses().then((addresses) => {
        if (addresses[accountId]) {
          setAddress(addresses[accountId]);
        }
      });
    }
  }, [accountId, connectedWalletName]);
  return address;
};

// src/hooks/useAssets.ts
var import_react3 = require("react");
var useAssets = () => {
  const [assets, setAssets] = (0, import_react3.useState)();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } = (0, import_react3.useContext)(WalletContext);
  (0, import_react3.useEffect)(() => {
    if (hasConnectedWallet) {
      connectedWalletInstance.getAssets().then(setAssets);
    }
  }, [connectedWalletName]);
  return assets;
};

// src/hooks/useWalletList.ts
var import_react4 = require("react");
var import_wallet2 = require("@meshsdk/wallet");
var useWalletList = ({
  metamask = {
    network: "preprod"
  }
} = {}) => {
  const [wallets, setWallets] = (0, import_react4.useState)([]);
  (0, import_react4.useEffect)(() => {
    async function get() {
      setWallets(await import_wallet2.BrowserWallet.getAvailableWallets({ metamask }));
    }
    get();
  }, []);
  return wallets;
};

// src/hooks/useLovelace.ts
var import_react5 = require("react");
var useLovelace = () => {
  const [lovelace, setLovelace] = (0, import_react5.useState)();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } = (0, import_react5.useContext)(WalletContext);
  (0, import_react5.useEffect)(() => {
    if (hasConnectedWallet) {
      connectedWalletInstance.getLovelace().then(setLovelace);
    }
  }, [connectedWalletName]);
  return lovelace;
};

// src/hooks/useNetwork.ts
var import_react6 = require("react");
var useNetwork = () => {
  const [networkId, setNetworkId] = (0, import_react6.useState)();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } = (0, import_react6.useContext)(WalletContext);
  (0, import_react6.useEffect)(() => {
    if (hasConnectedWallet) {
      connectedWalletInstance.getNetworkId().then(setNetworkId);
    }
  }, [connectedWalletName]);
  return networkId;
};

// src/hooks/useRewardAddress.ts
var import_react7 = require("react");
var useRewardAddress = (accountId = 0) => {
  const [rewardAddress, setRewardAddress] = (0, import_react7.useState)();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } = (0, import_react7.useContext)(WalletContext);
  (0, import_react7.useEffect)(() => {
    if (hasConnectedWallet) {
      connectedWalletInstance.getRewardAddresses().then((addresses) => {
        if (addresses[accountId]) {
          setRewardAddress(addresses[accountId]);
        }
      });
    }
  }, [accountId, connectedWalletName]);
  return rewardAddress;
};

// src/hooks/useWallet.ts
var import_react8 = require("react");
var useWallet = () => {
  const {
    hasConnectedWallet,
    connectedWalletName,
    connectedWalletInstance,
    connectingWallet,
    connectWallet,
    disconnect,
    error
  } = (0, import_react8.useContext)(WalletContext);
  if (connectWallet === void 0 || disconnect === void 0) {
    throw new Error(
      "Can't call useWallet outside of the WalletProvider context"
    );
  }
  return {
    name: connectedWalletName,
    connecting: connectingWallet,
    connected: hasConnectedWallet,
    wallet: connectedWalletInstance,
    connect: connectWallet,
    disconnect,
    error
  };
};

// src/hooks/useWalletSubmit.ts
var import_react9 = require("react");
var useWalletSubmit = () => {
  const [error, setError] = (0, import_react9.useState)();
  const [result, setResult] = (0, import_react9.useState)();
  const [submitting, setSubmitting] = (0, import_react9.useState)(false);
  const { hasConnectedWallet, connectedWalletInstance } = (0, import_react9.useContext)(WalletContext);
  const submitTx = (0, import_react9.useCallback)(async (signedTx) => {
    setSubmitting(true);
    try {
      if (hasConnectedWallet) {
        const txHash = await connectedWalletInstance.submitTx(signedTx);
        setError(void 0);
        setResult(txHash);
      }
      throw new Error(
        "Please make sure to connect a wallet before calling useWalletSubmit"
      );
    } catch (error2) {
      setError(error2);
    }
    setSubmitting(false);
  }, []);
  return {
    error,
    result,
    submitting,
    submitTx
  };
};

// src/cardano-wallet/menu-item.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function MenuItem({
  icon,
  label,
  action,
  active
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      className: "mesh-flex mesh-cursor-pointer mesh-items-center mesh-px-4 mesh-py-2 mesh-opacity-80 hover:mesh-opacity-100 mesh-h-16",
      onClick: action,
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { className: "mesh-pr-2 mesh-m-1 mesh-h-8", src: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mesh-mr-menu-item mesh-text-xl mesh-font-normal mesh-text-gray-700 hover:mesh-text-black", children: label.split(" ").map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(" ") })
      ]
    }
  );
}

// src/cardano-wallet/chevron-down.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var ChevronDown = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
  "svg",
  {
    className: "mesh-m-2 mesh-h-6",
    fill: "none",
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M19 9l-7 7-7-7"
      }
    )
  }
);

// src/cardano-wallet/wallet-balance.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var WalletBalance = ({
  connected,
  connecting,
  label,
  wallet
}) => {
  const lovelace = useLovelace();
  return connected && lovelace && wallet?.icon ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("img", { className: "mesh-m-2 mesh-h-6", src: wallet.icon }),
    "\u20B3",
    " ",
    parseInt((parseInt(lovelace, 10) / 1e6).toString(), 10),
    ".",
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "mesh-text-xs", children: lovelace.substring(lovelace.length - 6) })
  ] }) : connected && wallet?.icon ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("img", { className: "mesh-m-2 mesh-h-6", src: wallet.icon }) }) : connecting ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, { children: "Connecting..." }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    label,
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ChevronDown, {})
  ] });
};

// src/cardano-wallet/index.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var CardanoWallet = ({
  label = "Connect Wallet",
  onConnected = void 0,
  isDark = false,
  metamask = {
    network: "preprod"
  },
  extensions = []
}) => {
  const [isDarkMode, setIsDarkMode] = (0, import_react10.useState)(false);
  const [hideMenuList, setHideMenuList] = (0, import_react10.useState)(true);
  const { connect, connecting, connected, disconnect, name } = useWallet();
  const wallets = useWalletList({ metamask });
  (0, import_react10.useEffect)(() => {
    if (connected && onConnected) {
      onConnected();
    }
  }, [connected]);
  (0, import_react10.useEffect)(() => {
    setIsDarkMode(isDark);
  }, [isDark]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "div",
    {
      onMouseEnter: () => setHideMenuList(false),
      onMouseLeave: () => setHideMenuList(true),
      style: { width: "min-content", zIndex: 50 },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          Button,
          {
            isDarkMode,
            hideMenuList,
            setHideMenuList,
            children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              WalletBalance,
              {
                connected,
                connecting,
                label,
                wallet: wallets.find((wallet) => wallet.id === name)
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "div",
          {
            className: `mesh-mr-menu-list mesh-absolute mesh-w-60 mesh-rounded-b-md mesh-border mesh-text-center mesh-shadow-sm mesh-backdrop-blur ${hideMenuList && "mesh-hidden"} ${isDarkMode ? `mesh-bg-neutral-950	mesh-text-neutral-50` : `mesh-bg-neutral-50	mesh-text-neutral-950`}`,
            style: { zIndex: 50 },
            children: !connected && wallets.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: wallets.map((wallet, index) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              MenuItem,
              {
                icon: wallet.icon,
                label: wallet.name,
                action: () => {
                  connect(wallet.id, extensions);
                  setHideMenuList(!hideMenuList);
                },
                active: name === wallet.id
              },
              index
            )) }) : wallets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "No Wallet Found" }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              MenuItem,
              {
                active: false,
                label: "disconnect",
                action: disconnect,
                icon: void 0
              }
            ) })
          }
        )
      ]
    }
  );
};

// src/mesh-badge/mesh-logo.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var MeshLogo = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  "svg",
  {
    className: "mesh-h-16 mesh-p-2",
    fill: "currentColor",
    viewBox: "0 0 300 200",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "m289 127-45-60-45-60c-.9-1.3-2.4-2-4-2s-3.1.7-4 2l-37 49.3c-2 2.7-6 2.7-8 0l-37-49.3c-.9-1.3-2.4-2-4-2s-3.1.7-4 2l-45 60-45 60c-1.3 1.8-1.3 4.2 0 6l45 60c.9 1.3 2.4 2 4 2s3.1-.7 4-2l37-49.3c2-2.7 6-2.7 8 0l37 49.3c.9 1.3 2.4 2 4 2s3.1-.7 4-2l37-49.3c2-2.7 6-2.7 8 0l37 49.3c.9 1.3 2.4 2 4 2s3.1-.7 4-2l45-60c1.3-1.8 1.3-4.2 0-6zm-90-103.3 32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0l-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0zm-90 0 32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0l-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0zm-53 152.6-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0zm90 0-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0zm90 0-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0z" })
  }
);

// src/mesh-badge/index.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var MeshBadge = ({ isDark = false }) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
  "a",
  {
    className: `mesh-flex mesh-max-w-fit mesh-flex-col mesh-items-center mesh-rounded-md mesh-border mesh-border-solid mesh-border-current mesh-p-1 mesh-text-xl mesh-font-semibold mesh-no-underline ${isDark ? `mesh-bg-neutral-950	mesh-text-neutral-50` : `mesh-bg-neutral-50	mesh-text-neutral-950`}`,
    style: {
      color: isDark ? "#EEEEEE" : "#111111",
      backgroundColor: isDark ? "#111111" : "#EEEEEE"
    },
    href: "https://meshjs.dev/",
    rel: "noopener noreferrer",
    target: "_blank",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(MeshLogo, {}),
      "Mesh"
    ]
  }
);

// src/stake-button/index.tsx
var import_react11 = require("react");
var import_transaction = require("@meshsdk/transaction");
var import_jsx_runtime9 = require("react/jsx-runtime");
var StakeButton = ({
  label = "Stake your ADA",
  isDark = false,
  poolId,
  onCheck,
  onDelegated = void 0
}) => {
  const [isDarkMode, setIsDarkMode] = (0, import_react11.useState)(false);
  const { connected } = useWallet();
  (0, import_react11.useEffect)(() => {
    setIsDarkMode(isDark);
  }, [isDark]);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_jsx_runtime9.Fragment, { children: connected ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Button, { isDarkMode, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    Delegate,
    {
      poolId,
      onCheck,
      onDelegated
    }
  ) }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CardanoWallet, { label, isDark }) });
};
var Delegate = ({
  poolId,
  onCheck,
  onDelegated
}) => {
  const { wallet } = useWallet();
  const rewardAddress = useRewardAddress();
  const [_, setError] = (0, import_react11.useState)();
  const [checking, setChecking] = (0, import_react11.useState)(false);
  const [accountInfo, setAccountInfo] = (0, import_react11.useState)();
  const [processing, setProcessing] = (0, import_react11.useState)(false);
  const [done, setDone] = (0, import_react11.useState)(false);
  const checkAccountStatus = async () => {
    try {
      setChecking(true);
      if (rewardAddress) {
        const info = await onCheck(rewardAddress);
        setAccountInfo(info);
      }
      setChecking(false);
    } catch (error) {
      setError(error);
    }
  };
  const registerAddress = async () => {
    setProcessing(true);
    setDone(false);
    try {
      if (rewardAddress) {
        const tx = new import_transaction.Transaction({ initiator: wallet }).registerStake(rewardAddress).delegateStake(rewardAddress, poolId);
        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        await wallet.submitTx(signedTx);
        if (onDelegated) {
          onDelegated();
        }
        setDone(true);
      }
    } catch (error) {
      setError(error);
    }
    setProcessing(false);
  };
  (0, import_react11.useEffect)(() => {
    checkAccountStatus();
  }, [rewardAddress]);
  if (checking) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: "Checking..." });
  }
  if (processing) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: "Loading..." });
  }
  if (done) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: "Stake Delegated" });
  }
  if (accountInfo?.active) {
    return accountInfo.poolId === poolId ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: "Stake Delegated" }) : (
      // <span onClick={delegateStake}>Delegate Stake</span>
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { onClick: registerAddress, children: "Begin Staking" })
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { onClick: registerAddress, children: "Begin Staking" });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CardanoWallet,
  MeshBadge,
  MeshProvider,
  StakeButton,
  WalletContext,
  useAddress,
  useAssets,
  useLovelace,
  useNetwork,
  useRewardAddress,
  useWallet,
  useWalletList,
  useWalletSubmit
});
