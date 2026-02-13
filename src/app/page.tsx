import { BaseProductForm } from "@/components/base-product-form";
import { MatrixDimensionsForm } from "@/components/matrix-dimensions-form";
import { ResetAllStateButton } from "@/components/reset-all-state-button";
import { VariantPreviewTable } from "@/components/variant-preview-table";

export default function Home() {
	return (
		<main className="min-h-screen bg-muted/20 px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
				<header className="space-y-2">
					<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
						Matrix Pricing Assistant
					</h1>
					<p className="text-sm text-muted-foreground sm:text-base">
						Start with your base product details. Matrix options will build on
						these values.
					</p>
				</header>

				<BaseProductForm />
				<MatrixDimensionsForm />
				<VariantPreviewTable />
				<ResetAllStateButton />

				<footer className="pt-2 text-center text-sm text-muted-foreground">
					Made by{" "}
					<a
						href="https://chalifoux.dev"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-foreground underline underline-offset-4"
					>
						David Chalifoux
					</a>
				</footer>
			</div>
		</main>
	);
}
