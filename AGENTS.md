# Matrix Pricing Assistant

## Overview

This project is a tool for generating SKUs and prices for creating listings on eCommerce platforms.

## Features

- Set base product information (name, SKU, cost, price).
- Add any number of matrix dimensions (color, size, warranty, etc).
- Generate SKUs and prices for each combination of matrix dimensions.
- Set a product name prefix or postfix that's applied to each SKU based on the matrix dimensions.
- Set additional cost and price modifiers for each matrix dimension.
- Each SKU should ultimately calculate to a name, SKU, cost, and price.

## Technologies

- Next.js
- Shadcn
- TailwindCSS
- Jotai
- TanStack Form
- Phosphor Icons
- Papaparse

## Notes

- Everything should happen client-side.
- State should be managed with Jotai.
- Components should use Shadcn where possible.
- State should be persisted in local storage via Jotai so that the user can return to the page and continue where they
  left off.
- TanStack Form is used to manage the form state.
- Always import Phosphor Icons from `@phosphor-icons/react/ssr`
- Papaparse is used for working with CSV files.
