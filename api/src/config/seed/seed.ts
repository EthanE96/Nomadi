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
    // Map temporary userIds to actual seeded user IDs first
    let mappedUserId = profile.userId;
    if (profile.userId === "000000000000000000000001" && ids.admin) {
      mappedUserId = ids.admin;
    } else if (profile.userId === "000000000000000000000002" && ids.user) {
      mappedUserId = ids.user;
    } else {
      console.log(`User ID for profile not found, skipping seed for this profile.`);
      continue;
    }

    // Check if profile already exists with the mapped userId
    if (existingProfiles.some((p) => p.userId === mappedUserId)) {
      console.log(`Profile for user ID ${mappedUserId} already exists, skipping seed.`);
    } else {
      // Update the profile object with the mapped userId
      profile.userId = mappedUserId;

      const createdProfile = await profileService.create(profile, false);
      console.log(`Profile seeded for user ID: ${createdProfile.userId}`);
    }
  }
};

// Function to seed trips
const seedTrips = async (ids: { admin: string | null; user: string | null }) => {
  const existingTrips = await tripService.getAll();

  for (const trip of tripsData) {
    // Map temporary userIds to actual seeded user IDs first
    let mappedUserId = trip.userId;
    if (trip.userId === "000000000000000000000001" && ids.admin) {
      mappedUserId = ids.admin;
    } else if (trip.userId === "000000000000000000000002" && ids.user) {
      mappedUserId = ids.user;
    } else {
      console.log(`User ID for trip not found, skipping seed for this trip.`);
      continue;
    }

    // Check if trip already exists with the mapped userId and same destination
    if (existingTrips.some((t) => t.userId === mappedUserId && t.destination === trip.destination)) {
      console.log(`Trip to ${trip.destination} for user ID ${mappedUserId} already exists, skipping seed.`);
    } else {
      // Update the trip object with the mapped userId
      trip.userId = mappedUserId;

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
