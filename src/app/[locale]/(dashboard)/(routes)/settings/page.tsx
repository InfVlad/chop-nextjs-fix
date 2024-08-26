// components/SettingsScreen.tsx
"use client";
import { useSchemaStore } from "@/providers/schema-store-provider";
import LanguageCombobox from "@/components/language-combobox";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";
import SettingSection from "./_components/setting-section";
import SettingItem from "./_components/setting-item";
import SettingSelect from "./_components/setting-select";

export default function SettingsScreen() {
    const { user_input_generation } = useSchemaStore((state) => state);
    const router = useRouter();
    const t = useTranslations("");

    return (
        <div className="flex justify-center h-fit bg-background text-foreground p-8">
            <div className="flex flex-col space-y-6 w-full md:w-full md:max-w-md justify-between">
                <h1 className="text-2xl font-semibold">{t("Settings")}</h1>

                {/* Language Setting */}
                <SettingSection title={t("Language")}>
                    <SettingItem label={t("Language")}>
                        <LanguageCombobox />
                    </SettingItem>
                </SettingSection>

                {/* Dark Mode Setting */}
                <SettingSection title={t("Dark_mode")}>
                    <SettingItem label={t("Dark_mode")}>
                        <ThemeToggle variant="switch" />
                    </SettingItem>
                </SettingSection>

                {/* Account Settings */}
                <SettingSection title="Account Settings">
                    <SettingItem
                        label="Password"
                        type="label-button"
                        buttonText="Change Password"
                        onClick={() => console.log('Change Password')}
                    />
                    <SettingItem
                        label="Two-Factor Authentication"
                        type="switch"
                        switchId="two-factor-authentication"
                    />
                </SettingSection>

                {/* Privacy Settings */}
                <SettingSection title="Privacy Settings">
                    <SettingSelect
                        label="Profile Visibility"
                        placeholder="Select visibility"
                        selectOptions={[
                            { value: "public", label: "Public" },
                            { value: "private", label: "Private" },
                            { value: "friends-only", label: "Friends Only" }
                        ]}
                    />
                    <SettingItem
                        label="Activity Status"
                        type="switch"
                        switchId="activity-status"
                    />
                    <SettingItem
                        label="Blocked Users"
                        type="label-button"
                        buttonText="Manage Blocked Users"
                        onClick={() => console.log('Manage Blocked Users')}
                    />
                    <SettingItem
                        label="Search Privacy"
                        type="switch"
                        switchId="search-privacy"
                    />
                    <SettingItem
                        label="Data Download"
                        type="label-button"
                        buttonText="Request Data Download"
                        onClick={() => console.log('Request Data Download')}
                    />
                </SettingSection>

                {/* Security Settings */}
                <SettingSection title="Security Settings">
                    <SettingItem
                        label="Login Alerts"
                        type="switch"
                        switchId="login-alerts"
                    />
                    <SettingItem
                        label="Session Management"
                        type="label-button"
                        buttonText="Manage Sessions"
                        onClick={() => console.log('Manage Sessions')}
                    />
                    <SettingItem
                        label="Security Questions"
                        type="label-button"
                        buttonText="Manage Security Questions"
                        onClick={() => console.log('Manage Security Questions')}
                    />
                </SettingSection>

                {/* Notification Settings */}
                <SettingSection title="Notification Settings">
                    <SettingItem
                        label={t("Email Notifications")}
                        type="switch"
                        switchId="email-notifications"
                    />
                    <SettingItem
                        label={t("Push Notifications")}
                        type="switch"
                        switchId="push-notifications"
                    />
                    <SettingItem
                        label={t("In-app Notifications")}
                        type="switch"
                        switchId="in-app-notifications"
                    />
                    <SettingItem
                        label={t("Notification Sound")}
                        type="switch"
                        switchId="notification-sound"
                    />
                    <SettingItem
                        label={t("Do Not Disturb")}
                        type="switch"
                        switchId="do-not-disturb"
                    />
                    <SettingSelect
                        label={t("Notification Frequency")}
                        placeholder="Select frequency"
                        selectOptions={[
                            { value: "low", label: "Low" },
                            { value: "normal", label: "Normal" },
                            { value: "high", label: "High" }
                        ]}
                    />
                </SettingSection>

                {/* Content Preferences */}
                <SettingSection title="Content Preferences">
                    <SettingItem
                        label="Content Filtering"
                        type="switch"
                        switchId="content-filtering"
                    />
                    <SettingItem
                        label="Ad Preferences"
                        type="label-button"
                        buttonText="Manage Ad Preferences"
                        onClick={() => console.log('Manage Ad Preferences')}
                    />
                </SettingSection>

                {/* Appearance Settings */}
                <SettingSection title="Appearance Settings">
                    <SettingSelect
                        label="Font Size"
                        placeholder="Select font size"
                        selectOptions={[
                            { value: "small", label: "Small" },
                            { value: "medium", label: "Medium" },
                            { value: "large", label: "Large" }
                        ]}
                    />
                    <SettingItem
                        label="Custom Background"
                        type="label-button"
                        buttonText="Set Background"
                        onClick={() => console.log('Set Background')}
                    />
                </SettingSection>

                {/* Communication Preferences */}
                <SettingSection title="Communication Preferences">
                    <SettingSelect
                        label="Message Requests"
                        placeholder="Select who can message you"
                        selectOptions={[
                            { value: "everyone", label: "Everyone" },
                            { value: "friends", label: "Friends" },
                            { value: "no-one", label: "No One" }
                        ]}
                    />
                    <SettingSelect
                        label="Comments and Replies"
                        placeholder="Select who can comment"
                        selectOptions={[
                            { value: "everyone", label: "Everyone" },
                            { value: "followers", label: "Followers" },
                            { value: "friends", label: "Friends" }
                        ]}
                    />
                    <SettingSelect
                        label="Tagged Posts"
                        placeholder="Select who can tag you"
                        selectOptions={[
                            { value: "everyone", label: "Everyone" },
                            { value: "followers", label: "Followers" },
                            { value: "friends", label: "Friends" }
                        ]}
                    />
                </SettingSection>

                {/* Accessibility Settings */}
                <SettingSection title="Accessibility Settings">
                    <SettingItem
                        label="Text-to-Speech"
                        type="switch"
                        switchId="text-to-speech"
                    />
                    <SettingItem
                        label="Color Contrast"
                        type="switch"
                        switchId="color-contrast"
                    />
                    <SettingItem
                        label="Subtitles and Captions"
                        type="switch"
                        switchId="subtitles-captions"
                    />
                </SettingSection>

                {/* Data and Storage */}
                <SettingSection title="Data and Storage">
                    <SettingItem
                        label="Storage Management"
                        type="label-button"
                        buttonText="Manage Storage"
                        onClick={() => console.log('Manage Storage')}
                    />
                    <SettingSelect
                        label="Download Quality"
                        placeholder="Select quality"
                        selectOptions={[
                            { value: "low", label: "Low" },
                            { value: "medium", label: "Medium" },
                            { value: "high", label: "High" }
                        ]}
                    />
                </SettingSection>

                {/* Legal and Compliance */}
                <SettingSection title="Legal and Compliance">
                    <SettingItem
                        label="Terms of Service"
                        type="label-button"
                        buttonText="View Terms"
                        onClick={() => console.log('View Terms')}
                    />
                    <SettingItem
                        label="Privacy Policy"
                        type="label-button"
                        buttonText="View Privacy Policy"
                        onClick={() => console.log('View Privacy Policy')}
                    />
                    <SettingItem
                        label="Cookie Preferences"
                        type="label-button"
                        buttonText="Manage Cookies"
                        onClick={() => console.log('Manage Cookies')}
                    />
                    <SettingItem
                        label="Report a Problem"
                        type="label-button"
                        buttonText="Report Issue"
                        onClick={() => console.log('Report Issue')}
                    />
                </SettingSection>

                {/* Support and Feedback */}
                <SettingSection title="Support and Feedback">
                    <SettingItem
                        label="Help Center"
                        type="label-button"
                        buttonText="Visit Help Center"
                        onClick={() => console.log('Visit Help Center')}
                    />
                    <SettingItem
                        label="Contact Support"
                        type="label-button"
                        buttonText="Contact Us"
                        onClick={() => console.log('Contact Us')}
                    />
                    <SettingItem
                        label="Bug Report"
                        type="label-button"
                        buttonText="Report a Bug"
                        onClick={() => console.log('Report a Bug')}
                    />
                </SettingSection>

                {/* Experimental Features (Beta Settings) */}
                <SettingSection title="Experimental Features">
                    <SettingItem
                        label="Opt-in to Beta Features"
                        type="switch"
                        switchId="beta-features"
                    />
                    <SettingItem
                        label="Feedback for New Features"
                        type="label-button"
                        buttonText="Give Feedback"
                        onClick={() => console.log('Give Feedback')}
                    />
                </SettingSection>

                {/* Activity Log */}
                <SettingSection title="Activity Log">
                    <SettingItem
                        label="Account Activity"
                        type="label-button"
                        buttonText="View Activity"
                        onClick={() => console.log('View Activity')}
                    />
                    <SettingItem
                        label="Content Interaction"
                        type="label-button"
                        buttonText="View Interactions"
                        onClick={() => console.log('View Interactions')}
                    />
                </SettingSection>

                {/* Log Out Button */}
                <SettingItem
                    label={t("Log Out")}
                    type="label-button"
                    buttonText={t("Log_out")}
                    buttonVariant="destructive"
                    onClick={() => router.push("/api/auth/logout")}
                />
            </div>
        </div>
    );
}
