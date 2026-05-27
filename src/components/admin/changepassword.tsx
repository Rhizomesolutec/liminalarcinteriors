"use client";
import React, { useState } from "react";
import {  Save, } from "lucide-react";
import { toast } from "sonner";
// import { toast } from "sonner";

const ChangePassword = () => {
  // const [Password] = useState();
  // const [PasswordError, setPasswordError] = useState({
  //   landingPageNumber: false,
  //   whatsappNumber: false,
  // });

  // const [isEditing, setIsEditing] = useState(false);
  const [tempPassword, setTempPassword] = useState({oldPassword:"",newPassword:""});

  // const isValidUAEPhoneNumber = (phoneNumber: string) => {
  //   if (!phoneNumber || typeof phoneNumber !== "string") {
  //     return false;
  //   }

  //   const cleanNumber = phoneNumber.replace(/[\s\-\(\)]/g, "");

  //   const uaePatterns = [
  //     /^\+971(5[024568]|[2-4679])\d{7}$/, // +971
  //     /^00971(5[024568]|[2-4679])\d{7}$/, // 00971
  //     /^0(5[024568]|[2-4679])\d{7}$/, // 0
  //     /^971(5[024568]|[2-4679])\d{7}$/, // 971
  //   ];

  //   return uaePatterns.some((pattern) => pattern.test(cleanNumber));
  // };

  // Enhanced validation with more detailed error messages
  // const validateUAEPhoneNumber = (phoneNumber: string) => {
  //   if (!phoneNumber || typeof phoneNumber !== "string") {
  //     return { isValid: false, error: "Phone number is required" };
  //   }

  //   const cleanNumber = phoneNumber.replace(/[\s\-\(\)]/g, "");

  //   // Check if it's a valid UAE number
  //   if (!isValidUAEPhoneNumber(cleanNumber)) {
  //     return {
  //       isValid: false,
  //       error:
  //         "Please enter a valid UAE phone number (e.g., +971 50 123 4567 or 050 123 4567)",
  //     };
  //   }

  //   return { isValid: true, error: null };
  // };
  const handleSave = () => {
    // if (!validateUAEPhoneNumber(tempPassword.landingPageNumber).isValid) {
    //   setPasswordError((prv) => ({ ...prv, landingPageNumber: true }));
    //   return;
    // } else {
    //   setPasswordError((prv) => ({ ...prv, landingPageNumber: false }));
    // }

    // if (!validateUAEPhoneNumber(tempPassword.whatsappNumber).isValid) {
    //   setPasswordError((prv) => ({ ...prv, whatsappNumber: true }));
    //   return;
    // } else {
    //   setPasswordError((prv) => ({ ...prv, whatsappNumber: false }));
    // }
    // setPasswordError({ landingPageNumber: false, whatsappNumber: false });

    const res = fetch("/api/adminDashboard/updatePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempPassword),
    });

    toast.promise(res, {
      loading: "Loading...",
      success: () => {
        setTempPassword({oldPassword:"",newPassword:""});
        // setIsEditing(false);
        return `Password successfully updated`;
      },
      error:async (data) => {
        // setIsEditing(false);
        console.log(data)
        return `error ${data}`;
      },

    });
  };

  // const handleCancel = () => {
  //   setTempPassword(Password);
  //   setIsEditing(false);
  // };

  return (
    <div className=" pt-6">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Contact Information Section */}
        <div className="mb-8">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
              {/* <Phone className="text-[#7F6456]" size={28} /> */}
              change password
              </h2>
            </div>

            {/* Warning message */}
            <div className="mb-4 p-3 bg-yellow-100/20 border border-yellow-400/40 rounded text-yellow-900 text-sm">
              <strong>Warning:</strong> There is no &quot;Forgot Password&quot; option. Please be careful when changing your password.
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Old password
              </label>

              <input
              type="tel"
                value={tempPassword.oldPassword}
                onChange={(e) =>
                setTempPassword((prev) => ({
                  ...prev,
                  oldPassword: e.target.value,
                }))
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
              />
              </div>

              <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                New Password
              </label>

              <input
                type="tel"
                value={tempPassword.newPassword}
                onChange={(e) =>
                setTempPassword((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
              />
               
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
              <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-[#7F6456] text-white rounded-lg hover:bg-[#7F6456]/80 transition-all duration-200 font-medium"
              >
              <Save size={16} />
              Save Changes
              </button>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
