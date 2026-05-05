import apiClient from "./apiClient";

const normalizeComparisonResults = (data) => {
    if (!data || !Array.isArray(data.results)) {
        return data;
    }

    const needsMapping = data.results.some((result) => !result?.pricing || !result?.product);
    if (!needsMapping) {
        return data;
    }

    return {
        results: data.results.map((result) => ({
            source: result.source ?? null,
            score: result.score != null ? Number(result.score) : null,
            store_rating: result.store_rating ?? result.storeRating ?? null,
            delivery_days: result.delivery_days ?? result.deliveryDays ?? null,
            product: {
                title: result.product_title ?? result.productTitle ?? result.title ?? result.product?.title ?? null,
                url: result.product_url ?? result.productUrl ?? result.url ?? result.product?.url ?? null,
                image_url: result.image_url ?? result.imageUrl ?? result.product?.image_url ?? result.product?.imageUrl ?? null,
                in_stock: result.in_stock ?? result.inStock ?? result.product?.in_stock ?? result.product?.inStock ?? null,
            },
            pricing: {
                item_price: result.item_price ?? result.itemPrice ?? result.pricing?.item_price ?? result.pricing?.itemPrice ?? null,
                shipping_fee: result.shipping_fee ?? result.shippingFee ?? result.pricing?.shipping_fee ?? result.pricing?.shippingFee ?? 0,
                total_price: result.total_price ?? result.totalPrice ?? result.pricing?.total_price ?? result.pricing?.totalPrice ?? null,
                delivery_time: result.delivery_time ?? result.deliveryTime ?? result.pricing?.delivery_time ?? result.pricing?.deliveryTime ?? null,
                breakdown: result.pricing?.breakdown,
            },
            score_breakdown: {
                price_score: result.score_breakdown?.price_score ?? result.score_breakdown?.priceScore ?? result.price_score ?? result.priceScore ?? null,
                delivery_score: result.score_breakdown?.delivery_score ?? result.score_breakdown?.deliveryScore ?? result.delivery_score ?? result.deliveryScore ?? null,
                trust_score: result.score_breakdown?.trust_score ?? result.score_breakdown?.trustScore ?? result.trust_score ?? result.trustScore ?? null,
            },
        })),
        metadata: {
            min_price: data.min_price ?? data.minPrice ?? data.metadata?.min_price ?? data.metadata?.minPrice ?? null,
            sites_checked: data.sites_checked ?? data.sitesChecked ?? data.metadata?.sites_checked ?? data.metadata?.sitesChecked ?? null,
            sites_succeeded: data.sites_succeeded ?? data.sitesSucceeded ?? data.metadata?.sites_succeeded ?? data.metadata?.sitesSucceeded ?? null,
            search_id: data.id ?? data.search_id ?? data.searchId ?? data.metadata?.search_id ?? data.metadata?.searchId ?? null,
        },
    };
};

const ProductService = {
    async compare(query) {
        try {
            const response = await apiClient.post("/api/comparisons/compare", query);
            return normalizeComparisonResults(response.data);
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
