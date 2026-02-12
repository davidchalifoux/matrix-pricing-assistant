"use client";

import { useAtom } from "jotai";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { baseProductAtom, initialBaseProduct } from "@/state/base-product";

export function BaseProductForm() {
	const [baseProduct, setBaseProduct] = useAtom(baseProductAtom);

	return (
		<section className="rounded-xl border border-border bg-card p-6 shadow-sm">
			<div className="space-y-1">
				<h2 className="text-lg font-semibold">Base Product</h2>
				<p className="text-sm text-muted-foreground">
					Set the default values used by all generated matrix SKUs.
				</p>
			</div>

			<form className="mt-6 grid gap-4 sm:grid-cols-2">
				<div className="space-y-2 sm:col-span-2">
					<label htmlFor="product-name" className="text-sm font-medium">
						Product Name
					</label>
					<Input
						id="product-name"
						value={baseProduct.name}
						placeholder="Classic T-Shirt"
						onChange={(event) => {
							setBaseProduct((previous) => ({
								...previous,
								name: event.target.value,
							}));
						}}
					/>
				</div>

				<div className="space-y-2 sm:col-span-2">
					<label htmlFor="product-sku" className="text-sm font-medium">
						Base SKU
					</label>
					<Input
						id="product-sku"
						value={baseProduct.sku}
						placeholder="TSHIRT"
						onChange={(event) => {
							setBaseProduct((previous) => ({
								...previous,
								sku: event.target.value.toUpperCase(),
							}));
						}}
					/>
				</div>

				<div className="space-y-2">
					<label htmlFor="product-cost" className="text-sm font-medium">
						Base Cost
					</label>
					<Input
						id="product-cost"
						type="number"
						min="0"
						step="0.01"
						inputMode="decimal"
						value={baseProduct.cost}
						placeholder="0.00"
						onChange={(event) => {
							setBaseProduct((previous) => ({
								...previous,
								cost: event.target.value,
							}));
						}}
					/>
				</div>

				<div className="space-y-2">
					<label htmlFor="product-price" className="text-sm font-medium">
						Base Price
					</label>
					<Input
						id="product-price"
						type="number"
						min="0"
						step="0.01"
						inputMode="decimal"
						value={baseProduct.price}
						placeholder="0.00"
						onChange={(event) => {
							setBaseProduct((previous) => ({
								...previous,
								price: event.target.value,
							}));
						}}
					/>
				</div>
			</form>

			<div className="mt-4 flex justify-end">
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => {
						setBaseProduct(initialBaseProduct);
					}}
				>
					Reset
				</Button>
			</div>
		</section>
	);
}
