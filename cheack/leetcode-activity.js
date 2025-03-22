// Function to fetch LeetCode activity data (last 31 days)
// Replace the API URL with your actual endpoint that returns dynamic data.
async function fetchLeetCodeActivity() {
  const apiUrl = `https://api.example.com/leetcode/activity?username=antim_pal&days=31`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Expected format: { labels: [...], dataPoints: [...] }
    return data;
  } catch (e) {
    console.error("Error fetching LeetCode activity data:", e);
    return { labels: [], dataPoints: [] };
  }
}

// Setup Chart.js for the LeetCode activity graph
const ctx = document.getElementById('leetcodeChart').getContext('2d');
let leetCodeChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], // Will be updated dynamically
    datasets: [{
      label: 'LeetCode Activity (Last 31 Days)',
      data: [], // Will be updated dynamically
      borderColor: '#628fdb',
      backgroundColor: 'rgba(98, 143, 219, 0.2)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#8a87f0',
      pointRadius: 5,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeOutBounce'
    },
    scales: {
      x: {
        grid: {
          color: '#2a2d38'
        },
        ticks: {
          color: '#c9d1d9'
        }
      },
      y: {
        grid: {
          color: '#2a2d38'
        },
        ticks: {
          color: '#c9d1d9'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#c9d1d9'
        }
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#ffffff',
        bodyColor: '#c9d1d9'
      }
    }
  }
});

// Function to update the chart with dynamic data
async function updateChartData() {
  const data = await fetchLeetCodeActivity();
  if(data.labels && data.dataPoints){
    leetCodeChart.data.labels = data.labels;
    leetCodeChart.data.datasets[0].data = data.dataPoints;
    leetCodeChart.update();
  }
}

// Initial update when page loads
updateChartData();

// Update chart when clicking the update button
document.getElementById('updateData').addEventListener('click', updateChartData);
