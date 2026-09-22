import { i as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { c as initAudioUnlock, f as loadData, l as initNativeShell, u as isNative, y as todayKey } from "./mala-BEsTiUoh.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as Smartphone, d as House, i as SquarePlus, l as Menu, m as Check, o as Share } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-kxbmTZL7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CTAp4rsC.css";
var SW_URL = "/sw.js";
function isPreviewHost(host) {
	return host.startsWith("id-preview--") || host.startsWith("preview--");
}
async function unregisterAppSw() {
	if (!("serviceWorker" in navigator)) return;
	const regs = await navigator.serviceWorker.getRegistrations();
	await Promise.allSettled(regs.filter((r) => (r.active?.scriptURL ?? r.installing?.scriptURL ?? "").endsWith(SW_URL)).map((r) => r.unregister()));
}
function registerAppServiceWorker() {
	if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
	if (window.self !== window.top || isPreviewHost(window.location.hostname) || new URL(window.location.href).searchParams.get("sw") === "off") {
		unregisterAppSw();
		return;
	}
	window.addEventListener("load", () => {
		navigator.serviceWorker.register(SW_URL, { scope: "/" });
	});
}
/**
* Soft cross-fade between screens so navigation feels like turning a page
* rather than a hard swap.
*/
function PageTransition({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
		mode: "wait",
		initial: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 10
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: -8
			},
			transition: {
				duration: .28,
				ease: [
					.22,
					.61,
					.36,
					1
				]
			},
			children
		}, pathname)
	});
}
var REMINDER_TITLE = "Time for your jaap 🪔";
var REMINDER_BODY = "A few quiet minutes with your mala await you.";
var LAST_SHOWN_KEY = "mala-jaap-reminder-last";
var NATIVE_ID = 1081;
/** Ask the OS/browser for permission. Returns true when reminders can fire. */
async function requestReminderPermission() {
	if (isNative()) try {
		const { LocalNotifications } = await import("../_libs/capacitor__local-notifications.mjs").then((n) => n.t);
		return (await LocalNotifications.requestPermissions()).display === "granted";
	} catch {
		return false;
	}
	if (typeof window === "undefined" || !("Notification" in window)) return false;
	if (Notification.permission === "granted") return true;
	if (Notification.permission === "denied") return false;
	try {
		return await Notification.requestPermission() === "granted";
	} catch {
		return false;
	}
}
function parseTime(time) {
	const [h, m] = time.split(":").map(Number);
	return {
		hour: Number.isFinite(h) ? h : 7,
		minute: Number.isFinite(m) ? m : 0
	};
}
/** Keep the native daily notification in sync with the user's settings. */
async function syncNativeReminder(enabled, time) {
	if (!isNative()) return;
	try {
		const { LocalNotifications } = await import("../_libs/capacitor__local-notifications.mjs").then((n) => n.t);
		await LocalNotifications.cancel({ notifications: [{ id: NATIVE_ID }] }).catch(() => {});
		if (!enabled) return;
		const { hour, minute } = parseTime(time);
		await LocalNotifications.schedule({ notifications: [{
			id: NATIVE_ID,
			title: REMINDER_TITLE,
			body: REMINDER_BODY,
			schedule: {
				on: {
					hour,
					minute
				},
				allowWhileIdle: true
			}
		}] });
	} catch {}
}
function alreadyShownToday() {
	try {
		return localStorage.getItem(LAST_SHOWN_KEY) === todayKey();
	} catch {
		return true;
	}
}
function markShownToday() {
	try {
		localStorage.setItem(LAST_SHOWN_KEY, todayKey());
	} catch {}
}
/**
* Web fallback: while the app (or its service worker page) is open, fire a
* single reminder once the chosen time passes and no jaap was logged today.
*/
function maybeFireWebReminder(opts) {
	if (isNative()) return;
	if (!opts.enabled || opts.jaapsToday > 0) return;
	if (typeof window === "undefined" || !("Notification" in window)) return;
	if (Notification.permission !== "granted") return;
	if (alreadyShownToday()) return;
	const { hour, minute } = parseTime(opts.time);
	const now = /* @__PURE__ */ new Date();
	if (!(now.getHours() * 60 + now.getMinutes() >= hour * 60 + minute)) return;
	try {
		new Notification(REMINDER_TITLE, {
			body: REMINDER_BODY,
			icon: "/icon-192.png"
		});
		markShownToday();
	} catch {}
}
/** Checks periodically whether today's reminder should be shown. */
function ReminderWatcher() {
	(0, import_react.useEffect)(() => {
		const check = () => {
			const data = loadData();
			maybeFireWebReminder({
				enabled: data.settings.reminder,
				time: data.settings.reminderTime,
				jaapsToday: data.history[todayKey()]?.jaaps ?? 0
			});
		};
		check();
		const id = setInterval(check, 6e4);
		return () => clearInterval(id);
	}, []);
	return null;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1"
			},
			{ title: "Mala Jaap Counter" },
			{
				name: "description",
				content: "A calm, offline mala bead counter for daily japa practice."
			},
			{
				name: "theme-color",
				content: "#5b1a15"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "Mala Jaap"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				property: "og:title",
				content: "Mala Jaap Counter"
			},
			{
				property: "og:description",
				content: "A calm, offline mala bead counter for daily japa practice."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "Mala Jaap Counter"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Karla:wght@400;500;600&display=swap"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "apple-touch-icon",
				href: "/icon-192.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	(0, import_react.useEffect)(() => {
		registerAppServiceWorker();
		initNativeShell();
		initAudioUnlock();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReminderWatcher, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })]
	});
}
var SITE_URL = "https://malajaap.app";
var $$splitComponentImporter$6 = () => import("./routes-BLEGAv4e.mjs");
var Route$7 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Mala Jaap Counter - Offline Japa Bead Counter" },
			{
				name: "description",
				content: "Tap the bead to count your japa. Tracks malas, lifetime jaaps and daily streaks offline on your device."
			},
			{
				property: "og:title",
				content: "Mala Jaap Counter"
			},
			{
				property: "og:description",
				content: "A calm, offline mala bead counter for your daily spiritual practice."
			},
			{
				property: "og:url",
				content: `${SITE_URL}/`
			},
			{
				property: "og:image",
				content: `${SITE_URL}/og/home.png`
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: `${SITE_URL}/og/home.png`
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [{
			rel: "canonical",
			href: `${SITE_URL}/`
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "SoftwareApplication",
				name: "Mala Jaap Counter",
				applicationCategory: "LifestyleApplication",
				operatingSystem: "Web, iOS, Android",
				description: "An offline mala bead counter for daily japa: tap the bead, track malas, lifetime jaaps and daily streaks.",
				url: "/",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD"
				}
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var FAQS = [
	{
		question: "What is Mala Jaap Counter?",
		answer: "Mala Jaap Counter is a calm, offline mala bead counter for daily japa. Tap the central bead with each mantra repetition and the app tracks your round, completed malas, lifetime jaaps and daily streak."
	},
	{
		question: "Does the app work offline?",
		answer: "Yes. Everything is stored locally on your device. Once installed as a PWA or native app, you can count jaaps without an internet connection."
	},
	{
		question: "How is my data stored?",
		answer: "Your bead count, malas, lifetime jaaps, history, streaks and settings are saved only in your device's local cache. No account, server or cloud sync is used. Clearing site data or uninstalling the app erases the data permanently."
	},
	{
		question: "Can I change the mala length?",
		answer: "Yes. Open Settings and choose a mala length that matches your practice - 108, 54, 27 or 1008 beads."
	},
	{
		question: "What happens when I complete one mala?",
		answer: "The app plays a gentle chime and haptic burst, then starts a fresh round automatically while adding one mala to your daily and lifetime totals."
	},
	{
		question: "Can I name my mantra?",
		answer: "Yes. In Settings, type the name of the mantra you are chanting. It will appear on the counter screen during your practice so you stay focused on your chosen chant."
	},
	{
		question: "What is the daily intention?",
		answer: "The daily intention (sankalpa) is a short personal resolve you set each day before beginning your practice. Tap 'Set today's intention' on the counter screen. It is editable throughout the day and stored only on your device."
	},
	{
		question: "How does the daily goal work?",
		answer: "In Settings, set a target number of malas to complete each day (e.g. 3 or 5). A progress bar on the counter screen shows how close you are to your goal, and a brief congratulatory message appears when you reach it."
	},
	{
		question: "Does the app track my practice time?",
		answer: "Yes. The app automatically times your practice sessions. When you start tapping, a session begins, and after a minute of inactivity the elapsed time is saved to your daily record. Total practice time appears on the stats page."
	},
	{
		question: "Can I set a daily reminder?",
		answer: "Yes. In Settings you can enable a daily reminder at a time you choose. The reminder is scheduled on your device only and no push server is involved."
	},
	{
		question: "How do I reset my data?",
		answer: "Use the 'Reset all data' button in Settings. This permanently clears your counts, history and streaks from this device."
	},
	{
		question: "Is there an iOS or Android app?",
		answer: "The web app can be installed as a PWA from your browser. A dedicated native iOS and Android app launch is coming soon."
	}
];
var $$splitComponentImporter$5 = () => import("./faq-2Gt8wMVL.mjs");
var FAQ_SCHEMA = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: FAQS.map((f) => ({
		"@type": "Question",
		name: f.question,
		acceptedAnswer: {
			"@type": "Answer",
			text: f.answer
		}
	}))
};
var Route$6 = createFileRoute("/faq")({
	head: () => ({
		meta: [
			{ title: "FAQ - Mala Jaap Counter" },
			{
				name: "description",
				content: "Answers to common questions about Mala Jaap Counter: offline use, privacy, reminders, mala lengths and more."
			},
			{
				property: "og:title",
				content: "FAQ - Mala Jaap Counter"
			},
			{
				property: "og:description",
				content: "Common questions about using the offline Mala Jaap Counter app."
			},
			{
				property: "og:url",
				content: `${SITE_URL}/faq`
			},
			{
				property: "og:image",
				content: `${SITE_URL}/og/faq.png`
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: `${SITE_URL}/og/faq.png`
			},
			{
				property: "og:type",
				content: "article"
			}
		],
		links: [{
			rel: "canonical",
			href: `${SITE_URL}/faq`
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify(FAQ_SCHEMA)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var IOS_STEPS = [
	{
		title: "Open in Safari",
		body: "Visit this site in Safari on your iPhone or iPad.",
		icon: Smartphone
	},
	{
		title: "Tap Share",
		body: "Tap the Share button at the bottom or top of the screen.",
		icon: Share
	},
	{
		title: "Add to Home Screen",
		body: "Scroll the share sheet and tap \"Add to Home Screen\".",
		icon: SquarePlus
	},
	{
		title: "Tap Add",
		body: "Confirm by tapping \"Add\" in the top-right corner.",
		icon: Check
	},
	{
		title: "Open the app",
		body: "Find the Mala Jaap icon on your home screen and tap it.",
		icon: House
	}
];
var ANDROID_STEPS = [
	{
		title: "Open in Chrome",
		body: "Visit this site in Chrome on your Android phone or tablet.",
		icon: Smartphone
	},
	{
		title: "Tap the menu",
		body: "Tap the three-dot menu in the top-right corner.",
		icon: Menu
	},
	{
		title: "Add to Home Screen",
		body: "Tap \"Add to Home Screen\" or \"Install app\" from the menu.",
		icon: SquarePlus
	},
	{
		title: "Tap Add",
		body: "Confirm by tapping \"Add\" or \"Install\" in the prompt.",
		icon: Check
	},
	{
		title: "Open the app",
		body: "Find the Mala Jaap icon on your home screen and tap it.",
		icon: House
	}
];
var $$splitComponentImporter$4 = () => import("./install-lTqLHLjm.mjs");
var BASE_URL$1 = SITE_URL;
var HOWTO_SCHEMA = {
	"@context": "https://schema.org",
	"@type": "HowTo",
	name: "Install Mala Jaap Counter on your phone",
	description: "Step-by-step guide to add the Mala Jaap Counter web app to your iPhone or Android home screen.",
	totalTime: "PT2M",
	step: [...IOS_STEPS.map((s, i) => ({
		"@type": "HowToStep",
		position: i + 1,
		name: s.title,
		text: s.body,
		url: `${BASE_URL$1}/install#ios-step-${i + 1}`
	})), ...ANDROID_STEPS.map((s, i) => ({
		"@type": "HowToStep",
		position: i + 1,
		name: s.title,
		text: s.body,
		url: `${BASE_URL$1}/install#android-step-${i + 1}`
	}))]
};
var Route$5 = createFileRoute("/install")({
	head: () => ({
		meta: [
			{ title: "Install - Mala Jaap Counter" },
			{
				name: "description",
				content: "Add Mala Jaap Counter to your iPhone or Android home screen. Works offline like a native app, no store required."
			},
			{
				property: "og:title",
				content: "Install Mala Jaap Counter on your phone"
			},
			{
				property: "og:description",
				content: "Add Mala Jaap Counter to your home screen. A step-by-step guide for iPhone and Android."
			},
			{
				property: "og:url",
				content: `${BASE_URL$1}/install`
			},
			{
				property: "og:image",
				content: `${BASE_URL$1}/og/install.png`
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: `${BASE_URL$1}/og/install.png`
			},
			{
				property: "og:type",
				content: "article"
			}
		],
		links: [{
			rel: "canonical",
			href: `${BASE_URL$1}/install`
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify(HOWTO_SCHEMA)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./privacy-C7sYnEGC.mjs");
var Route$4 = createFileRoute("/privacy")({
	head: () => ({
		meta: [
			{ title: "Privacy Policy - Mala Jaap Counter" },
			{
				name: "description",
				content: "Mala Jaap Counter stores your counts, streaks and settings only on your own device. No accounts, no servers, no tracking."
			},
			{
				property: "og:title",
				content: "Privacy Policy - Mala Jaap Counter"
			},
			{
				property: "og:description",
				content: "Your japa data never leaves your device. No accounts, no analytics, no ads."
			},
			{
				property: "og:url",
				content: `${SITE_URL}/privacy`
			},
			{
				property: "og:image",
				content: `${SITE_URL}/og/privacy.png`
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: `${SITE_URL}/og/privacy.png`
			},
			{
				property: "og:type",
				content: "article"
			}
		],
		links: [{
			rel: "canonical",
			href: `${SITE_URL}/privacy`
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./settings-CqiVPp0e.mjs");
var Route$3 = createFileRoute("/settings")({
	head: () => ({
		meta: [
			{ title: "Settings - Mala Jaap Counter" },
			{
				name: "description",
				content: "Choose your bead, mala length, sound, vibration and diya-lit dark mode."
			},
			{
				property: "og:title",
				content: "Mala Jaap Settings"
			},
			{
				property: "og:description",
				content: "Personalise your bead, mala length and feedback."
			},
			{
				property: "og:url",
				content: `${SITE_URL}/settings`
			},
			{
				property: "og:image",
				content: `${SITE_URL}/og/settings.png`
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: `${SITE_URL}/og/settings.png`
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [{
			rel: "canonical",
			href: `${SITE_URL}/settings`
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var BASE_URL = SITE_URL;
var Route$2 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/stats",
				changefreq: "monthly",
				priority: "0.7"
			},
			{
				path: "/settings",
				changefreq: "monthly",
				priority: "0.5"
			},
			{
				path: "/faq",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/install",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/privacy",
				changefreq: "yearly",
				priority: "0.3"
			},
			{
				path: "/terms",
				changefreq: "yearly",
				priority: "0.3"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$1 = () => import("./stats-CCH1pq6I.mjs");
var Route$1 = createFileRoute("/stats")({
	head: () => ({
		meta: [
			{ title: "Your Japa Journey - Mala Jaap Counter" },
			{
				name: "description",
				content: "Day-wise mala and jaap history, lifetime totals, current streak and longest streak."
			},
			{
				property: "og:title",
				content: "Your Japa Journey"
			},
			{
				property: "og:description",
				content: "Lifetime totals, daily history and streaks for your japa practice."
			},
			{
				property: "og:url",
				content: `${SITE_URL}/stats`
			},
			{
				property: "og:image",
				content: `${SITE_URL}/og/stats.png`
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: `${SITE_URL}/og/stats.png`
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [{
			rel: "canonical",
			href: `${SITE_URL}/stats`
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./terms-Bvv8p1ZY.mjs");
var Route = createFileRoute("/terms")({
	head: () => ({
		meta: [
			{ title: "Terms of Use - Mala Jaap Counter" },
			{
				name: "description",
				content: "The simple terms for using Mala Jaap Counter: a free, offline japa counter provided as-is with your data kept on your device."
			},
			{
				property: "og:title",
				content: "Terms of Use - Mala Jaap Counter"
			},
			{
				property: "og:description",
				content: "Simple, plain-language terms for this free offline mala counter."
			},
			{
				property: "og:url",
				content: `${SITE_URL}/terms`
			},
			{
				property: "og:image",
				content: `${SITE_URL}/og/terms.png`
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: `${SITE_URL}/og/terms.png`
			},
			{
				property: "og:type",
				content: "article"
			}
		],
		links: [{
			rel: "canonical",
			href: `${SITE_URL}/terms`
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	FaqRoute: Route$6.update({
		id: "/faq",
		path: "/faq",
		getParentRoute: () => Route$8
	}),
	InstallRoute: Route$5.update({
		id: "/install",
		path: "/install",
		getParentRoute: () => Route$8
	}),
	PrivacyRoute: Route$4.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$8
	}),
	SettingsRoute: Route$3.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$8
	}),
	SitemapDotxmlRoute: Route$2.update({
		id: "/sitemap.xml",
		path: "/sitemap.xml",
		getParentRoute: () => Route$8
	}),
	StatsRoute: Route$1.update({
		id: "/stats",
		path: "/stats",
		getParentRoute: () => Route$8
	}),
	TermsRoute: Route.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$8
	})
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { requestReminderPermission as a, FAQS as i, ANDROID_STEPS as n, syncNativeReminder as o, IOS_STEPS as r, router_exports as t };
