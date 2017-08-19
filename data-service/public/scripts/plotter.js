
$.ajax({url: "http://172.16.1.128:8989/v1/getDataForSplineChart/diptii86@gmail.com/1503092870000/1503110258000", success: function(result){
        var data = BasicColumn(result,'day');
        Highcharts.chart('basiccolumn',data );
    }});

$.ajax({url: "http://172.16.1.128:8989/v1/getDataForSplineChart/diptii86@gmail.com/1503092870000/1503110258000", success: function(result){
    var data = pieWithLegend(result,'day');
    Highcharts.chart('piewithlegend',data );
}});



function BasicColumn(data,intervalType){
    console.log('In BasicColumn');
    //var splitData = SplitIntervals(data,intervalType);
    common.chart.type='column';
    common.title.text='Emotion Statistics';
    common.subtitle.text='Facetrace';
    common.xAxis.categories=[];
    common.xAxis.crosshair=true;
    common.yAxis.min=0;
    common.yAxis.title.text='Emotion Intensity (Rank)';
    common.tooltip.headerFormat='<span style="font-size:10px">{point.key}</span><table>';
    common.tooltip.pointFormat= '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>';
    common.tooltip.footerFormat='</table>';
    common.tooltip.shared=true;
    common.useHTML=true;
    common.plotOptions.column={
        pointPadding:0.2,
        borderWidth:0
    };
    common.series=[];
    common.series.push({name:'sadness',data:data.sadness});
    common.series.push({name:'happiness',data:data.happiness});
    common.series.push({name:'anger',data:data.anger});
    common.series.push({name:'surprise',data:data.surprise});
    common.series.push({name:'neutral',data:data.neutral});
    common.series.push({name:'fear',data:data.fear});
    common.series.push({name:'disgust',data:data.disgust});
    common.series.push({name:'contempt',data:data.contempt});
    
    return common;
}
function ColumnRange(data, intervalType){

}
function pieWithLegend(data, intervalType){
    common.chart={
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
    };
    common.title.text='Pie Distribution of Emotions Data';
    common.tooltip={
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    };
    common.plotOptions={
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    };
    common.series=[{
            name: 'Emotions',
            colorByPoint: true,
            data: [{
                name: 'Happiness',
                y: _.sum(data.happiness)
            }, {
                name: 'Sad',
                y: _.sum(data.sad),
                sliced: true,
                selected: true
            }, {
                name: 'Anger',
                y: _.sum(data.anger)
            },{
                name: 'Surprise',
                y: _.sum(data.surprise)
            }, {
                name: 'neutral',
                y: _.sum(data.neutral)
            }, {
                name: 'fear',
                y: _.sum(data.fear)
            }, {
                name: 'contempt',
                y: _.sum(data.contempt)
            }, {
                name: 'disgust',
                y: _.sum(data.disgust)
            }]
        }];
    return common;
}


