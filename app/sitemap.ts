import {MetadataRoute} from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {url: "https://nevettebailey.com", lastModified: new Date()},
        {url: "https://nevettebailey.com/resume", lastModified: new Date()},
    ];
}