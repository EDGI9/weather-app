import { ProfileItem } from "../classes/profile-item";
import { PROFILE_ITEMS } from "../store/profile.data";

export class ProfileService {
  getProfiles() {
    return PROFILE_ITEMS;
  }

  saveNewProfile(cities: string[]) {
    const profileName = "Profile " + PROFILE_ITEMS.length;
    const profile = new ProfileItem(profileName, cities);
    if (
      PROFILE_ITEMS.map((profile) => profile.profileName).indexOf(profileName) <
      0
    ) {
      PROFILE_ITEMS.push(profile);
    }
  }

  deleteProfile(profile: ProfileItem) {
    PROFILE_ITEMS.splice(PROFILE_ITEMS.indexOf(profile), 1);
  }
}
