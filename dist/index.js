// src/cardano-wallet/index.tsx
import { useEffect as useEffect7, useState as useState9 } from "react";

// src/common/button.tsx
import { jsx } from "react/jsx-runtime";
function Button({
  children,
  isDarkMode = false,
  hideMenuList = false,
  setHideMenuList,
  onMouseEnter,
  onMouseLeave
}) {
  return /* @__PURE__ */ jsx(
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
import { useContext, useEffect, useState as useState2 } from "react";

// src/contexts/WalletContext.ts
import { createContext, useCallback, useState } from "react";
import { BrowserWallet } from "@meshsdk/wallet";
var INITIAL_STATE = {
  walletName: "",
  walletInstance: {}
};
var useWalletStore = () => {
  const [error, setError] = useState(void 0);
  const [connectingWallet, setConnectingWallet] = useState(false);
  const [connectedWalletInstance, setConnectedWalletInstance] = useState(INITIAL_STATE.walletInstance);
  const [connectedWalletName, setConnectedWalletName] = useState(
    INITIAL_STATE.walletName
  );
  const connectWallet = useCallback(
    async (walletName, extensions) => {
      setConnectingWallet(true);
      try {
        const walletInstance = await BrowserWallet.enable(
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
  const disconnect = useCallback(() => {
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
var WalletContext = createContext({
  hasConnectedWallet: false,
  connectedWalletInstance: INITIAL_STATE.walletInstance,
  connectedWalletName: INITIAL_STATE.walletName,
  connectingWallet: false
});

// src/contexts/index.tsx
import { Fragment, jsx as jsx2 } from "react/jsx-runtime";
var MeshProvider = (props) => {
  const store = useWalletStore();
  return /* @__PURE__ */ jsx2(WalletContext.Provider, { value: store, children: /* @__PURE__ */ jsx2(Fragment, { children: props.children }) });
};

// src/hooks/useAddress.ts
var useAddress = (accountId = 0) => {
  const [address, setAddress] = useState2();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } = useContext(WalletContext);
  useEffect(() => {
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
import { useContext as useContext2, useEffect as useEffect2, useState as useState3 } from "react";
var useAssets = () => {
  const [assets, setAssets] = useState3();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } = useContext2(WalletContext);
  useEffect2(() => {
    if (hasConnectedWallet) {
      connectedWalletInstance.getAssets().then(setAssets);
    }
  }, [connectedWalletName]);
  return assets;
};

// src/hooks/useWalletList.ts
import { useEffect as useEffect3, useState as useState4 } from "react";
import { BrowserWallet as BrowserWallet2 } from "@meshsdk/wallet";
var useWalletList = ({
  metamask = {
    network: "preprod"
  }
} = {}) => {
  const [wallets, setWallets] = useState4([]);
  useEffect3(() => {
    async function get() {
      setWallets(await BrowserWallet2.getAvailableWallets({ metamask }));
    }
    get();
  }, []);
  return wallets;
};

// src/hooks/useLovelace.ts
import { useContext as useContext3, useEffect as useEffect4, useState as useState5 } from "react";
var useLovelace = () => {
  const [lovelace, setLovelace] = useState5();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } = useContext3(WalletContext);
  useEffect4(() => {
    if (hasConnectedWallet) {
      connectedWalletInstance.getLovelace().then(setLovelace);
    }
  }, [connectedWalletName]);
  return lovelace;
};

// src/hooks/useNetwork.ts
import { useContext as useContext4, useEffect as useEffect5, useState as useState6 } from "react";
var useNetwork = () => {
  const [networkId, setNetworkId] = useState6();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } = useContext4(WalletContext);
  useEffect5(() => {
    if (hasConnectedWallet) {
      connectedWalletInstance.getNetworkId().then(setNetworkId);
    }
  }, [connectedWalletName]);
  return networkId;
};

// src/hooks/useRewardAddress.ts
import { useContext as useContext5, useEffect as useEffect6, useState as useState7 } from "react";
var useRewardAddress = (accountId = 0) => {
  const [rewardAddress, setRewardAddress] = useState7();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } = useContext5(WalletContext);
  useEffect6(() => {
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
import { useContext as useContext6 } from "react";
var useWallet = () => {
  const {
    hasConnectedWallet,
    connectedWalletName,
    connectedWalletInstance,
    connectingWallet,
    connectWallet,
    disconnect,
    error
  } = useContext6(WalletContext);
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
import { useCallback as useCallback2, useContext as useContext7, useState as useState8 } from "react";
var useWalletSubmit = () => {
  const [error, setError] = useState8();
  const [result, setResult] = useState8();
  const [submitting, setSubmitting] = useState8(false);
  const { hasConnectedWallet, connectedWalletInstance } = useContext7(WalletContext);
  const submitTx = useCallback2(async (signedTx) => {
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
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function MenuItem({
  icon,
  label,
  action,
  active
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "mesh-flex mesh-cursor-pointer mesh-items-center mesh-px-4 mesh-py-2 mesh-opacity-80 hover:mesh-opacity-100 mesh-h-16",
      onClick: action,
      children: [
        icon && /* @__PURE__ */ jsx3("img", { className: "mesh-pr-2 mesh-m-1 mesh-h-8", src: icon }),
        /* @__PURE__ */ jsx3("span", { className: "mesh-mr-menu-item mesh-text-xl mesh-font-normal mesh-text-gray-700 hover:mesh-text-black", children: label.split(" ").map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(" ") })
      ]
    }
  );
}

// src/cardano-wallet/chevron-down.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var ChevronDown = () => /* @__PURE__ */ jsx4(
  "svg",
  {
    className: "mesh-m-2 mesh-h-6",
    fill: "none",
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx4(
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
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
var WalletBalance = ({
  connected,
  connecting,
  label,
  wallet
}) => {
  const lovelace = useLovelace();
  return connected && lovelace && wallet?.icon ? /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx5("img", { className: "mesh-m-2 mesh-h-6", src: wallet.icon }),
    "\u20B3",
    " ",
    parseInt((parseInt(lovelace, 10) / 1e6).toString(), 10),
    ".",
    /* @__PURE__ */ jsx5("span", { className: "mesh-text-xs", children: lovelace.substring(lovelace.length - 6) })
  ] }) : connected && wallet?.icon ? /* @__PURE__ */ jsx5(Fragment2, { children: /* @__PURE__ */ jsx5("img", { className: "mesh-m-2 mesh-h-6", src: wallet.icon }) }) : connecting ? /* @__PURE__ */ jsx5(Fragment2, { children: "Connecting..." }) : /* @__PURE__ */ jsxs2(Fragment2, { children: [
    label,
    " ",
    /* @__PURE__ */ jsx5(ChevronDown, {})
  ] });
};

// src/cardano-wallet/index.tsx
import { Fragment as Fragment3, jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var CardanoWallet = ({
  label = "Connect Wallet",
  onConnected = void 0,
  isDark = false,
  metamask = {
    network: "preprod"
  },
  extensions = []
}) => {
  const [isDarkMode, setIsDarkMode] = useState9(false);
  const [hideMenuList, setHideMenuList] = useState9(true);
  const { connect, connecting, connected, disconnect, name } = useWallet();
  const wallets = useWalletList({ metamask });
  useEffect7(() => {
    if (connected && onConnected) {
      onConnected();
    }
  }, [connected]);
  useEffect7(() => {
    setIsDarkMode(isDark);
  }, [isDark]);
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      onMouseEnter: () => setHideMenuList(false),
      onMouseLeave: () => setHideMenuList(true),
      style: { width: "min-content", zIndex: 50 },
      children: [
        /* @__PURE__ */ jsx6(
          Button,
          {
            isDarkMode,
            hideMenuList,
            setHideMenuList,
            children: /* @__PURE__ */ jsx6(
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
        /* @__PURE__ */ jsx6(
          "div",
          {
            className: `mesh-mr-menu-list mesh-absolute mesh-w-60 mesh-rounded-b-md mesh-border mesh-text-center mesh-shadow-sm mesh-backdrop-blur ${hideMenuList && "mesh-hidden"} ${isDarkMode ? `mesh-bg-neutral-950	mesh-text-neutral-50` : `mesh-bg-neutral-50	mesh-text-neutral-950`}`,
            style: { zIndex: 50 },
            children: !connected && wallets.length > 0 ? /* @__PURE__ */ jsx6(Fragment3, { children: wallets.map((wallet, index) => /* @__PURE__ */ jsx6(
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
            )) }) : wallets.length === 0 ? /* @__PURE__ */ jsx6("span", { children: "No Wallet Found" }) : /* @__PURE__ */ jsx6(Fragment3, { children: /* @__PURE__ */ jsx6(
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
import { jsx as jsx7 } from "react/jsx-runtime";
var MeshLogo = () => /* @__PURE__ */ jsx7(
  "svg",
  {
    className: "mesh-h-16 mesh-p-2",
    fill: "currentColor",
    viewBox: "0 0 300 200",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx7("path", { d: "m289 127-45-60-45-60c-.9-1.3-2.4-2-4-2s-3.1.7-4 2l-37 49.3c-2 2.7-6 2.7-8 0l-37-49.3c-.9-1.3-2.4-2-4-2s-3.1.7-4 2l-45 60-45 60c-1.3 1.8-1.3 4.2 0 6l45 60c.9 1.3 2.4 2 4 2s3.1-.7 4-2l37-49.3c2-2.7 6-2.7 8 0l37 49.3c.9 1.3 2.4 2 4 2s3.1-.7 4-2l37-49.3c2-2.7 6-2.7 8 0l37 49.3c.9 1.3 2.4 2 4 2s3.1-.7 4-2l45-60c1.3-1.8 1.3-4.2 0-6zm-90-103.3 32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0l-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0zm-90 0 32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0l-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0zm-53 152.6-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0zm90 0-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0zm90 0-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0z" })
  }
);

// src/mesh-badge/index.tsx
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
var MeshBadge = ({ isDark = false }) => /* @__PURE__ */ jsxs4(
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
      /* @__PURE__ */ jsx8(MeshLogo, {}),
      "Mesh"
    ]
  }
);

// src/stake-button/index.tsx
import { useEffect as useEffect8, useState as useState10 } from "react";
import { Transaction } from "@meshsdk/transaction";
import { Fragment as Fragment4, jsx as jsx9 } from "react/jsx-runtime";
var StakeButton = ({
  label = "Stake your ADA",
  isDark = false,
  poolId,
  onCheck,
  onDelegated = void 0
}) => {
  const [isDarkMode, setIsDarkMode] = useState10(false);
  const { connected } = useWallet();
  useEffect8(() => {
    setIsDarkMode(isDark);
  }, [isDark]);
  return /* @__PURE__ */ jsx9(Fragment4, { children: connected ? /* @__PURE__ */ jsx9(Button, { isDarkMode, children: /* @__PURE__ */ jsx9(
    Delegate,
    {
      poolId,
      onCheck,
      onDelegated
    }
  ) }) : /* @__PURE__ */ jsx9(CardanoWallet, { label, isDark }) });
};
var Delegate = ({
  poolId,
  onCheck,
  onDelegated
}) => {
  const { wallet } = useWallet();
  const rewardAddress = useRewardAddress();
  const [_, setError] = useState10();
  const [checking, setChecking] = useState10(false);
  const [accountInfo, setAccountInfo] = useState10();
  const [processing, setProcessing] = useState10(false);
  const [done, setDone] = useState10(false);
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
        const tx = new Transaction({ initiator: wallet }).registerStake(rewardAddress).delegateStake(rewardAddress, poolId);
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
  useEffect8(() => {
    checkAccountStatus();
  }, [rewardAddress]);
  if (checking) {
    return /* @__PURE__ */ jsx9("span", { children: "Checking..." });
  }
  if (processing) {
    return /* @__PURE__ */ jsx9("span", { children: "Loading..." });
  }
  if (done) {
    return /* @__PURE__ */ jsx9("span", { children: "Stake Delegated" });
  }
  if (accountInfo?.active) {
    return accountInfo.poolId === poolId ? /* @__PURE__ */ jsx9("span", { children: "Stake Delegated" }) : (
      // <span onClick={delegateStake}>Delegate Stake</span>
      /* @__PURE__ */ jsx9("span", { onClick: registerAddress, children: "Begin Staking" })
    );
  }
  return /* @__PURE__ */ jsx9("span", { onClick: registerAddress, children: "Begin Staking" });
};
export {
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
};
