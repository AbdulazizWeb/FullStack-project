import { useEffect, useMemo } from "react";
import { Form, Input, Modal, Select } from "antd";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { useGetAllRolesQuery } from "@/entities/role/api/role.api";
import {
  useAddUserMutation,
  useEditUserMutation,
} from "@/entities/user/api/user.api";
import type { UserType } from "@/entities/user/model/types";
import { messageApi } from "@/shared/ui/message-provider";

type Mode = "create" | "edit";

type UserForm = Omit<UserType, "id"> & {
  password: string;
  roleIds: string[];
};

type PropType = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  mode: Mode;
  user?: UserType | null;
};

export const UserModal = ({
  isModalOpen,
  setIsModalOpen,
  mode,
  user,
}: PropType) => {
  const [addUser, { isLoading: addLoading }] = useAddUserMutation();
  const [updateUser, { isLoading: updateLoading }] = useEditUserMutation();

  const { data: roles, isLoading: rolesLoading } = useGetAllRolesQuery();

  const isEdit = mode === "edit";
  const confirmLoading = isEdit ? updateLoading : addLoading;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    defaultValues: { roleIds: [] },
  });

  const roleOptions = useMemo(
    () =>
      (Array.isArray(roles) ? roles : []).map((r) => ({
        label: r.name,
        value: r.id,
      })),
    [roles]
  );

  useEffect(() => {
    if (!isModalOpen) return;

    if (!isEdit) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roleIds: [],
      });
      return;
    }

    if (user) {
      const roleIds = user.roles?.map((r) => r.id) as string[];

      reset({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        password: "",
        roleIds,
      });
    }
  }, [isModalOpen, isEdit, user, reset]);

  const close = () => {
    setIsModalOpen(false);
    reset({ roleIds: [] });
  };

  const onSubmit: SubmitHandler<UserForm> = async (data) => {
    try {
      if (!isEdit) {
        await addUser({
          ...data,
        }).unwrap();

        messageApi.success("User added successfully");
        close();
        return;
      }

      if (!user?.id) return;

      const payload = {
        ...data,
      };

      await updateUser({ id: user.id, ...payload }).unwrap();
      messageApi.success("User edited successfully");
      close();
    } catch {
      messageApi.error("Error");
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit user" : "Add user"}
      open={isModalOpen}
      onCancel={close}
      onOk={() => handleSubmit(onSubmit)()}
      confirmLoading={confirmLoading}
      okText={isEdit ? "Save changes" : "Add user"}
      destroyOnClose
    >
      <Form layout="vertical">
        <Form.Item
          label="First name"
          validateStatus={errors.firstName ? "error" : ""}
          help={errors.firstName?.message}
        >
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <Input size="large" {...field} placeholder="first name" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Last name"
          validateStatus={errors.lastName ? "error" : ""}
          help={errors.lastName?.message}
        >
          <Controller
            name="lastName"
            control={control}
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <Input size="large" {...field} placeholder="last name" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <Input size="large" {...field} placeholder="email" />
            )}
          />
        </Form.Item>

        <Form.Item
          label={isEdit ? "New password" : "Password"}
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field }) => (
              <Input.Password size="large" {...field} placeholder="password" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Roles"
          validateStatus={errors.roleIds ? "error" : ""}
          help={errors.roleIds?.message as string}
        >
          <Controller
            name="roleIds"
            control={control}
            rules={{ required: "Select at least one role" }}
            render={({ field }) => (
              <Select
                mode="multiple"
                size="large"
                placeholder="Select roles"
                loading={rolesLoading}
                options={roleOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
