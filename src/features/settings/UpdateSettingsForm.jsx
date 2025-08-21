/* eslint-disable no-unused-vars */
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import { useSetting } from './useSetting';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const{isLoading, data:{minBookingLength,maxBookingLength,maxGuestsperBooking,breakfastPrice}={},} = useSetting();
  const { updateSetting, isEditing } = useUpdateSetting();
  const handleUpdate = (e, field) => {
    const value = e.target.value;
    if(!value) return; 
    updateSetting({ [field]: value });
  };
 if(isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <input disabled={isEditing} type='number' id='min-nights' defaultValue={minBookingLength} onBlur={(e)=>handleUpdate(e,"minBookingLength")} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <input type='number' id='max-nights'defaultValue={maxBookingLength}  onBlur={(e)=>handleUpdate(e,"maxBookingLength")} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <input type='number' id='max-guests'defaultValue={maxGuestsperBooking}  onBlur={(e)=>handleUpdate(e,"maxGuestsperBooking")} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <input type='number' id='breakfast-price'defaultValue={breakfastPrice}  onBlur={(e)=>handleUpdate(e,"breakfastPrice")} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
