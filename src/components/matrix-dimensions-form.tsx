"use client";

import {
	CaretDownIcon,
	CaretUpIcon,
	EyeClosedIcon,
	EyeIcon,
	PlusIcon,
	TrashIcon,
} from "@phosphor-icons/react/ssr";
import { useAtom } from "jotai";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import {
	createEmptyDimension,
	createEmptyOption,
	type MatrixDimension,
	type MatrixOption,
	matrixDimensionsAtom,
} from "@/state/matrix-dimensions";

const moveItem = <T,>(items: T[], fromIndex: number, toIndex: number): T[] => {
	if (toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) {
		return items;
	}

	const next = [...items];
	const [moved] = next.splice(fromIndex, 1);
	if (!moved) {
		return items;
	}
	next.splice(toIndex, 0, moved);
	return next;
};

export function MatrixDimensionsForm() {
	const [dimensions, setDimensions] = useAtom(matrixDimensionsAtom);

	const updateDimension = (
		dimensionId: string,
		updater: (dimension: MatrixDimension) => MatrixDimension,
	) => {
		setDimensions((previous) =>
			previous.map((dimension) =>
				dimension.id === dimensionId ? updater(dimension) : dimension,
			),
		);
	};

	const updateOption = (
		dimensionId: string,
		optionId: string,
		updater: (option: MatrixOption) => MatrixOption,
	) => {
		updateDimension(dimensionId, (current) => ({
			...current,
			options: current.options.map((option) =>
				option.id === optionId ? updater(option) : option,
			),
		}));
	};

	return (
		<section className="rounded-xl border border-border bg-card p-6 shadow-sm">
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div className="space-y-1">
					<h2 className="text-lg font-semibold">Matrix Dimensions</h2>
					<p className="text-sm text-muted-foreground">
						Add dimensions like color, size, or warranty and define option-level
						SKU and price modifiers.
					</p>
				</div>
				<Button
					type="button"
					size="sm"
					onClick={() => {
						setDimensions((previous) => [...previous, createEmptyDimension()]);
					}}
				>
					<PlusIcon />
					Add Dimension
				</Button>
			</div>

			{dimensions.length === 0 ? (
				<div className="mt-6 rounded-lg border border-dashed border-border bg-muted/30 p-6 text-sm text-muted-foreground">
					No dimensions yet. Add one to start generating matrix variants.
				</div>
			) : null}

			<div className="mt-6 space-y-6">
				{dimensions.map((dimension, dimensionIndex) => (
					<div
						key={dimension.id}
						className="rounded-lg border border-border bg-background p-4"
					>
						<div className="flex flex-wrap items-start justify-between gap-3">
							<div className="space-y-1">
								<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
									Dimension {dimensionIndex + 1}
								</p>
							</div>
							<div className="flex gap-1">
								<Button
									type="button"
									variant="ghost"
									size="sm"
									disabled={dimensionIndex === 0}
									onClick={() => {
										setDimensions((previous) =>
											moveItem(previous, dimensionIndex, dimensionIndex - 1),
										);
									}}
								>
									<CaretUpIcon />
									Up
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									disabled={dimensionIndex === dimensions.length - 1}
									onClick={() => {
										setDimensions((previous) =>
											moveItem(previous, dimensionIndex, dimensionIndex + 1),
										);
									}}
								>
									<CaretDownIcon />
									Down
								</Button>
								<AlertDialog>
									<AlertDialogTrigger
										render={<Button type="button" variant="ghost" size="sm" />}
									>
										<TrashIcon />
										Remove
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Remove this dimension?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This removes the dimension and all of its options from
												the matrix.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												type="button"
												variant="destructive"
												onClick={() => {
													setDimensions((previous) =>
														previous.filter((item) => item.id !== dimension.id),
													);
												}}
											>
												Yes, remove dimension
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
								<Toggle
									// variant="outline"
									size="sm"
									pressed={dimension.isEnabled !== false}
									onPressedChange={(pressed) => {
										updateDimension(dimension.id, (current) => ({
											...current,
											isEnabled: pressed,
										}));
									}}
								>
									{dimension.isEnabled === false ? (
										<EyeClosedIcon />
									) : (
										<EyeIcon />
									)}
								</Toggle>
							</div>
						</div>

						<div className="mt-3 grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<label
									className="text-sm font-medium"
									htmlFor={`name-${dimension.id}`}
								>
									Dimension Name
								</label>
								<Input
									id={`name-${dimension.id}`}
									value={dimension.name}
									placeholder="Color"
									onChange={(event) => {
										updateDimension(dimension.id, (current) => ({
											...current,
											name: event.target.value,
										}));
									}}
								/>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Name Placement</label>
								<Select
									value={dimension.nameAffixMode}
									onValueChange={(value) => {
										const nextMode = value === "prefix" ? "prefix" : "postfix";
										updateDimension(dimension.id, (current) => ({
											...current,
											nameAffixMode: nextMode,
										}));
									}}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Append to product name" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="postfix">
											Append to product name
										</SelectItem>
										<SelectItem value="prefix">
											Prepend to product name
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="mt-4 space-y-3">
							<p className="text-sm font-medium">Options</p>
							{dimension.options.map((option, optionIndex) => (
								<div
									key={option.id}
									className="grid gap-3 rounded-md border border-border/80 bg-muted/20 p-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_auto]"
								>
									<div className="space-y-1">
										<label
											className="text-xs font-medium text-muted-foreground"
											htmlFor={`option-name-${option.id}`}
										>
											Option Value
										</label>
										<Input
											id={`option-name-${option.id}`}
											value={option.name}
											placeholder="Blue"
											onChange={(event) => {
												updateOption(dimension.id, option.id, (current) => ({
													...current,
													name: event.target.value,
												}));
											}}
										/>
									</div>

									<div className="space-y-1">
										<label
											className="text-xs font-medium text-muted-foreground"
											htmlFor={`option-sku-${option.id}`}
										>
											SKU Fragment
										</label>
										<Input
											id={`option-sku-${option.id}`}
											value={option.sku}
											placeholder="BLUE"
											onChange={(event) => {
												updateOption(dimension.id, option.id, (current) => ({
													...current,
													sku: event.target.value.toUpperCase(),
												}));
											}}
										/>
									</div>

									<div className="space-y-1">
										<label
											className="text-xs font-medium text-muted-foreground"
											htmlFor={`option-cost-${option.id}`}
										>
											Cost Delta
										</label>
										<Input
											id={`option-cost-${option.id}`}
											type="number"
											step="0.01"
											inputMode="decimal"
											value={option.costModifier}
											placeholder="0.00"
											onChange={(event) => {
												updateOption(dimension.id, option.id, (current) => ({
													...current,
													costModifier: event.target.value,
												}));
											}}
										/>
									</div>

									<div className="space-y-1">
										<label
											className="text-xs font-medium text-muted-foreground"
											htmlFor={`option-price-${option.id}`}
										>
											Price Delta
										</label>
										<Input
											id={`option-price-${option.id}`}
											type="number"
											step="0.01"
											inputMode="decimal"
											value={option.priceModifier}
											placeholder="0.00"
											onChange={(event) => {
												updateOption(dimension.id, option.id, (current) => ({
													...current,
													priceModifier: event.target.value,
												}));
											}}
										/>
									</div>

									<div className="flex items-end gap-1">
										<Button
											type="button"
											variant="ghost"
											size="sm"
											disabled={optionIndex === 0}
											onClick={() => {
												updateDimension(dimension.id, (current) => ({
													...current,
													options: moveItem(
														current.options,
														optionIndex,
														optionIndex - 1,
													),
												}));
											}}
										>
											<CaretUpIcon />
										</Button>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											disabled={optionIndex === dimension.options.length - 1}
											onClick={() => {
												updateDimension(dimension.id, (current) => ({
													...current,
													options: moveItem(
														current.options,
														optionIndex,
														optionIndex + 1,
													),
												}));
											}}
										>
											<CaretDownIcon />
										</Button>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											disabled={dimension.options.length === 1}
											onClick={() => {
												updateDimension(dimension.id, (current) => ({
													...current,
													options: current.options.filter(
														(item) => item.id !== option.id,
													),
												}));
											}}
										>
											<TrashIcon />
										</Button>
									</div>
								</div>
							))}
						</div>

						<div className="mt-3">
							<Button
								type="button"
								variant="secondary"
								size="sm"
								onClick={() => {
									updateDimension(dimension.id, (current) => ({
										...current,
										options: [...current.options, createEmptyOption()],
									}));
								}}
							>
								<PlusIcon />
								Add Option
							</Button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
