import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { API_URL } from "@/constants/urls";

export const Profile = () => {
  // Handle file upload
  const handleChange = async (info: UploadChangeParam<UploadFile>) => {
    console.log(info);
    try {
      const formData = new FormData();

      // Ensure the file object exists before appending
      if (info.file.originFileObj) {
        formData.append("file", info.file.originFileObj);
      } else {
        throw new Error("No file object found.");
      }

      const res = await fetch(`${API_URL}/users/image`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Image upload failed.");
      }

      console.log({ message: "Image uploaded.", type: "success" });
    } catch (err) {
      console.error({ message: "Error uploading file.", type: "error" });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={handleChange}
    >
      {uploadButton}
    </Upload>
  );
};
