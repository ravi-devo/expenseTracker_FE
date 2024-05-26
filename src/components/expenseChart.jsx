import { useSelector } from "react-redux";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = () => {

    const { expenseItems } = useSelector((state) => state.expense);
    const categories = [...new Set(expenseItems.map((expense) => {
        return expense.category
    }))];
    const totalAmountByCategory = categories.map((category) => {
        const total = expenseItems.filter((expense) => category === expense.category).reduce((sum, expense) => sum + expense.amount, 0);
        return total;
    });

    console.log("ExpenseItems", expenseItems);
    console.log("Categories", categories);

    const pieData = {
        labels: categories,
        datasets: [{
            label: "Expense By Category",
            data: totalAmountByCategory,
            backgroundColor: [
                "pink",
                "violet",
                "orange",
                "rgba(35, 99, 132, 0.9)",
                "rgba(241, 99, 132, 0.9)",
                "rgba(154, 99, 132, 0.9)"
            ],
            hoverOffset: 4
        }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: "This is a graphical representation of your spends"
            }
        }
    }

    return <Bar options={options} data={pieData} />
}

export default ExpenseChart;