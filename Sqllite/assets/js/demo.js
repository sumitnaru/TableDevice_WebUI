type = ['', 'info', 'success', 'warning', 'danger'];

var value = 0;
function getDropdownSelectedValue() {
    value = document.getElementById("drpTime").value;
    console.log(value);
}
var cntarr = [];
var XArr = [];
var Y1Arr = [];
var Y2Arr = [];
var tempTableArray = [];
var merged = [1];
function MainTable() {
    this.deviceId = 0;
    this.statsId = 0;
    this.day = 0;
    this.month = 0;
    this.year = 0;
    this.hour = 0;
    this.minitues = 0;
    this.second = 0;
    this.request = 0;
}
var Filter1Arr = [];

function SubTableRespns() {
    this.deviceId = 0;
   /// this.statsId = 0;
    //this.day = 0;
    //this.month = 0;
    //this.year = 0;
    //this.hour = 0;
    //this.minitues = 0;
    //this.second = 0;
    //this.request = 0;
}
function countTable() {
    this.deviceId = 0;
    this.emergency = 0;
    this.request = 0;

}

function filtercountTable() {
    this.deviceId = 0;
    this.emergency = 0;
    this.request = 0;

}
function SubTable() {
    this.deviceId = 0;
    this.statsId = 0;
    this.emergency = 0;
    this.request = 0;
}

var gg = [1];
var rsponsetime;
var filter2Arr = [0];

function two(files) {
    var file = files[0];
    console.log("File...");
  //  console.log(file);
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    setTimeout(function () {
        //console.log(reader);
        //var database = SQL.open(bin2Array(reader.result));
        var database = new SQL.Database(bin2Array(reader.result))
        var alldata = database.exec("SELECT * FROM STATUS");
        console.log("alldata-----------------------");
        alldata = alldata[0].values;
        alldatalength = alldata.length;

        var now = new Date();
        var pDate = now.getDate();
        var pMonth = now.getMonth()+1;
        var pYear = now.getFullYear();
        var pHour = now.getHours();
        var pMin = now.getMinutes();
        var pSec = now.getSeconds();
        var droptext = document.getElementById("drpTime");
        var min =parseInt(droptext.options[droptext.selectedIndex].value);
        console.log(min);
        var from = new Date(now);
        from.setMinutes(now.getMinutes() - min);

        var mDate = from.getDate();
        var mMonth = from.getMonth();

        var mYear = from.getFullYear();
        var mHour = from.getHours();
        var mMin = from.getMinutes();
        var mSec = from.getSeconds();
        for (var i = 0; i < alldata.length; i++) {
            var dDate = alldata[i][2];
           // console.log("---------------"+dDate);
            var dMonth = from.getMonth();
            var dYear = from.getFullYear();
            var dHour = from.getHours();
            var dMin = from.getMinutes();
            var dSec = from.getSeconds();
            //var dMonth = alldata[i][3];
            //var dYear = from.getFullYear();
            //var dHour = from.getHours();
            //var dMin = from.getMinutes();
            //var dSec = from.getSeconds();
           // console.log(dYear);
           // console.log(pMonth);
            if ((dDate <= pDate && dDate >= mDate)) {
               // console.log("m");
                var tempFilter = new MainTable();
                tempFilter.deviceId = alldata[i][0];
                tempFilter.statsId = alldata[i][1];
                tempFilter.day = alldata[i][2];
                tempFilter.month = alldata[i][3];
                tempFilter.year = alldata[i][4];
                tempFilter.hour = alldata[i][5];
                tempFilter.minitues = alldata[i][6];
                tempFilter.second = alldata[i][7];
                Filter1Arr.push(tempFilter);
            }
        }
        for (var i = 0; i < Filter1Arr.length; i++) {
            merged = Filter1Arr.concat(Filter1Arr[i].values);
        }
         rsponsetime = Filter1Arr.length;
        var val = parseFloat(alldatalength / Filter1Arr.length);
        sts0 = Math.round(100 / val).toFixed(2);
        var val1 = parseFloat(alldatalength /(alldatalength- Filter1Arr.length));
        sts1 = Math.round(100 / val1).toFixed(2);

        document.getElementById("rsptm").innerHTML = Filter1Arr.length;
        document.getElementById("ondvc").innerHTML = Filter1Arr.length;

        console.log(Filter1Arr);

        var subTable= new SubTable();
        for (var k = 0; k < Filter1Arr.length; k++) {
            subTable.deviceId = 0;
            if (Filter1Arr[k]["statsId"] == 3) {
                subTable.request = Filter1Arr[k]["statsId"];
                subTable.deviceId = Filter1Arr[k]["deviceId"];
                subTable.statsId = Filter1Arr[k]["statsId"];
            }
               
            if (Filter1Arr[k]["statsId"] == 4) {
                console.log(Filter1Arr[k]["deviceId"]);
                subTable.emergency = Filter1Arr[k]["statsId"];
                subTable.deviceId = Filter1Arr[k]["deviceId"];
                subTable.statsId = Filter1Arr[k]["statsId"];
                console.log(subTable.deviceId);
                cntarr.push(subTable);
            }
                
           
        }
        console.log("-----------");
        console.log(cntarr);
        console.log("-----------");


        //var count = new countTable();
        //var fltcnt = new filtercountTable();
        //for (var i = 0; i < Filter1Arr.length; i++) {
        //    if (Filter1Arr[i]["statsId"] == 3) {
        //        var tmpdid = Filter1Arr[i]["deviceId"];
        //        for (var j = 0; j < cntarr.length; j++) {
        //            cntarr.deviceId = tmpdid;
        //            cntarr.request += 1;
        //        }
        //        count.deviceId = tmpdid;
        //        count.request = 1;
        //        count.emergency = 0;
        //        cntarr.push(count);

        //    }
        //    else if (Filter1Arr[i]["statsId"] == 4) {
        //        var tmpdid = Filter1Arr[i]["deviceId"];
        //        for (var j = 0; j < cntarr.length; j++) {
        //            cntarr.deviceId = tmpdid;
        //            cntarr.emergency += 1;
        //        }
        //        count.deviceId = tmpdid;
        //        count.request = 0;
        //        count.emergency = 1;
        //        cntarr.push(count);
        //    }
                
        //}

       

        for (var l = 0; l < cntarr.length;l++){
            xArr.push(cntarr[l]["deviceId"]);
            Y1Arr.push(countTab[l]["request"]);
            Y2Arr.push(countTab[l]["emergency"]);
        }


        console.log("filter2Arr----");
      //  console.log(cntarr);

        demo.initChartist();

    }, 1000);
}

