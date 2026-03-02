'use client';

import { useState, useEffect } from 'react';

export function useBanner(page: string, fallback: string) {
    const [bannerImage, setBannerImage] = useState<string>(fallback);

    useEffect(() => {
        fetch(`/api/banner/${encodeURIComponent(page)}`)
            .then(res => res.json())
            .then(data => {
                if (data.image) setBannerImage(data.image);
            })
            .catch(() => { /* keep fallback */ });
    }, [page]);

    return bannerImage;
}
