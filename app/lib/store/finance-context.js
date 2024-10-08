"use client";
import { createContext, useState, useContext, useEffect } from "react";
//Firebase
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

export const AppContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {}, 
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async() => {},
  deleteExpenseItem: async() =>{},
  deleteExpenseCategory: async() =>{},

});

export function AppWrapper({ children }) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
   
  const addCategory = async (category) => {
    try {
      const collectionRef = collection(db, "expenses")
      const docSnap = await addDoc(collectionRef, {
        ...category,
        items: [],
      });

      setExpenses(prevExpenses => {
        return [
          ...prevExpenses,
          {
            id: docSnap.id,
            items: [],
            ...category 
          }
        ]
      })
      
    } catch (error) {
      throw error  
    }

  }


  const addExpenseItem = async (expenseCategoryId, newExpense) =>{
    const docRef = doc(db, "expenses",expenseCategoryId )
    try {
    await updateDoc(docRef, {...newExpense})

    setExpenses(prevState => {
      const updatedExpenses = [...prevState];

      const foundIndex = updatedExpenses.findIndex((expense) =>{
        return expense.id === expenseCategoryId;
      });

      updatedExpenses[foundIndex] = { id: expenseCategoryId, ...newExpense}
      return updatedExpenses; 
    });
      
    } catch (error) {
      
      throw error;
    }
  
  };


  const deleteExpenseItem = async(updatedExpense, expenseCategoryId) => {
    try {
    const docRef = doc(db, "expenses", expenseCategoryId);
    await updateDoc(docRef,{
     ...updatedExpense,
    });

    setExpenses(prevExpenses => {
      const updatedExpenses = [...prevExpenses];
      const pos = updatedExpenses.findIndex((ex) => ex.id === expenseCategoryId);
      updatedExpenses[pos].items = [...updatedExpense.items];
      updatedExpenses[pos].total= updatedExpense.total;

      return updatedExpenses;


    })
    } catch (error) {
      throw error;
    }
  };

  const deleteExpenseCategory = async () => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await deleteDoc(docRef);
       setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter((expense) => expense.id !== expenseCategoryId);
        return [...updatedExpenses];

       });


    } catch (error) {
      throw error;
    }

  };


  
  const addIncomeItem = async (newIncome) => {
    const collectionRef = collection(db, 'income');
    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      // Updated state
      setIncome((prevState) => {
        return [
        ...prevState,
        {
          id: docSnap.id,
          ...newIncome,
        },
      ];
    });


    } catch (error) {
      console.log(error.message);
      throw error
    }
  };



  const removeIncomeItem = async (incomeId) => {
    const docRef = doc(db, 'income', incomeId);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
          return prevState.filter((i) => i.id !== incomeId);
      });
      //Updated state 
    } catch (error) {
      console.log(error.message);
      throw error
    }
  };

  const values = { income, expenses, addIncomeItem, removeIncomeItem, addExpenseItem, addCategory, deleteExpenseItem, deleteExpenseCategory};

   useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, 'income');
      const docsSnap = await getDocs(collectionRef);
      const data = docsSnap.docs.map((doc) => {
        return{
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis()),
      };
    });
      
       setIncome(data); 
    };

    const getExpensesData = async () => {
      const collectionRef = collection(db, 'expenses');
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      setExpenses(data);
    }

    getIncomeData();
    getExpensesData();

  }, []);


  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
