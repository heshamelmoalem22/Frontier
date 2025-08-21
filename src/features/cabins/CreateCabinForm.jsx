/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useCreateEditCabin } from "./useCreateCabin";


const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  white-space: nowrap;
`;

const TextareaStyle = styled.textarea`
  width: 175px;
`;
const ButtonsStyle = styled.div`
display: flex;
justify-content:flex-end;
gap: 1rem;
`;

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } =  useForm({
  defaultValues: isEditSession ? editValues : { discount: 0 },
});

   const { createOrEditCabin, isLoading } = useCreateEditCabin(() => {
    reset();
    if (onClose) onClose();
  });


  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const cabinData = { ...data, image };
    createOrEditCabin({ newCabinData: cabinData, id: editId });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <input disabled={isLoading} type="text" id="name" {...register("name", { required: "Required" })} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <input disabled={isLoading} type="number" id="maxCapacity"
          {...register("maxCapacity", {
            required: "Required",
            min: { value: 1, message: "Must be greater than 0" },
          })}
        />
        {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <input disabled={isLoading} type="number" id="regularPrice"
          {...register("regularPrice", {
            required: "Required",
            min: { value: 1, message: "Must be greater than 0" },
          })}
        />
        {errors?.regularPrice?.message && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <input disabled={isLoading} type="number" id="discount"
          {...register("discount")}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description</Label>
        <TextareaStyle disabled={isLoading} id="description"
          {...register("description", { required: "Required" })}
        />
        {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Required",
          })}
        />
      </FormRow>

      <ButtonsStyle>
        <Button variation="secondary" type="reset" onClick={onClose}>Cancel</Button>
        <Button disabled={isLoading}>{isEditSession ? "Edit Cabin" : "Create Cabin"}</Button>
      </ButtonsStyle>
    </Form>
  );
}

export default CreateCabinForm;
