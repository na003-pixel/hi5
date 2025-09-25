// store/shop/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectShopState = (state: RootState) => state.shop;

export const selectShopItem = createSelector(
  [selectShopState],
  (shopState) => shopState.Item
);

export const selectShopLoading = createSelector(
  [selectShopState],
  (shopState) => shopState.IsLoading
);

export const selectShopError = createSelector(
  [selectShopState],
  (shopState) => shopState.Error
);

