import GlobalSettings from "../../models/global-settings.model";
import User from "../../models/user.model";
import Profile from "../../models/profile.model";
import Trip from "../../models/trips.model";
import { BaseService } from "../../services/base.service";
import { getGlobalSettings } from "../../utils/global-settings-cache.utils";

// Import seed data
import { globalSettingsData } from "./data/global-settings.data";
import { userData } from "./data/users.data";
import { profileData } from "./data/profile.data";
import { tripsData } from "./data/trips.data";

// Instantiate services
const globalSettingsService = new BaseService(GlobalSettings);
const userService = new BaseService(User);
const profileService = new BaseService(Profile);
const tripService = new BaseService(Trip);

// Function to seed notes, users, and global settings
export const seed = async () => {
  try {
    if (process.env.SEED == "true") {
      console.log("Seeding Data...");
      console.log("");

      await seedGlobalSettings();
      await seedUsers();
      const ids = await getSeededUserIds();
      await seedProfile(ids);
      await seedTrips(ids);
      console.log("Seeding completed successfully.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to seed global settings
const seedGlobalSettings = async () => {
  try {
    // Use returnNullOnNotFound to avoid throwing if not found
    const existingSettings = await getGlobalSettings();

    if (existingSettings) {
      console.log("Global settings already exist, skipping seed.");
      return;
    }

    const settings = await globalSettingsService.create(globalSettingsData);
    console.log("Global settings seeded:", settings);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to seed users
const seedUsers = async () => {
  const existingUsers = await userService.getAll();

  for (const user of userData) {
    if (existingUsers.some((u) => u.email === user.email)) {
      console.log(`User with email ${user.email} already exists, skipping seed.`);
    } else {
      const createdUser = await userService.create(user);
      console.log(`User seeded: ${createdUser.email}`);
    }
  }
};

// Function to seed profiles
const seedProfile = async (ids: { admin: string | null; user: string | null }) => {
  const existingProfiles = await profileService.getAll();

  for (const profile of profileData) {
    if (existingProfiles.some((p) => p.userId === profile.userId)) {
      console.log(`Profile for user ID ${profile.userId} already exists, skipping seed.`);
    } else {
      // Map temporary userIds to actual seeded user IDs
      if (profile.userId === "000000000000000000000001" && ids.admin) {
        profile.userId = ids.admin;
      } else if (profile.userId === "000000000000000000000002" && ids.user) {
        profile.userId = ids.user;
      } else {
        console.log(`User ID for profile not found, skipping seed for this profile.`);
        continue;
      }

      const createdProfile = await profileService.create(profile, false);
      console.log(`Profile seeded for user ID: ${createdProfile.userId}`);
    }
  }
};

// Function to seed trips
const seedTrips = async (ids: { admin: string | null; user: string | null }) => {
  const existingTrips = await tripService.getAll();

  for (const trip of tripsData) {
    if (existingTrips.some((t) => t._id === trip._id)) {
      console.log(`Trip with ID ${trip._id} already exists, skipping seed.`);
    } else {
      // Map temporary userIds to actual seeded user IDs
      if (trip.userId === "000000000000000000000001" && ids.admin) {
        trip.userId = ids.admin;
      } else if (trip.userId === "000000000000000000000002" && ids.user) {
        trip.userId = ids.user;
      } else {
        console.log(`User ID for trip not found, skipping seed for this trip.`);
        continue;
      }

      const createdTrip = await tripService.create(trip, false);
      console.log(`Trip seeded with ID: ${createdTrip._id}`);
    }
  }
};

// Function to get seeded user ids
const getSeededUserIds = async (): Promise<{ admin: string | null; user: string | null }> => {
  const [adminUser, normalUser] = await Promise.all([
    User.findOne({ email: "admin@example.com" }),
    User.findOne({ email: "user@example.com" }),
  ]);

  const adminId = adminUser?._id?.toString() || null;
  const userId = normalUser?._id?.toString() || null;

  return { admin: adminId, user: userId };
};