function updateTimeOnline() {
    var file = files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    var database = new SQL.Database(bin2Array(reader.result))
    var data = database.exec("SELECT * FROM STATUS");

}

function bin2Array(bin) {
    var i, size = bin.length, ary = [];
    for (i = 0; i < size; i++) {
        ary.push(bin.charCodeAt(i) & 0xFF);
    }
    return ary;
}

function four() {
    //alert("hi");
    setTimeout(function () {
        two(document.getElementById("filetype").files);
        four();
    }, 10000);
}

var getFileBlob = function (url, cb) {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function () {
        cb(xhr.response);
    });
    xhr.send();
};

var blobToFile = function (blob, name) {
    blob.lastModifiedDate = new Date();
    blob.name = name;
    return blob;
};
var getFileObject = function (filePathOrUrl, cb) {
    getFileBlob(filePathOrUrl, function (blob) {
        cb(blobToFile(blob, 'test.jpg'));
    });
};




var sts = 1,sts0 = 3,sts1 = 5;

demo = {
    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },
	





    initChartist: function () {

        var tempdataSales = {
            labels: gg,
            series: merged
            //series: [
            //   [287, 385, 490, 562, 594, 626, 698, 895, 952],
            //  [67, 152, 193, 240, 387, 435, 535, 642, 744],
            //  [23, 113, 67, 108, 190, 239, 307, 410, 410]
            //]
        };

        var tempoptionsSales = {
            lineSmooth: false,
            low: 0,
            high: 1000,
            showArea: true,
            height: "245px",
            axisX: {
                showGrid: false,
            },
            lineSmooth: Chartist.Interpolation.simple({
                divisor: 3
            }),
            showLine: true,
            showPoint: false,
            
        };

        var tempresponsiveSales = [
          ['screen and (max-width: 640px)', {
              axisX: {
                  labelInterpolationFnc: function (value) {
                      return value[0];
                  }
              }
          }]
        ];


        var tempdataSalesEmeerRqst = {
            labels: merged,
            series: [
               [287, 385, 490, 562, 594, 626, 698, 895, 952],
              [67, 152, 193, 240, 387, 435, 535, 642, 744],
              [23, 113, 67, 108, 190, 239, 307, 410, 410]
            ]
        };


        var tempoptionsSalesEmeerRqst = {
            lineSmooth: false,
            low: 0,
            high: 1000,
            showArea: true,
            height: "245px",
            axisX: {
                showGrid: false,
            },
            lineSmooth: Chartist.Interpolation.simple({
                divisor: 3
            }),
            showLine: true,
            showPoint: false,

        };

        var tempresponsiveSalesEmeerRqst = [
          ['screen and (max-width: 640px)', {
              axisX: {
                  labelInterpolationFnc: function (value) {
                      return value[0];
                  }
              }
          }]
        ];


        Chartist.Line('#chartHours1', tempdataSalesEmeerRqst, tempoptionsSalesEmeerRqst, tempresponsiveSalesEmeerRqst);

        Chartist.Line('#chartHours2', tempdataSales, tempoptionsSales, tempresponsiveSales);

        Chartist.Line('#chartHours3', tempdataSales, tempoptionsSales, tempresponsiveSales);


        ///-------------------
        var arr1 = [287, 385, 490, 562, 594, 626, 698, 895, 952];
        var arr2 = [67, 152, 193, 240, 387, 435, 535, 642, 744];
        var dataSales = {
          labels: ['2:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
          series: [
             arr1,
            arr2
          ]
        };

        var optionsSales = {
          lineSmooth: false,
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false,
        };

        var responsiveSales = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);


        var data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        };

        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        var responsiveOptions = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

       // Chartist.Line('#chartActivity', data, options, responsiveOptions);

        var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };

        var optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };

        Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);
        
        Chartist.Pie('#chartPreferences', {
            //labels: [sts0 + '%', sts1 + '%', sts2 + '%'],
            //series: [sts0, sts1, sts2]
            labels: [sts0 + '%', sts1 + '%'],
            series: [sts0, sts1]
        });
    },

    initGoogleMaps: function(){
        var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
        var mapOptions = {
          zoom: 13,
          center: myLatlng,
          scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
          styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    },

	showNotification: function(from, align){
    	color = Math.floor((Math.random() * 4) + 1);

    	$.notify({
        	icon: "ti-gift",
        	message: "Welcome to <b>Paper Dashboard</b> - a beautiful freebie for every web developer."

        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
	},
    initDocumentationCharts: function(){
    //     	init single simple line chart
        var dataPerformance = {
          labels: ['6pm','9pm','11pm', '2am', '4am', '8am', '2pm', '5pm', '8pm', '11pm', '4am'],
          series: [
            [1, 6, 8, 7, 4, 7, 8, 12, 16, 17, 14, 13]
          ]
        };

        var optionsPerformance = {
          showPoint: false,
          lineSmooth: true,
          height: "200px",
          axisX: {
            showGrid: false,
            showLabel: true
          },
          axisY: {
            offset: 40,
          },
          low: 0,
          high: 16,
          height: "250px"
        };

        Chartist.Line('#chartPerformance', dataPerformance, optionsPerformance);

    //     init single line with points chart
        var dataStock = {
          labels: ['\'07','\'08','\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
          series: [
            [22.20, 34.90, 42.28, 51.93, 62.21, 80.23, 62.21, 82.12, 102.50, 107.23]
          ]
        };

        var optionsStock = {
          lineSmooth: false,
          height: "200px",
          axisY: {
            offset: 40,
            labelInterpolationFnc: function(value) {
                return '$' + value;
              }

          },
          low: 10,
          height: "250px",
          high: 110,
            classNames: {
              point: 'ct-point ct-green',
              line: 'ct-line ct-green'
          }
        };

        Chartist.Line('#chartStock', dataStock, optionsStock);

    //      init multiple lines chart
        var dataSales = {
          labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
          series: [
             [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410]
          ]
        };

        var optionsSales = {
          lineSmooth: false,
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false,
        };

        var responsiveSales = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);

    //      pie chart
        Chartist.Pie('#chartPreferences', {
          labels: ['62%','32%','6%'],
          series: [62, 32, 6]
        });

    //      bar chart
        var dataViews = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
          ]
        };

        var optionsViews = {
          seriesBarDistance: 10,
          classNames: {
            bar: 'ct-bar'
          },
          axisX: {
            showGrid: false,

          },
          height: "250px"

        };

        var responsiveOptionsViews = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Bar('#chartViews', dataViews, optionsViews, responsiveOptionsViews);

    //     multiple bars chart
	
	
	
	
	
	
	
        var data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        };

        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        var responsiveOptions = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartActivity', data, options, responsiveOptions);

    }

}
