import { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image, ImageProps } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { twMerge } from "tailwind-merge";
import { cssInterop } from "nativewind";
import Modal from "react-native-modal";

import Text from "@/shared/components/text";
import Colors from "../constants/Colors";

cssInterop(Image, {
  className: "style",
});

cssInterop(Modal, {
  className: "style",
});

interface ProfilePicProps extends Omit<ImageProps, "className"> {
  editable?: boolean;
  containerClassName?: string;
  imageClassName?: string;
}

function ProfilePic({
  editable,
  containerClassName,
  imageClassName,
  source,
  ...props
}: ProfilePicProps) {
  const [image, setImage] = useState<string>();
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  const toggleOptionsModal = useCallback(
    () => setOptionsModalVisible((prev) => !prev),
    [],
  );

  const openCamera = async () => {
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
  };

  const pickImage = async () => {
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
  };

  const removePic = useCallback(() => {
    setImage(undefined);
    toggleOptionsModal();
  }, [toggleOptionsModal]);

  return (
    <>
      <View className="items-center gap-3">
        {!source && !image && (
          <Ionicons
            name="person-circle-outline"
            size={128}
            color={Colors["app-text"]}
          />
        )}

        {(!!source || !!image) && (
          <Image
            {...props}
            source={source || image}
            placeholder="https://picsum.photos/200/300"
            className={twMerge("rounded-full w-32 h-32", imageClassName)}
          />
        )}

        {editable && (
          <TouchableOpacity
            className="flex-row items-center gap-2 -ml-5"
            onPress={toggleOptionsModal}
          >
            <FontAwesome5
              name="pencil-alt"
              size={16}
              color={Colors["app-secondary"]}
            />
            <Text className="text-app-secondary">Edit</Text>
          </TouchableOpacity>
        )}

        <Modal
          isVisible={optionsModalVisible}
          onBackdropPress={toggleOptionsModal}
          onSwipeComplete={toggleOptionsModal}
          swipeDirection="down"
          className="w-full m-0"
        >
          <View className="absolute bottom-0 w-full p-4 pt-5 pb-8 rounded-2xl bg-white">
            <View className="flex-row items-center gap-2 justify-center">
              <TouchableOpacity
                className="p-3 flex-1 items-center border border-app-border rounded-xl rounded-bl-3xl"
                onPress={openCamera}
              >
                <Ionicons name="camera" size={24} color={Colors["app-text"]} />
                <Text className="mt-2">Take a photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={twMerge(
                  "p-3 flex-1 items-center border border-app-border rounded-xl",
                  !source && !image && "rounded-br-3xl",
                )}
                onPress={pickImage}
              >
                <Ionicons name="image" size={24} color={Colors["app-text"]} />
                <Text className="mt-2">Pick a photo</Text>
              </TouchableOpacity>

              {(!!source || !!image) && (
                <TouchableOpacity
                  className="p-3 flex-1 items-center border border-app-border rounded-md rounded-br-3xl"
                  onPress={removePic}
                >
                  <Ionicons
                    name="close-circle"
                    size={24}
                    color={Colors["app-text"]}
                  />
                  <Text className="mt-2">Remove pic</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

export default ProfilePic;
