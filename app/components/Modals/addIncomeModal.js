import { useRef } from 'react';
import { currencyFormatter } from '../../lib/utils.js';
import { useAppContext } from '../../lib/store/finance-context'; 

// Icons
import { FaRegTrashAlt } from 'react-icons/fa';
import { Modal } from '../../components/Modal';
 
export function AddIncomeModal({ show, onClose }) {
  const amountRef = useRef();
  const descriptionRef = useRef();

  const { income, addIncomeItem, removeIncomeItem } = useAppContext();

  // Handler Functions
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    try {
    await addIncomeItem(newIncome);
    descriptionRef.current.value = "";
    amountRef.current.value = "";
     
    } catch (error) {
      console.log(error.message); 
    }
  };
  
  const deleteIncomeEntryHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
      
    } catch (error) {
      console.log(error.message); 
    }
    
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form className='input-group' onSubmit={addIncomeHandler}>
        {/* Income field */}
        <div className='input-group'>
          <label htmlFor='amount'>Income Amount</label>
          <input
            name='amount'
            type='number'
            ref={amountRef}
            min={0.01}
            step={0.01}
            placeholder='Enter income amount'
            required
          />
        </div>
        {/* Description field */}
        <div className='input-group'>
          <label htmlFor='description'>Description</label>
          <input
            name='description'
            type='text'
            ref={descriptionRef}
            placeholder='Enter income description'
            required
          />
        </div>
        {/* Submit button */}
        <button type='submit' className='btn btn-primary'>
          Add entry
        </button>
      </form>
      <div className='input-group mt-6'>
        <h3 className='text-2xl font-bold'>Income History</h3>

        {income.map((i) => {
        return(
          <div key={i.id} className='flex justify-between item-center'>
            <div>
              <p className='font-semibold'>{i.description}</p>
              <small className='text-xs'>{i.createdAt.toISOString()}</small>
            </div>
            <p className='flex items-center gap-2'>
              {currencyFormatter(i.amount)}
              <button onClick={() => {deleteIncomeEntryHandler(i.id);}}>
                <FaRegTrashAlt />
              </button>
            </p>
          </div>
        );
     })}
      </div>
    </Modal>
  );
}
export default AddIncomeModal;
 