# Shipping Mala Jaap to the App Store & Play Store

The web app is unchanged - Capacitor wraps the exact same build in a native iOS
and Android shell. Everything below runs on your local machine.

## One-time setup

1. Clone the project repository, then:
   ```bash
   git clone <your-repo-url>
   cd <your-repo>
   npm install
   ```
2. Create the native projects:
   ```bash
   npx cap add ios       # macOS + Xcode required
   npx cap add android   # Android Studio required
   ```

## Every time you change the app

```bash
npm run build:mobile   # builds the app and writes a fully offline bundle to dist/client
npx cap sync           # copies that bundle into the iOS/Android projects
```

Then open the native project and run/archive:

```bash
npx cap open ios
npx cap open android
```

## What `build:mobile` does

A normal deploy renders pages on a server. A store app has no server, so the
script builds the app, boots the production build locally, saves each screen
(`/`, `/stats`, `/settings`) as a static HTML file, and shuts the server down.
The app then runs entirely from the device - all counts, streaks and history
stay in the device's local storage, exactly as on the web.

## App identity

Edit `capacitor.config.ts` to change:

- `appId` - reverse-domain bundle ID (`app.malajaap.counter`). Set this before
  your first store upload; it cannot be changed afterwards.
- `appName` - the name shown under the icon.

## Store requirements checklist

**Apple ($99/year, Mac + Xcode)**

- App Store Connect record, bundle ID matching `appId`
- Icon 1024×1024, screenshots for 6.7" and 6.5" iPhones
- Privacy policy URL and "Data Not Collected" privacy nutrition label
  (true here - nothing leaves the device)
- Archive in Xcode → Distribute App → App Store Connect

**Google ($25 one-time, Android Studio)**

- Play Console app, signed AAB (`Build → Generate Signed Bundle`)
- Icon 512×512, feature graphic 1024×500, at least 2 screenshots
- Data safety form (no data collected), content rating questionnaire

## Icons and splash

Place a 1024×1024 `icon.png` and optional `splash.png` in a `resources/` folder
and generate every required size:

```bash
npx @capacitor/assets generate
```

## Note on Apple review

Guideline 4.2 rejects apps that are only a wrapped website. This app helps its
case with offline storage, haptics, sound and a native splash/status bar. If it
is rejected, the strongest additions are daily reminder local notifications
(`@capacitor/local-notifications`) and a home-screen widget.
