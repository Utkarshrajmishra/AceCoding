import { databaseRef, storageRef } from "@/Firebase";
import { doc, setDoc } from "firebase/firestore";

import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
class DB {
  async UploadImage(
    image: File,
    imageName: string,
    email: string,
    name: string
  ) {
    try {
      const ImageStorageRef = ref(storageRef, `image${imageName}`);
      const snapShot = await uploadBytes(ImageStorageRef, image);
      try {
        const ImageUrl = await getDownloadURL(snapShot.ref);
        return this.UploadUserInfo(email, ImageUrl, name);
      } catch (error) {
        return { storage: error, status: false };
      }
    } catch (error) {
      return { storage: error, status: false };
    }
  }

  async UploadUserInfo(email: string, imageUrl: string, name: string) {
    const UserInfo = { email: email, name: name, imageUrl: imageUrl };
    try {
      await setDoc(doc(databaseRef, "UserInfo", email), UserInfo);
      console.log("hello");
      return this.UploadDates(email);
        
    } catch (error) {
      return { storage: error, status: false };
    }
  }

  async UploadDates(email: string) {
    try {
      console.log("hello")
      const next30Days = this.generateNext30DaysObject();
       await setDoc(doc(databaseRef, "Dates", email), next30Days);
       return { storage: { user: "User" }, status: true };
    } catch (error) {
      console.log(error)
      return { storage: error, status: false };
    }
  }


  generateNext30DaysObject(): Record<string, boolean> {
    const result: Record<string, boolean> = {};
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Format the date as YYYY-MM-DD
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      result[formattedDate] = false;
    }

    return result;
  }
}

const DBService = new DB();
export default DBService;
