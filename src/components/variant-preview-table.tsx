"use client";

import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { useAtomValue } from "jotai";
import Papa from "papaparse";

import { Button } from "@/components/ui/button";
import { generateMatrixVariants } from "@/lib/matrix-variants";
import { baseProductAtom } from "@/state/base-product";
import { matrixDimensionsAtom } from "@/state/matrix-dimensions";

const moneyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export function VariantPreviewTable() {
	const baseProduct = useAtomValue(baseProductAtom);
	const dimensions = useAtomValue(matrixDimensionsAtom);
	const variants = generateMatrixVariants(baseProduct, dimensions);

	const handleDownloadCsv = () => {
		if (variants.length === 0) {
			return;
		}

		const rows = variants.map((variant) => ({
			index: variant.id,
			name: variant.name || "Untitled Variant",
			sku: variant.sku || "SKU-MISSING",
			cost: variant.cost.toFixed(2),
			price: variant.price.toFixed(2),
		}));

		const csv = Papa.unparse(rows, {
			header: true,
		});

		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		const baseSkuFileName = baseProduct.sku
			.trim()
			.replace(/[\\/:*?"<>|]+/g, "_");
		anchor.href = url;
		anchor.download = `${baseSkuFileName || "matrix-variants"}.csv`;
		document.body.append(anchor);
		anchor.click();
		anchor.remove();
		URL.revokeObjectURL(url);
	};

	return (
		<section className="rounded-xl border border-border bg-card p-6 shadow-sm">
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div className="space-y-1">
					<h2 className="text-lg font-semibold">Generated Variants</h2>
					<p className="text-sm text-muted-foreground">
						{variants.length} variant{variants.length === 1 ? "" : "s"}{" "}
						generated from your current dimensions.
					</p>
				</div>
				<Button
					type="button"
					variant="secondary"
					size="sm"
					disabled={variants.length === 0}
					onClick={handleDownloadCsv}
				>
					<DownloadSimpleIcon />
					Download as CSV
				</Button>
			</div>

			<div className="mt-6 overflow-x-auto rounded-lg border border-border">
				<table className="min-w-full divide-y divide-border text-left text-sm">
					<thead className="bg-muted/40">
						<tr>
							<th className="px-3 py-2 font-medium">#</th>
							<th className="px-3 py-2 font-medium">Name</th>
							<th className="px-3 py-2 font-medium">SKU</th>
							<th className="px-3 py-2 font-medium">Cost</th>
							<th className="px-3 py-2 font-medium">Price</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border">
						{variants.map((variant) => (
							<tr key={variant.id} className="bg-background/60">
								<td className="px-3 py-2 text-muted-foreground">
									{variant.id}
								</td>
								<td className="px-3 py-2">
									{variant.name || "Untitled Variant"}
								</td>
								<td className="px-3 py-2 font-mono text-xs sm:text-sm">
									{variant.sku || "SKU-MISSING"}
								</td>
								<td className="px-3 py-2">
									{moneyFormatter.format(variant.cost)}
								</td>
								<td className="px-3 py-2">
									{moneyFormatter.format(variant.price)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
