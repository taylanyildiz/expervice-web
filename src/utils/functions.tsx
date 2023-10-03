import { setLoadingDialog } from "@Store/alert";
import { store } from "@Store/index";
import React from "react";
import { useLocation } from "react-router-dom";

/**
 * Router query hook
 * @returns `URLSearchParams`
 */
export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export async function onLoading(onBuild?: () => Promise<any>): Promise<any> {
  store.dispatch(setLoadingDialog(true));
  const result = await onBuild?.();
  store.dispatch(setLoadingDialog(false));
  return result;
}
