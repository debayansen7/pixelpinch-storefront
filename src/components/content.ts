export const siteContent = {
  meta: {
    title: "PixelPinch StoreFront",
    description: "Welcome to the Pixel Pinch storefront",
  },
  navbar: {
    logo: "PixelPinch.",
    links: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
    ],
    cartButton: "Cart (0)",
  },
  footer: {
    brand: "PixelPinch",
    copyright: "PixelPinch StoreFront. All rights reserved.",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  home: {
    hero: {
      title: "Compress your images.",
      highlight: "But keep the Quality.",
      descriptionPre:
        "PixelPinch is a powerful service designed to significantly reduce your image file sizes. Convert and compress your files into optimized formats like",
      formats: ["JPEG", "WEBP", "AVIF", "GIF"],
    },
    features: {
      title: "Why use PixelPinch?",
      items: [
        {
          icon: "⚡",
          textPre: "Up to",
          highlight: "80% reduction",
          textPost: "in file size.",
        },
        {
          icon: "👁️",
          textPre: "Advanced algorithms ensure",
          highlight: "zero perceived loss",
          textPost: "in visual quality.",
        },
        {
          icon: "🚀",
          textPre: "Boost your website's loading speed, performance, and SEO.",
          highlight: "",
          textPost: "",
        },
      ],
    },
    slider: {
      compressed: {
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        label: "Compressed (120KB)",
      },
      original: {
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=100&w=1000&auto=format&fit=crop",
        label: "Original (2.4MB)",
      },
    },
    howItWorks: {
      title: "How it Works",
      description:
        "Optimize your images in three simple steps without losing any noticeable quality.",
      steps: [
        {
          id: 1,
          title: "Upload",
          description:
            "Drag and drop your bulky images or click to select files directly from your device.",
        },
        {
          id: 2,
          title: "Compress",
          description:
            "Our smart algorithms instantly reduce the file size while preserving high visual resolution.",
        },
        {
          id: 3,
          title: "Download",
          description:
            "Get your optimized images individually or packaged together securely in a ZIP file.",
        },
      ],
    },
    cta: {
      title: "Ready to pinch those pixels?",
      description:
        "Join thousands of creators who are already serving lightning-fast images on their websites.",
      buttonText: "Start Compressing Now",
      buttonLink: "/convertion",
    },
  },
};
