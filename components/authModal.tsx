"use client";

import { clearEmail, verifyOtp } from "@/lib/auth";
import { Flex, Input, Modal, Typography, message } from "antd";
import type { GetProps } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Title } = Typography;

type OTPProps = GetProps<typeof Input.OTP>;

interface OtpModalProps {
  visible: boolean;
  onClose: () => void;
}

export const OtpModal = ({ visible, onClose }: OtpModalProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>(""); // controlled state

  const onChange: OTPProps["onChange"] = (text) => {
    setOtp(text); // update state
  };

  const onInput: OTPProps["onInput"] = async (value) => {
    if (value.length === 6) {
      const otpValue = value.join("");
      const result = await verifyOtp(otpValue);

      if (result.status === 200) {
        message.success("OTP Verified ✅");
        clearEmail();
        setOtp(""); // clear the OTP input
        onClose();
        router.push("/login");
      } else {
        message.error("Invalid OTP ❌");
        setOtp(""); // reset so user can re-enter
      }
    }
  };

  const sharedProps: OTPProps = {
    value: otp, // bind to state
    onChange,
    onInput,
  };

  return (
    <Modal
      open={visible}
      title="OTP Verification"
      footer={null}
      onCancel={onClose}
      width={400}
    >
      <Flex gap="middle" align="flex-start" vertical>
        <Title level={5}>Enter OTP</Title>
        <Input.OTP variant="filled" {...sharedProps} />
      </Flex>
    </Modal>
  );
};
