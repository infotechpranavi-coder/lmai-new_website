/**
 * Utility to append optimization parameters to Cloudinary and Unsplash URLs
 * for faster loading and better performance.
 */
export function getOptimizedUrl(url: string, options: { width?: number; quality?: number } = {}) {
    if (!url) return url;

    // Cloudinary Optimization
    if (url.includes('res.cloudinary.com')) {
        const parts = url.split('/upload/');
        if (parts.length === 2) {
            const params = [];
            params.push('f_auto'); // Auto format (WebP/AVIF)
            params.push('q_auto'); // Auto quality
            if (options.width) params.push(`w_${options.width}`);
            return `${parts[0]}/upload/${params.join(',')}/${parts[1]}`;
        }
    }

    // Unsplash Optimization
    if (url.includes('images.unsplash.com')) {
        const separator = url.includes('?') ? '&' : '?';
        const params = [];
        params.push('auto=format');
        params.push(`q=${options.quality || 80}`);
        if (options.width) params.push(`w=${options.width}`);
        return `${url}${separator}${params.join('&')}`;
    }

    return url;
}
