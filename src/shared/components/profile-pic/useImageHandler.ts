import { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";

export default function useImageHandler({
  setImage,
  toggleOptionsModal,
  clearImage,
}: {
  setImage: (uri: string | undefined) => void;
  toggleOptionsModal: () => void;
  clearImage: () => void;
}) {
  const openCamera = useCallback(async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.PAGE_SHEET,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    toggleOptionsModal();
  }, [toggleOptionsModal, setImage]);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    toggleOptionsModal();
  }, [toggleOptionsModal, setImage]);

  const removePic = useCallback(() => {
    toggleOptionsModal();
    clearImage();
  }, [toggleOptionsModal, clearImage]);

  return { openCamera, pickImage, removePic };
}
