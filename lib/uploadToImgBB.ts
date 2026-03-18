export async function uploadToImgBB(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.data.url; // public image URL
}