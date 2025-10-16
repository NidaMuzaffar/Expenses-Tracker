# Install Flask first: pip install flask
from flask import Flask, request, jsonify

app = Flask(__name__)
expenses = []
total_amount = 0

def add_expense_data(category, amount, date):
    global total_amount
    expense = {'category': category, 'amount': amount, 'date': date}
    expenses.append(expense)
    total_amount += amount
    return expense

@app.route('/expenses', methods=['GET'])
def get_expenses():
    return jsonify({'expenses': expenses, 'total_amount': total_amount})

@app.route('/expenses', methods=['POST'])
def create_expense():
    data = request.json
    category = data.get('category')
    amount = data.get('amount')
    date = data.get('date')
       
    if not category:
        return jsonify({'error': 'Category is required'}), 400
    if not isinstance(amount, (int, float)) or amount <= 0:
        return jsonify({'error': 'Amount must be a positive number'}), 400
    if not date:
        return jsonify({'error': 'Date is required'}), 400
       
    expense = add_expense_data(category, amount, date)
    return jsonify(expense), 201

   # Add similar routes for UPDATE and DELETE

if __name__ == '__main__':
    app.run(debug=True)
   