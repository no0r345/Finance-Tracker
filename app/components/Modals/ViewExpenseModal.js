import currencyFormatter from '@/app/lib/utils';
import { Modal } from '../../components/Modal';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useAppContext } from '../../lib/store/finance-context'; 



export function ViewExpenseModal({show, onClose, expense}){
    const { deleteExpenseItem, deleteExpenseCategory} = useAppContext();

    const deleteExpenseHandler = async() =>{
        try {
            await deleteExpenseCategory(expense.id)
        } catch (error) {
            console.log(error.message);
            
        }
    };

    const deleteExpenseItemHandler = async (item) =>{
        try {
            //Remove the item from the list
            const updatedItems = expense.items.filter((i) => i.id !== item.id);

            //Update the expense balance 
            const updatedExpense ={ 
                items: [...updatedItems],
                total: expense.total - item.amount,
            };
            await deleteExpenseItem(updatedExpense, expense.id); 
        } catch (error) {
            console.log(error.message);
            
        }
    };


    return (
         <Modal show={show} onClose={onClose}>
            <div className='flex items-center justify-between'>
              <h3 className='text-4xl'>{expense.title}</h3>
              <button onClick={deleteExpenseHandler} className='btn btn-danger'>Delete</button>
            </div>

            <div>
                <h3 className='my-4 text-2xl'>Expense History</h3>
                {expense.items.map((item) => {
                    return(
                        <div key={item.id} className='flex items-center justify-between'>
                            <small>{item.createdAt.toMillis ?
                            new Date(item.createdAt.toMillis()).toISOString():
                            item.createdAt.toISOString()}</small>
                            <p className='flex items-center gap-2'>
                                {currencyFormatter(item.amount)}
                                <button onClick={() =>{
                                      deleteExpenseItemHandler(item)

                                }}>
                                    <FaRegTrashAlt/>
                                </button>


                            </p>
                        </div>
                    );
                })}
            </div>
    </Modal>
    );

}

export default ViewExpenseModal;