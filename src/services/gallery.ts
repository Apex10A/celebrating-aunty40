import api from "./api";

function createFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  // Append all non-picture fields
  Object.entries(data).forEach(([key, value]) => {
    if (key !== "pictures") {
      console.log(key, value, "key-value");
      formData.append(key, value);
    }
  });

  // Handle pictures if present and is an array
  for (let i = 0; i < data.pictures.length; i++) {
    console.log(data.pictures[i], "This is ,,", i);
    formData.append("pictures", data.pictures[i]); // fieldName is typically "files" or "pictures"
  }

  console.log({ ...formData.entries() });

  return formData;
}

export async function getPictures() {
  try {
    const res = await api.get("/gallery/get");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postPicture(data: {
  pictures: FileList;
  category: string;
}) {
  try {
    const formData = createFormData(data);
    const res = await api.post(`/gallery/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePicture(pictureId: string) {
  try {
    const res = await api.delete(`gallery/delete/${pictureId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}
