import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		preact(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "VDice",
				short_name: "VDice",
				description: "A simple, interactive dice roller web application",
				theme_color: "#ffffff",
				icons: [
					{
						src: "512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
				],
				screenshots: [
					{
						src: "screenshot_mobile.png",
						type: "image/png",
						sizes: "1082x2402",
						form_factor: "narrow",
					},
					{
						src: "screenshot_wide.png",
						type: "image/png",
						sizes: "1920x1080",
						form_factor: "wide",
					},
				],
			},
		}),
	],
});
