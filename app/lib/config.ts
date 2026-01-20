export const config = {
    // App
    appMasterApiKey: process.env.APP_MASTER_API_KEY,

    // Auth
    clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    clerkSecretKey: process.env.CLERK_SECRET_KEY,

    // Feature Flags
    useGoogleDrive: !!process.env.APP_MASTER_API_KEY, // Enable if key is present
};

if (!config.appMasterApiKey) {
    console.warn("⚠️ APP_MASTER_API_KEY is not set. Some features may be limited.");
}
