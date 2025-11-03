import React, { useEffect, useState } from "react";
import {
	type CategoryAndLocationContextType,
	CategoryAndLocationContext,
} from "./CategoryAndLocationContext";
import { postsApi } from "../api/postsApi";

export const CategoryAndLocationProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [categories, setCategories] = useState<string[]>([]);
	const [locations, setLocations] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	// Fetch categories and locations from API
	useEffect(() => {
		async function fetchCategoriesAndLocations() {
			try {
				const [categoriesRes, locationsRes] = await Promise.all([
					postsApi.getCategories(),
					postsApi.getLocations(),
				]);
				setCategories(categoriesRes.data);
				setLocations(locationsRes.data);
			} catch (error) {
				console.error(
					"Failed to fetch categories and locations",
					error
				);
			} finally {
				setLoading(false);
			}
		}
		fetchCategoriesAndLocations();
	}, []);

	const refreshCategoriesAndLocations = async () => {
		try {
			const [categoriesRes, locationsRes] = await Promise.all([
				postsApi.getCategories(),
				postsApi.getLocations(),
			]);
			setCategories(categoriesRes.data);
			setLocations(locationsRes.data);
		} catch {
			console.error("Failed to refresh categories and locations");
		}
	};

	const value: CategoryAndLocationContextType = {
		categories,
		locations,
		refreshCategoriesAndLocations,
	};

	return (
		<CategoryAndLocationContext.Provider value={value}>
			{!loading && children}
		</CategoryAndLocationContext.Provider>
	);
};
