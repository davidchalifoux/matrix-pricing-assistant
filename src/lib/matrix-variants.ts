import type { BaseProduct } from "@/state/base-product";
import type { MatrixDimension, MatrixOption } from "@/state/matrix-dimensions";

type ActiveDimension = Omit<MatrixDimension, "options"> & {
	options: MatrixOption[];
};

type Selection = {
	nameAffixMode: "prefix" | "postfix";
	option: MatrixOption;
};

export type MatrixVariant = {
	id: string;
	name: string;
	sku: string;
	cost: number;
	price: number;
};

const parseMoney = (value: string) => {
	const parsed = Number.parseFloat(value);
	return Number.isFinite(parsed) ? parsed : 0;
};

const toSkuToken = (value: string) =>
	value
		.trim()
		.toUpperCase()
		.replace(/[^A-Z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

const getActiveDimensions = (
	dimensions: MatrixDimension[],
): ActiveDimension[] =>
	dimensions
		.map((dimension) => ({
			...dimension,
			options: dimension.options.filter(
				(option) => option.name.trim().length > 0,
			),
		}))
		.filter((dimension) => dimension.options.length > 0);

const buildSelections = (dimensions: ActiveDimension[]): Selection[][] => {
	if (dimensions.length === 0) {
		return [[]];
	}

	return dimensions.reduce<Selection[][]>(
		(combinations, dimension) =>
			combinations.flatMap((selection) =>
				dimension.options.map((option) => [
					...selection,
					{
						nameAffixMode: dimension.nameAffixMode,
						option,
					},
				]),
			),
		[[]],
	);
};

export const generateMatrixVariants = (
	baseProduct: BaseProduct,
	dimensions: MatrixDimension[],
): MatrixVariant[] => {
	const activeDimensions = getActiveDimensions(dimensions);
	const selections = buildSelections(activeDimensions);
	const baseCost = parseMoney(baseProduct.cost);
	const basePrice = parseMoney(baseProduct.price);
	const baseName = baseProduct.name.trim();
	const baseSku = toSkuToken(baseProduct.sku);

	return selections.map((selection, index) => {
		const prefixAffixes = selection
			.filter((item) => item.nameAffixMode === "prefix")
			.map((item) => item.option.name.trim());
		const postfixAffixes = selection
			.filter((item) => item.nameAffixMode === "postfix")
			.map((item) => item.option.name.trim());

		const name = [...prefixAffixes, baseName, ...postfixAffixes]
			.filter((item) => item.length > 0)
			.join(" ");

		const skuTokens = selection
			.map(
				(item) => toSkuToken(item.option.sku) || toSkuToken(item.option.name),
			)
			.filter((token) => token.length > 0);

		const sku = [baseSku, ...skuTokens]
			.filter((token) => token.length > 0)
			.join("-");

		const cost =
			baseCost +
			selection.reduce(
				(sum, item) => sum + parseMoney(item.option.costModifier),
				0,
			);

		const price =
			basePrice +
			selection.reduce(
				(sum, item) => sum + parseMoney(item.option.priceModifier),
				0,
			);

		return {
			id: `${index + 1}`,
			name,
			sku,
			cost,
			price,
		};
	});
};
