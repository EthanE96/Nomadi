import { IProfile, UserType, GenderType, SafetyLevel, TravelExperience } from "../../../models/profile.model";

export const profileData: Partial<IProfile>[] = [
  //^ Admin user profile (001)
  {
    userId: "000000000000000000000001",
    userType: UserType.DigitalNomad,
    age: 35,
    gender: GenderType.Male,
    nationality: "USA",
    languagesSpoken: ["English", "Spanish"],
    safetyLevel: SafetyLevel.Moderate,
    travelExperience: TravelExperience.Experienced,
    additionalInfo: "Loves remote work and exploring new cultures.",
    adventure: 4,
    culture: 5,
    food: 5,
    cityLife: 4,
    nightlife: 3,
    nature: 4,
    spontaneity: 5,
  },
  //^  User trips profile (002)
  {
    userId: "000000000000000000000002",
    userType: UserType.Vacationer,
    age: 28,
    gender: GenderType.Female,
    nationality: "Canada",
    languagesSpoken: ["English", "French"],
    safetyLevel: SafetyLevel.Low,
    travelExperience: TravelExperience.Beginner,
    additionalInfo: "Enjoys relaxing vacations and trying local foods.",
    adventure: 2,
    culture: 4,
    food: 5,
    cityLife: 3,
    nightlife: 2,
    nature: 3,
    spontaneity: 2,
  },
];
