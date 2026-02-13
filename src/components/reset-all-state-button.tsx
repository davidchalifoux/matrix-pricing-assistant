"use client";

import { useSetAtom } from "jotai";
import { useState } from "react";
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
import { baseProductAtom, initialBaseProduct } from "@/state/base-product";
import { matrixDimensionsAtom } from "@/state/matrix-dimensions";

export function ResetAllStateButton() {
	const [open, setOpen] = useState(false);
	const setBaseProduct = useSetAtom(baseProductAtom);
	const setDimensions = useSetAtom(matrixDimensionsAtom);

	const handleConfirmReset = () => {
		setBaseProduct(initialBaseProduct);
		setDimensions([]);
		setOpen(false);
	};

	return (
		<div className="flex justify-center">
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogTrigger
					render={<Button type="button" variant="destructive" size="sm" />}
				>
					Reset Everything
				</AlertDialogTrigger>
				<AlertDialogContent size="default">
					<AlertDialogHeader>
						<AlertDialogTitle>Reset all data?</AlertDialogTitle>
						<AlertDialogDescription>
							This will clear the base product and all matrix dimensions. This
							action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							type="button"
							variant="destructive"
							onClick={handleConfirmReset}
						>
							Yes, reset everything
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
