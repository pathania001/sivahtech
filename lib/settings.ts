import { query } from "./db";

export type GlobalSettings = {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  linkedinProfile: string;
  linkedinCompany: string;
};

export const defaultSettings: GlobalSettings = {
  companyName: "Sivah Tech",
  email: "info@sivahtech.com",
  phone: "+91 75082 76752",
  address: "Plot E, 195, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Mohali, Punjab, India",
  facebook: "https://www.facebook.com/SivahTech",
  linkedinProfile: "https://in.linkedin.com/in/sivah-tech",
  linkedinCompany: "https://in.linkedin.com/company/sivah-tech"
};

export async function getSettings(): Promise<GlobalSettings> {
  const rows = await query<{ setting_key: keyof GlobalSettings; setting_value: string }>(
    "SELECT setting_key, setting_value FROM settings WHERE setting_group = 'global'"
  );
  return rows.reduce(
    (settings, item) => ({
      ...settings,
      [item.setting_key]: item.setting_value
    }),
    defaultSettings
  );
}

export function applySettings(html: string, settings: GlobalSettings) {
  return html
    .replaceAll("Sivah Tech", settings.companyName)
    .replaceAll("info@sivahtech.com", settings.email)
    .replaceAll("+91 75082 76752", settings.phone)
    .replaceAll("Plot E, 195, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Mohali, Punjab, India", settings.address)
    .replaceAll("https://www.facebook.com/SivahTech", settings.facebook)
    .replaceAll("https://in.linkedin.com/in/sivah-tech", settings.linkedinProfile)
    .replaceAll("https://in.linkedin.com/company/sivah-tech", settings.linkedinCompany);
}
