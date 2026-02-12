"use client";

import { atomWithStorage } from "jotai/utils";

export type NameAffixMode = "prefix" | "postfix";

export type MatrixOption = {
	id: string;
	name: string;
	sku: string;
	costModifier: string;
	priceModifier: string;
};

export type MatrixDimension = {
	id: string;
	name: string;
	nameAffixMode: NameAffixMode;
	options: MatrixOption[];
};

const createId = () =>
	globalThis.crypto?.randomUUID?.() ??
	`${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const createEmptyOption = (): MatrixOption => ({
	id: createId(),
	name: "",
	sku: "",
	costModifier: "",
	priceModifier: "",
});

export const createEmptyDimension = (): MatrixDimension => ({
	id: createId(),
	name: "",
	nameAffixMode: "postfix",
	options: [createEmptyOption()],
});

export const matrixDimensionsAtom = atomWithStorage<MatrixDimension[]>(
	"matrix.dimensions",
	[],
);
