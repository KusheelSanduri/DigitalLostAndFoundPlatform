import { createContext } from "react";

export type CategoryAndLocationContextType = {
	categories: string[];
	locations: string[];
	refreshCategoriesAndLocations: () => Promise<void>;
};

export const CategoryAndLocationContext = createContext<
	CategoryAndLocationContextType | undefined
>(undefined);
