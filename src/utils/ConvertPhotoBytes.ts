export const convertPhotoToBytes = async (
  photoUri: string
): Promise<string> => {
  try {
    const response = await fetch(photoUri);
    const blob = await response.blob();
    const bytes = await blobToBase64(blob);
    return bytes;
  } catch (error) {
    console.error("Erro ao converter a foto em bytes:", error);
    throw error;
  }
};

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });
};
