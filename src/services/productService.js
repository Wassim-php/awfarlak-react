import apiClient from "./apiClient";

const ProductService = {
    async compare(query) {
        try {
            const response = await apiClient.post("/api/comparisons/compare", query);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Error fetching and comparing products";
            throw new Error(errorMessage);
        }
    },

    async getTrendingSearches(limit) {
        try {
            const response = await apiClient.get("/api/comparisons/trending", {
                params: typeof limit === "number" ? { limit } : undefined,
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed fetching trending searches.";
            throw new Error(errorMessage);
        }
    }
};

export default ProductService;
