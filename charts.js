const buildChartData = (data,type) => {
    let chartData = [];
    if (type == 'cases'){
        for(let date in data.cases){
            let newDataPoint = {
                x: date,
                y: data.cases[date]
            }
            chartData.push(newDataPoint);
        }  
    } else if(type == 'recovered'){
        for(let date in data.recovered){
            let newDataPoint = {
                x: date,
                y: data.recovered[date]
            }
            chartData.push(newDataPoint);
        }  
    } else if(type == 'deaths'){
        for(let date in data.deaths){
            let newDataPoint = {
                x: date,
                y: data.deaths[date]
            }
            chartData.push(newDataPoint);
        } 
        
    } else if(type == 'active'){
        for(let date in data.cases){
            let newDataPoint = {
                x: date,
                y: data.cases[date]-data.recovered[date]-data.deaths[date]
            }
            chartData.push(newDataPoint);
        } 
        
    } else {
        for(let date in data.cases){
            let newDataPoint = {
                x: date,
                y: data.cases[date]
            }
            chartData.push(newDataPoint);
        }  
    } 
    return chartData;
}

const buildChart = (chartData,type="Cases",color="#33cccc") => {
    var timeFormat = 'MM/DD/YY';
    var ctx = document.getElementById('myChart').getContext('2d');
    
    chart = new Chart(ctx, {   
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            datasets: [{
                label: `Totales ${type}`,
                backgroundColor: color,
                borderColor: color,
                data: chartData, 
            }]
        },
       
        // Configuration options go here
        options: {
            // maintainAspectRatio: true,
            maintainAspectRatio: true,
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false
            },
            scales:     {
                xAxes: [{
                    type: "time",
                    time: {
                        format: timeFormat,
                        tooltipFormat: 'll'
                    },
                    ticks: {
                        fontColor: "#fff",
                      },
                }],
                yAxes: [{
                    ticks: {
                        fontColor: "#fff",
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return numeral(value).format('0a');
                        }
                    }
                }]
            }
        }
        
    }); 
}

const buildPieChart = (data) => {
    var ctx = document.getElementById('myPieChart').getContext('2d');
    var myPieChart = new Chart(ctx, {
        scaleFontColor: "white",
        type: 'pie',
        data: {
            datasets: [{
                data: [   
                    data.active, 
                    data.recovered, 
                    data.deaths,
                ],
                backgroundColor: [
                    '#6666ff',
                    '#7dd71d',
                    '#fb4443'
                ]
            }],
            labels: [
                'Activos',
                'Recuperados',
                'Muertes'
            ]
        },
        options: {
            // maintainAspectRatio: true,
            maintainAspectRatio: true,
            responsive: true,
        },
    });
}
