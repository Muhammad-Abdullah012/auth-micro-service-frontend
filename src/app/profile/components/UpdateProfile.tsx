"use client";
import { FaEdit } from "react-icons/fa";
import React, { useState } from "react";
import { User } from "../../../interfaces";
import { UserIcon } from "@/components/ui/header";
import { checkUserName, uploadFiles } from "../../../utils/request";
import { toast } from "react-toastify";
import { formatCamelCase } from "../../../utils/format";

interface UserProfileProps {
  user: User | null;
  onUpdateField: (updatedValues: {}) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateField }) => {
  const [isEditing, setIsEditing] = useState({});
  const [editedValue, setEditedValue] = useState({});
  const [err, setErr] = useState("");

  const handleEdit = (
    key: keyof typeof filteredUser,
    initialEditedValue: any
  ) => {
    setIsEditing({ ...isEditing, [key]: true });
    setEditedValue({ ...editedValue, [key]: initialEditedValue });
  };

  const handleSave = (key: string) => {
    setIsEditing({ ...isEditing, [key]: false });
    onUpdateField(editedValue);
    setIsEditing({});
    setEditedValue({});
  };

  const handleCancel = (key: keyof typeof filteredUser) => {
    setIsEditing({ ...isEditing, [key]: false });
    setEditedValue((editedValue) => {
      const { [key]: z, ...rest } = editedValue;
      return rest;
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    checkUserName({ username: e.target.value })
      .then((res) => {
        if (res == null) throw new Error("Something went wrong!");
        if (!res.ok) {
          setErr(res.json.message);
        } else {
          setErr("");
        }
      })
      .catch((err) => {
        toast.error("Error checking username!");
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];

    if (selectedImage) {
      uploadFiles({ profileImage: selectedImage })
        .then((res) => {
          if (res == null || !res.ok) return;
          const data = res.json.data;

          onUpdateField({ profileImage: data?.[0]?.profileImage });
        })
        .catch((err) => {
          toast.error("Error uploading image!");
        });
    }
  };

  const {
    createdAt,
    updatedAt,
    id,
    deleted,
    passwordHash,
    passwordResetToken,
    passwordResetExpires,
    twoFactorSecret,
    profileImage,
    lastLogin,
    refreshToken,
    verificationToken,
    role,
    status,
    additionalMetadata,
    ...filteredUser
  } = user ?? {};

  return (
    <>
      <div className={"flex flex-row justify-center items-center"}>
        {user?.profileImage ? (
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/images/${user?.profileImage}`}
            alt="profile"
            className="w-16 h-16 rounded-full"
            width={16}
            height={16}
          />
        ) : (
          <UserIcon className="w-16 h-16 rounded-full" />
        )}
        <input
          id="imageInput"
          type="file"
          name="profileImage"
          accept="image/*"
          max={1}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <FaEdit
          className="self-end text-blue-500 hover:underline focus:outline-none cursor-pointer"
          onClick={() => {
            document.getElementById("imageInput")?.click();
          }}
        />
      </div>

      <div className={"flex flex-col gap-4"}>
        {(
          Object.keys(filteredUser ?? {}) as Array<keyof typeof filteredUser>
        ).map((key, idx) => {
          if (filteredUser[key] == null) return null;
          const isBooleanField = typeof filteredUser[key] === "boolean";
          return isEditing[key] ? (
            <div className="flex flex-col gap-2" key={idx}>
              <input
                type={isBooleanField ? "checkbox" : "text"}
                value={editedValue[key]}
                defaultChecked={isBooleanField ? editedValue[key] : undefined}
                onChange={(e) => {
                  setEditedValue({
                    ...editedValue,
                    [key]: isBooleanField ? e.target.checked : e.target.value,
                  });
                }}
                onBlur={key === "username" ? handleBlur : undefined}
                className="border border-gray-300 px-2 py-1 rounded-md"
              />
              {err && <p className="text-red-500 text-xs italic">{err}</p>}
              <div className="flex justify-between">
                <button
                  onClick={() => handleSave(key)}
                  disabled={!!err}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={() => handleCancel(key)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-row justify-center items-center gap-4"
              key={idx}
            >
              <span className={"capitalize"}>{formatCamelCase(key)}</span>

              {isBooleanField ? (
                <span className="mr-2">
                  <input type="checkbox" checked={filteredUser[key]} readOnly />
                </span>
              ) : (
                <span className="mr-2">{filteredUser[key]}</span>
              )}

              {key !== "emailVerified" && (
                <FaEdit
                  onClick={() => handleEdit(key, filteredUser?.[key] ?? "")}
                  className="text-blue-500 hover:underline focus:outline-none cursor-pointer"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* <>
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded-md"
            />
            <div className="flex justify-between">
              <button
                onClick={() => handleSave("lastName")}
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center">
            <span className="mr-2">{user?.lastName}</span>
            <FaEdit
              onClick={() => handleEdit("lastName", user?.lastName ?? "")}
              className="text-blue-500 hover:underline focus:outline-none cursor-pointer"
            />
          </div>
        )}
      </> */}
    </>
  );
};

export default UserProfile;
