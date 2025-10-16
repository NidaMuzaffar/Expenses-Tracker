// expenses.js

let expenses = [];  // Array to store expenses
let totalAmount = 0;  // Variable to track total amount

// Get DOM elements
const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expenses-table-body');  // Fixed typo
const totalAmountCell = document.getElementById('total-amount');

// Add event listener for the add button
addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    // Add the expense to the array
    expenses.push({ category, amount, date });
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;  // Update the total amount display

    // Add a new row to the table
    const newRow = expensesTableBody.insertRow();  // Fixed typo: insertRow
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const expense = expenses[expenses.length - 1];  // Get the newly added expense
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;

    // Create and add the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        // Find the index of the expense to delete
        const index = expenses.indexOf(expense);
        if (index !== -1) {
            expenses.splice(index, 1);  // Remove from array
            totalAmount -= expense.amount;  // Subtract from total
            totalAmountCell.textContent = totalAmount;  // Update total display
            expensesTableBody.removeChild(newRow);  // Remove the row from the table
        }
    });
    deleteCell.appendChild(deleteBtn);
});

// The loop at the end of your original code seems to be for adding existing expenses.
// I'll include a corrected version here, assuming you want to process any initial expenses.
for (const expense of expenses) {  // If expenses array is pre-populated
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();  // Fixed typo
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        const index = expenses.indexOf(expense);
        if (index !== -1) {
            expenses.splice(index, 1);
            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;
            expensesTableBody.removeChild(newRow);
        }
    });
    deleteCell.appendChild(deleteBtn);
}