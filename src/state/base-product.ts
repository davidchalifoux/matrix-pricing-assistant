"use client";

import { atomWithStorage } from "jotai/utils";

export type BaseProduct = {
	name: string;
	sku: string;
	cost: string;
	price: string;
};

export const initialBaseProduct: BaseProduct = {
	name: "",
	sku: "",
	cost: "",
	price: "",
};

export const baseProductAtom = atomWithStorage<BaseProduct>(
	"matrix.base-product",
	initialBaseProduct,
);
