import apiClient from "./apiClient";
import AuthService from "./authService";

const normalizeDeliveryLocation = (location) => {
    if (typeof location === "string") {
        const normalized = location.trim().toLowerCase();
        if (normalized === "inside beirut" || normalized === "beirut" || normalized === "true") {
            return "inside beirut";
        }
        return "outside beirut";
    }

    return location ? "inside beirut" : "outside beirut";
};

const ProductService = {
    async compare(payload) {
        try {
            const user = AuthService.getUser();
            const response = await apiClient.post("/comparisons/compare", {
                ...payload,
                location: normalizeDeliveryLocation(payload?.location ?? user?.location),
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Error fetching and comparing products";
            throw new Error(errorMessage);
        }
    },

    async getTrendingSearches(limit = 3) {
        try {
            const response = await apiClient.get("/comparisons/trending", {
                params: { limit },
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Error fetching trending searches";
            throw new Error(errorMessage);
        }
    }
};

export default ProductService;
